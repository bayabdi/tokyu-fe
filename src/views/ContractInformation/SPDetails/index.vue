<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/contract-information">{{ $t("title.listOfContracts") }}</router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <template v-if="contract">
      <div class="form-container">
        <ContractDetails :contract="contract" />
        <div class="my-10 px-3">
          <div
            v-for="(point, i) in contract.pointSummary.filter(item => { return new Date(item.validTo) > today })"
            :key="i"
          >
            <ExpirationDate
              v-if="new Date(point.validTo) > today"
              :withHead="i < 1"
              :withButtons="i < 2"
              :startOfTerm="point.validFrom"
              :endOfTerm="point.validTo"
              :remainingPointName="point.pointRemains"
              :productType="productType"
              @clickAddHead="clickAddHead(point)"
              @clickCarryOver="clickCarryOver(point)"
              @clickAdd="clickAdd(point)"
            />
          </div>
        </div>
        <div class="my-10 px-3">
          <PointNameHistory
            v-for="(point, i) in contract.pointMovementList"
            :key="i"
            :withHead="i < 1"
            :time="point.changedAt"
            :startOfTerm="point.validFrom"
            :endOfTerm="point.validThru"
            :remainingPointName="point.pointChange"
            :productType="productType"
          />
        </div>
      </div>
      <AddPointHead
        v-if="currentPoint"
        :visible="isVisibleAddPointHead"
        :fee="additionalPointPrice"
        :point="currentPoint"
        @close="isVisibleAddPointHead = false"
        @confirm="confirm(1)"
        :productType="productType"
      />

      <CarryOver
        v-if="currentPoint"
        :visible="isVisibleCarryOver"
        :fee="fee"
        :point="currentPoint"
        @close="isVisibleCarryOver = false"
        @confirm="confirm(2)"
        :productType="productType"
      />

      <AddPoint
        :visible="isVisibleAddPoint"
        :point="currentPoint"
        @close="isVisibleAddPoint = false"
        @confirm="confirm(3)"
        :productType="productType"
      />

      <PointConfirmation
        :visible="isVisiblePointConfirmation"
        :point="currentPoint"
        :confirmFrom="confirmFrom"
        :price="price"
        :productTypeId="productTypeId"
        :pointName="productType"
        @close="isVisiblePointConfirmation = false"
        @commit="commit()"
      />

      <PointComplete
        :visible="isVisiblePointComplete"
        :pdfUrl="pdfUrl"
        :point="currentPoint"
        @close="isVisiblePointComplete = false"
        :productType="productType"
      />
    </template>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import ContractDetails from '@/components/ContractDetails'
import ExpirationDate from '@/components/ExpirationDate'
import PointNameHistory from '@/components/PointNameHistory'
import AddPointHead from '@/views/ContractInformation/SPDetails/AddPointHead'
import CarryOver from '@/views/ContractInformation/SPDetails/CarryOver'
import AddPoint from '@/views/ContractInformation/SPDetails/AddPoint'
import PointConfirmation from '@/views/ContractInformation/SPDetails/PointConfirmation'
import PointComplete from '@/views/ContractInformation/SPDetails/PointComplete'
import {
  ProductTypeNameToId
} from '@/constants/product'
import { calcSalesTax } from '@/api/price'

export default {
  name: 'ContractInformationDetails',
  components: {
    Breadcrumbs,
    ContractDetails,
    ExpirationDate,
    PointNameHistory,
    AddPointHead,
    CarryOver,
    AddPoint,
    PointConfirmation,
    PointComplete
  },
  props: {
    contractId: Number
  },
  data () {
    return {
      isVisibleAddPointHead: false,
      isVisibleCarryOver: false,
      isVisibleAddPoint: false,
      isVisiblePointConfirmation: false,
      isVisiblePointComplete: false,
      contract: null,
      currentPoint: null,
      typeCommit: null,
      pdfUrl: '',
      fee: 0,
      confirmFrom: '',
      price: 0,
      additionalPointPrice: null
    }
  },
  methods: {
    clickAddHead (point) {
      this.isVisibleAddPointHead = true
      if (point.points === undefined) {
        point.points = 0
      }

      this.currentPoint = point
      this.typeCommit = 0
    },
    clickCarryOver (point) {
      this.isVisibleCarryOver = true
      if (point.points === undefined) {
        point.points = 0
      }

      this.currentPoint = point
      this.typeCommit = 1
    },
    clickAdd (point) {
      this.isVisibleAddPoint = true
      if (point.points === undefined) {
        point.points = 0
      }

      this.currentPoint = point
      this.typeCommit = 2
    },
    confirm (confirmFrom) {
      if (confirmFrom === 3) {
        this.confirmFrom = '前倒'
      }
      if (confirmFrom === 2) { this.confirmFrom = '繰越' }
      if (confirmFrom === 1) { this.confirmFrom = '追加' }

      console.log(this.currentPoint)

      this.price = parseInt(this.currentPoint.points) * this.fee

      this.isVisiblePointConfirmation = true
    },
    async commit () {
      if (this.typeCommit != null) {
        let action = ''

        if (this.typeCommit === 0) {
          action = 'purchaseMyPoints'
        } else if (this.typeCommit === 1) {
          action = 'rolloverMyPoints'
        } else if (this.typeCommit === 2) {
          action = 'advanceMyPoints'
        }

        await this.$doLoading(async () => {
          await this.$showGqlError(async () => {
            const data = await this.$store.dispatch(action, {
              contractId: this.contractId,
              point: this.currentPoint
            })

            if (this.typeCommit === 0) {
              this.pdfUrl = data.data.purchaseMyPoints.receipt.pdfFileUrl
            } else if (this.typeCommit === 1) {
              this.pdfUrl = data.data.rolloverMyPoints.receipt.pdfFileUrl
            } else if (this.typeCommit === 2) {
              this.pdfUrl = ''
            }

            this.isVisiblePointComplete = true
          })
          this.$toast.success('ご指定のお手続きが完了しました')
          this.hideAllDialogs()
          await this.loadContract()
        })
      }
    },
    async loadContract () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          const data = await this.$store.dispatch('mySPContract', {
            apollo: this.$apollo,
            contractId: this.contractId
          })
          this.contract = data.data.myContract

          const fee = await this.$store.dispatch('defaultRolloverFee')
          this.fee = fee.data.defaultRolloverFee.totalPrice

          this.additionalPointPrice = (await calcSalesTax(
            this.contract.additionalPointPrice
          )).totalPrice
        })
      })
    },
    hideAllDialogs () {
      this.isVisibleAddPointHead = false
      this.isVisibleCarryOver = false
      this.isVisibleAddPoint = false
      this.isVisiblePointConfirmation = false
      this.isVisiblePointComplete = false
    }
  },
  computed: {
    productType () {
      if (!this.contract) return null

      if (this.contract.productType.id === ProductTypeNameToId.SP) return 'SP'
      return 'FP'
    },
    productTypeId () {
      return this.contract.productType.id
    },
    today () {
      return new Date()
    }
  },
  async created () {
    await this.loadContract()
  }
}
</script>

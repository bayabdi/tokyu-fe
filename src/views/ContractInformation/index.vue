<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-13">
      <h1 class="text-heading--c-prm text-center pt-6 pb-3">
        {{ $route.meta.title }}
      </h1>
      <PrimeWeek :canSeeDetail="canSeeDetail" :contracts="PWContracts" />
      <FlexPoint :canSeeDetail="canSeeDetail" :contracts="FPContracts" />
      <VacationMaster :canSeeDetail="canSeeDetail" :contracts="VMContracts" />
      <MyWeek :canSeeDetail="canSeeDetail" :contracts="MWContracts" />
      <SharingPoint :canSeeDetail="canSeeDetail" :contracts="SPContracts" />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import PrimeWeek from '@/components/PrimeWeek'
import FlexPoint from '@/components/FlexPoint'
import SharingPoint from '@/components/SharingPoint'
import VacationMaster from '@/components/VacationMaster'
import MyWeek from '@/components/MyWeek'
import { ProductTypeNameToId } from '@/constants/product'

export default {
  name: 'ContractInformation',
  computed: {
    canSeeDetail () {
      return this.$isMainUser() || this.$isSubUser()
    },
    MWContracts () {
      return this.contracts.filter(contract => contract.productType.id === ProductTypeNameToId.MW)
    },
    SPContracts () {
      return this.contracts.filter(contract => contract.productType.id === ProductTypeNameToId.SP)
    },
    FPContracts () {
      return this.contracts.filter(contract => contract.productType.id === ProductTypeNameToId.FP)
    },
    VMContracts () {
      return this.contracts.filter(contract => contract.productType.id === ProductTypeNameToId.VM)
    },
    PWContracts () {
      return this.contracts.filter(contract => contract.productType.id === ProductTypeNameToId.PW)
    }
  },
  components: {
    Breadcrumbs,
    PrimeWeek,
    FlexPoint,
    VacationMaster,
    MyWeek,
    SharingPoint
  },
  data () {
    return {
      contracts: []
    }
  },
  async created () {
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        const data = await this.$store.dispatch('myContractList', {
          apollo: this.$apollo
        })

        this.contracts = data.data.myContractList.items
      })
    })
  }
}
</script>

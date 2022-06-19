<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/contract-information">
        {{ $t("title.listOfContracts") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container" v-if="contract">
      <ContractDetails :contract="contract" />
      <template v-if="vacations.length > 0">
        <div
          v-if="contract.contractNumber.slice(0, 2) !== 'PW'"
          class="text-center text-heading--c-prm mb-6 --w-bold"
        >
          {{ $t("common.ownMyWeek") }}
        </div>
        <div
          v-if="contract.contractNumber.slice(0, 2) === 'PW'"
          class="text-center text-heading--c-prm --w-bold mb-6"
        >
          {{ $t("common.ownMyWeek") }}
        </div>
        <div v-for="vacation in vacations" :key="vacation.id" class="mb-10">
        <div class="text-center text-large--c-prm--w-bold mb-2">
          {{ vacation.year }}{{ $t("common.year") }}
        </div>
        <v-divider class="--border-light-gray"></v-divider>
        <VacationCard
          v-for="booking in vacation.bookingGroup.bookings"
          :key="booking.id"
          :reservationId="booking.id"
          :facility="booking.room.roomType.facility.name"
          :checkinDate="booking.checkInDate.replaceAll('-', '/')"
          :finalDate="booking.checkOutDate.replaceAll('-', '/')"
        />
        <!--<CancellationButton
          v-if="!(vacation.canCancel)"
          @click="isCancelDialog = true"
        />-->
      </div>
      </template>

      <template v-if="pastVacations.length > 0">
        <div
          v-if="contractNumberType !== 'PW'"
          class="text-center text-heading--c-prm mb-6 --w-bold"
        >
          {{ $t("common.myWeekInThePast") }}
        </div>
        <div
          v-if="contractNumberType === 'PW'"
          class="text-center text-heading--c-prm --w-bold mb-6"
        >
          {{ $t("common.pastPrimeWeek") }}
        </div>
        <div v-for="vacation in pastVacations" :key="vacation.id" class="mb-10">
        <div class="text-center text-large--c-prm--w-bold mb-2">
          {{ vacation.year }}{{ $t("common.year") }}
        </div>
        <v-divider class="--border-light-gray"></v-divider>
        <VacationCard
          v-for="booking in vacation.bookingGroup.bookings"
          :key="booking.id"
          :reservationId="booking.id"
          :facility="booking.room.roomType.facility.name"
          :checkinDate="booking.checkInDate.replaceAll('-', '/')"
          :finalDate="booking.checkOutDate.replaceAll('-', '/')"
        />
      </div>
      </template>
    </div>
    <PartialCancellation
      :visible="isCancelDialog"
      :pointName="productType"
      @close="isCancelDialog = false"
    />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import ContractDetails from '@/components/ContractDetails'
import VacationCard from '@/components/VacationCard'
import PartialCancellation from '@/views/ContractInformation/PWDetails/PartialCancellation'
import {
  ProductTypeNameToId
} from '@/constants/product'

export default {
  name: 'ContractInformationDetails',
  props: {
    contractId: Number,
    productTypeId: Number
  },
  components: {
    Breadcrumbs,
    ContractDetails,
    VacationCard,
    PartialCancellation
  },
  computed: {
    productType () {
      if (!this.contract) return null

      if (this.productTypeId === ProductTypeNameToId.PW) return 'PW'
      return 'VM'
    },
    contractNumberType () {
      return this.contract.contractNumber.slice(0, 2)
    }
  },
  data () {
    return {
      contract: null,
      vacations: [],
      pastVacations: [],
      isCancelDialog: false
    }
  },
  async created () {
    let action = 'myPwContract'

    if (this.productTypeId === ProductTypeNameToId.VM) {
      action = 'myVmContract'
    }
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        const data = await this.$store.dispatch(action, {
          apollo: this.$apollo,
          contractId: this.contractId
        })

        this.contract = data.data.myContract

        let rights = []
        if (this.productTypeId === ProductTypeNameToId.VM) {
          rights = data.data.myVmContractUsage.rights
        } else {
          rights = data.data.myPwContractUsage.rights
        }

        rights.forEach(right => {
          const currentYear = new Date().getFullYear()
          // ignore the cancelled bookings
          right.bookingGroup.bookings = right.bookingGroup.bookings.filter(x => !x.cancelledAt)
          if (currentYear < right.year && right.bookingGroup.bookings > 0) {
            this.vacations.push(right)
          } else if (currentYear > right.year && right.bookingGroup.bookings > 0) {
            this.pastVacations.push(right)
          } else {
            const ownedRight = {
              bookingGroup: {
                bookings: []
              },
              year: right.year
            }
            const pastRight = {
              bookingGroup: {
                bookings: []
              },
              year: right.year
            }
            right.bookingGroup.bookings.forEach(x => {
              if (new Date(x.checkOutDate) > new Date()) {
                ownedRight.bookingGroup.bookings.push(x)
              } else {
                pastRight.bookingGroup.bookings.push(x)
              }
            })

            if (ownedRight.bookingGroup.bookings.length > 0) {
              this.vacations.push(ownedRight)
            }
            if (pastRight.bookingGroup.bookings.length > 0) {
              this.pastVacations.push(pastRight)
            }
          }
        })
      })
    })
  }
}
</script>

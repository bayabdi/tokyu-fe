<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/contract-information">
        {{ $t("title.listOfContracts") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container">
      <ContractDetails
        :withRightFac="true"
        :withRightWeek="true"
        :contract="contract"
      />
      <div class="text-center text-heading --c-prm --w-bold mb-6">
        {{ $t('common.ownershipVacationMaster') }}
      </div>

      <div v-for="right in rights" :key="right.year * 10">
        <div v-if="right.year >= today.getFullYear()" class="mb-12">
          <div class="text-center text-large--c-prm--w-bold mb-2">
            {{ right.year }}{{ $t('common.year') }}
          </div>
          <div v-for="(currentRight, i) in right.currentRights" :key="i">
            <div
              v-for="booking in currentRight.newBookingGroup.bookings"
              :key="booking.id"
            >
              <VacationCard
                v-if="new Date(booking.checkOutDate) >= today"
                :date="booking.checkInDate"
                :reservationId="booking.id"
                :facility="booking.room.roomType.facility.name"
                :checkinDate="booking.checkInDate"
                :finalDate="booking.checkOutDate"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="my-16 px-6">
        <v-btn
          class="text-heading--w-bold py-4"
          block
          color="primary"
          elevation="2"
          @click="isVisibleReservationDivision = true"
          large
          rounded
        >
          {{ $t('buttons.reserveDiv') }}
        </v-btn>
        <v-btn
          class="text-heading--w-bold py-4 mt-3"
          block
          color="primary"
          elevation="2"
          @click="isVisibleDeposit = true"
          large
          rounded
        >
          {{ $t('buttons.deposit') }}
        </v-btn>
      </div>

      <div class="text-center text-heading--c-prm --w-bold mb-6">
        {{ $t('common.pastVacationMaster') }}
      </div>
      <div v-for="right in rights" :key="right.year">
        <div v-if="right.year <= today.getFullYear()" class="mb-12">
          <div class="text-center text-large--c-prm--w-bold mb-2">
            {{ right.year }}{{ $t('common.year') }}
          </div>
          <div v-for="(currentRight, i) in right.currentRights" :key="i">
            <div
              v-for="booking in currentRight.newBookingGroup.bookings"
              :key="booking.id"
            >
              <VacationCard
                v-if="new Date(booking.checkOutDate) < today"
                :date="booking.checkInDate"
                :reservationId="booking.id"
                :facility="booking.room.roomType.facility.name"
                :checkinDate="booking.checkInDate"
                :finalDate="booking.checkOutDate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReservationDivision
      :visible="isVisibleReservationDivision"
      @commit="isVisibleReservationDivisionConfirmation = true"
      @close="isVisibleReservationDivision = false"
    />
    <ReservationDivisionConfirmation
      :visible="isVisibleReservationDivisionConfirmation"
      @commit="isVisibleReservationDivisionComplete = true"
      @close="isVisibleReservationDivisionConfirmation = false"
    />
    <Complete
      :visible="isVisibleReservationDivisionComplete"
      :title="$t('buttons.reserveDiv')"
      :text="$t('text.reserveDivCom')"
      @close="isVisibleReservationDivisionComplete = false"
    />
    <Deposit
      :visible="isVisibleDeposit"
      @commit="isVisibleDepositConfirmation = true"
      @close="isVisibleDeposit = false"
    />
    <DepositConfirmation
      :visible="isVisibleDepositConfirmation"
      @commit="isVisibleDepositComplete = true"
      @close="isVisibleDepositConfirmation = false"
    />
    <Complete
      :visible="isVisibleDepositComplete"
      :title="$t('buttons.deposit')"
      :text="$t('text.depositCom')"
      @close="isVisibleDepositComplete = false"
    />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import ContractDetails from '@/components/ContractDetails'
import VacationCard from '@/components/VacationCard'
import ReservationDivision from '@/views/ContractInformation/MWDetails/ReservationDivision'
import ReservationDivisionConfirmation from '@/views/ContractInformation/MWDetails/ReservationDivisionConfirmation'
import Complete from '@/views/ContractInformation/MWDetails/Complete'
import Deposit from '@/views/ContractInformation/MWDetails/Deposit'
import DepositConfirmation from '@/views/ContractInformation/MWDetails/DepositConfirmation'

export default {
  name: 'MWDetails',
  props: {
    contractId: Number
  },
  components: {
    Breadcrumbs,
    ContractDetails,
    VacationCard,
    ReservationDivision,
    ReservationDivisionConfirmation,
    Complete,
    Deposit,
    DepositConfirmation
  },
  data () {
    return {
      isVisibleReservationDivision: false,
      isVisibleReservationDivisionConfirmation: false,
      isVisibleReservationDivisionComplete: false,
      isVisibleDeposit: false,
      isVisibleDepositConfirmation: false,
      isVisibleDepositComplete: false,
      contract: null,
      today: new Date(),
      rights: []
    }
  },
  async created () {
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        const data = await this.$store.dispatch('myMwContract', {
          apollo: this.$apollo,
          contractId: this.contractId
        })

        this.contract = {
          productType: data.data.myMwContractUsage.productType,
          contractNumber: data.data.myMwContractUsage.contractNumber,
          years: data.data.myMwContractUsage.years,
          rightFac: data.data.myMwContractUsage.mwPwRoomType.facility.name,
          rightWeek: data.data.myMwContractUsage.mwPwWeekNumber,
          endDate: data.data.myMwContractUsage.endDate
        }

        this.rights = data.data.myMwContractUsage.rights
      })
    })
  }
}
</script>

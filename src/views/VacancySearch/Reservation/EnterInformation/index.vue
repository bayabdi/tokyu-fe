<template>
<div class="form-container">
    <Stage :stage="3"/>
    <div class="text-center text-heading --w-bold --c-prm pt-5">{{ $t('text.reservationConfirm.please') }}</div>

    <div>
      <UsageHistoryItem
        :id="facilityInfo.id"
        :title="facilityInfo.name"
        :urlImg="facilityInfo.mainImageUrl"
        :roomTypeName="roomType.name"
        :checkInDate="checkInDate"
        :checkOutDate="checkOutDate"
        :isActive="true"
        class="px-0"
      />
      <div v-for="(booking, ind) in bookings" :key="ind">
        <h3 v-if="bookings.length > 1" class="text-heading--c-prm">{{ $t('title.reservation') }}{{ ind + 1 }}</h3>
        <GuestInformation
          v-model="booking.guests"
          :facility="facilityInfo"
          notChange
        />
        <ChangeRentalListing
          :checkInDate="booking.checkInDate"
          :checkOutDate="booking.checkOutDate"
          :facilityId="facilityInfo.id"
          v-model="booking.rentalItems"
        />
        <ChangeParkingInformation
          :checkInDate="booking.checkInDate"
          :checkOutDate="booking.checkOutDate"
          :facilityId="facilityInfo.id"
          v-model="booking.parkings"
        />

        <!--      TODO it seems pet info has not been implemented    -->
        <PetInformation
          v-if="acceptPet"
          v-model="booking.pets"
        />
      </div>
      <v-btn
        class="text-heading mt-4 mb-12 --w-bold"
        rounded
        block
        color="primary"
        large
        :disabled="!canConfirm"
        @click="goToLastConfirmation"
      >{{ $t('buttons.finalizeBooking') }}</v-btn>
    </div>
</div>
</template>

<script>
import Stage from '@/components/Stage'
import UsageHistoryItem from '@/components/UsageHistoryItem'
import GuestInformation from '@/components/ReservationComponents/GuestInformation'
import ChangeParkingInformation from '@/components/ReservationComponents/ChangeParkingInformation'
import ChangeRentalListing from '@/components/ReservationComponents/ChangeRentalListing'
import searchVacancyMixin from '../searchVacancyMixin'
import withTemporaryBookingMixin from '../withTempraryBookingMixin'
import PetInformation from '@/components/ReservationComponents/PetInformation'

export default {
  name: 'EnterInformation',
  mixins: [searchVacancyMixin, withTemporaryBookingMixin],
  components: {
    Stage,
    UsageHistoryItem,
    GuestInformation,
    ChangeParkingInformation,
    ChangeRentalListing,
    PetInformation
  },
  methods: {
    async goToLastConfirmation () {
      await this.extendBookingGroup()
      await this.$router.push({ name: 'reserve-final-confirmation' })
    }
  },
  computed: {
    acceptPet () { return this.$store.getters.acceptPetFacility },
    canConfirm () {
      return this.bookings?.every(
        booking =>
          booking.guests.every(g => !!g.name) &&
          (!booking.parkings || booking.parkings?.every(p => !!p.fromDate && !!p.toDate && !!p.parking)) &&
          (!booking.rentalItems || booking.rentalItems?.every(r => !!r.fromDate && !!r.toDate && r.selects?.length > 0))
      )
    }
  }
}
</script>

<template>
  <div>
    <ChangeParkingInformation
      v-model="parkings"
      :checkInDate="booking.checkInDate"
      :checkOutDate="booking.checkOutDate"
      :facilityId="booking.room.roomType.facility.id"
    />
    <v-btn
      rounded
      block
      height="66"
      @click="changeParkingReservations"
      :disabled="!canSave"
      class="text-title bg-primary --c-white mb-3"
    >
      {{ $t("reservationAndUsageHistory.changeToTheAboveContent") }}
    </v-btn>
  </div>
</template>

<script>
import { selectedBookingComputed } from '../../selectedBookingMixin'
import ChangeParkingInformation from '@/components/ReservationComponents/ChangeParkingInformation.vue'

export default {
  name: 'GuestInformationChange',
  mixins: [selectedBookingComputed],
  components: {
    ChangeParkingInformation
  },
  methods: {
    async changeParkingReservations () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('updateParkings', {
            bookingId: this.id,
            parkings: this.parkings
          })
        })
      })

      this.completeChange()
    }
  },
  data () {
    return {
      parkings: []
    }
  },
  computed: {
    canSave () {
      if (typeof this.parkings === 'number') {
        // non-faciilty managed parkings. no need to validate
        return true
      } else {
        return !this.parkings.some(p => !p.parking?.id || !p.fromDate || !p.toDate)
      }
    }
  },
  watch: {
    booking: {
      immediate: true,
      handler (booking) {
        if (booking.parkings && typeof booking.parkingRequestedNumber === 'number') {
          this.parkings = booking.parkingRequestedNumber
        }
        this.parkings = booking.parkings.map(p => ({
          ...p,
          parking: {
            id: p.facilityParkingId
          }
        }))
      }
    }
  }
}
</script>

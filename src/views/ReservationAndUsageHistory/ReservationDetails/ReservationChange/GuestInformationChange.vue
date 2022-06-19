<template>
  <div>
    <GuestInformation
      v-model="booking.guests"
      :facility="facility"
    />
    <v-btn
      rounded
      block
      height="66"
      @click="confirm"
      :disabled="!canSave"
      class="text-title bg-primary --c-white mb-3"
    >
      {{ $t('reservationAndUsageHistory.changeToTheAboveContent') }}
    </v-btn>

    <ConfirmationOfAdditionalDays
      :reason="$t('text.dueChangeGuestInfo')"
      :visible="confirmModal"
      :additionalFee="additionalFee"
      :priceUnit="priceUnit"
      @close="confirmModal = false"
      @confirm="changeBookingGuests"
    />
  </div>
</template>

<script>
import { selectedBookingComputed } from '../../selectedBookingMixin'
import GuestInformation from '@/components/ReservationComponents/GuestInformation'
import ConfirmationOfAdditionalDays from '@/views/ReservationAndUsageHistory/components/ConfirmationOfAdditionalDays.vue'

export default {
  name: 'GuestInformationChange',
  mixins: [selectedBookingComputed],
  components: {
    GuestInformation,
    ConfirmationOfAdditionalDays
  },
  methods: {
    back () {
      this.$router.push({
        name: 'reservation-change',
        params: { id: this.id }
      })
    },
    async confirm () {
      await this.recalulate()
      this.confirmModal = true
    },
    async changeBookingGuests ({ password }) {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('updateBookingGuests', {
            bookingId: this.id,
            guests: this.booking.guests,
            password
          })
        })
      })

      this.confirmModal = false
      this.completeChange()
    },
    async recalulate () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          const result = await this.$store.dispatch('calculateUpdateBookingGuests', {
            booking: this.booking, guests: this.booking.guests
          })
          this.totalAfterUpdate = result.totalPrice
        })
      })
    }
  },
  data () {
    return {
      confirmModal: false,
      totalAfterUpdate: null
    }
  },
  computed: {
    canSave () {
      return this.booking.guests.every(g => !!g.name)
    },
    additionalFee () {
      if (this.isPointBasedProduct) {
        return this.totalAfterUpdate - this.currentAccommodationFee.sp - this.currentAccommodationFee.fp
      } else {
        return this.totalAfterUpdate - this.currentAccommodationFee.jpy
      }
    }
  }
}
</script>

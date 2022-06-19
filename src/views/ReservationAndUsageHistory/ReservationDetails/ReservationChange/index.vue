<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/usage-history">
        {{ $t("reservationAndUsageHistory.reservationAndUsageHistory") }}
      </router-link>
      >
      <router-link :to="{ name: 'reservation-detail', params: { id: booking.id } }">
        {{ $t("reservationAndUsageHistory.reservationDetails") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>

    <div class="form-container px-5 pb-15 pt-5">
      <UsageHistoryItem
        :id="booking.id"
        :urlImg="facility.mainImageUrl"
        :title="facility.name"
        :checkInDate="booking.checkInDate"
        :checkOutDate="booking.checkOutDate"
        :roomTypeName="booking.room.roomType.name"
        isActive
        :cancelledAt="cancelledAt"
      />

      <div class="bg-white guest-form">
        <div class="bg-primary guest-form-header">
          <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
            {{ $t("reservationAndUsageHistory.changeReservationDetails") }}
          </div>
        </div>
        <div class="px-5 pb-4">
          <div class="text-medium text-center  --c-bg text-left pt-3 pb-3">
            <span v-if="!canModify">{{ $t('text.reservationCannotChanged') }}</span>
            <span v-else>
              {{ $t('reservationAndUsageHistory.pleaseSelectTheContentToBeChangedFromTheFollowing') }}
            </span>
          </div>

          <v-btn
            rounded
            block
            text
            height="66"
            style="display:block"
            v-for="(btn, ind) in btns"
            :key="`btn-${ind}`"
            @click="btn.click"
            class="text-medium mt-3 mb-3"
            :class="(btn.BgColor || 'bg-primary') + ' ' + (btn.color || '--c-white')"
          >
            {{ btn.text }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Breadcrumbs from '@/components/Breadcrumbs'
import UsageHistoryItem from '@/components/UsageHistoryItem'
import selectedBookingMixin from '../../selectedBookingMixin'

export default {
  name: 'ReservationChange',
  mixins: [selectedBookingMixin],
  components: {
    Breadcrumbs,
    UsageHistoryItem
  },
  methods: {
    handleClick (link) {
      if (link) {
        this.$router.push(link)
      } else {
        this.reservationCancellation.isOpen = true
      }
    }
  },
  data () {
    return {
      reservationCancellation: {
        isOpen: true
      }
    }
  },
  computed: {
    btns () {
      const buttons = []
      if (this.canModify) {
        if (!this.isFixedRightBooking) {
          buttons.push({
            text: this.$t('reservationAndUsageHistory.extensionOfAccommodationDate'),
            click: () => {
              this.$router.push({ name: 'reservation-extention', params: { id: this.id } })
            }
          })
        }
        buttons.push({
          text: this.$t('reservationAndUsageHistory.changeGuestInformation'),
          click: () => {
            this.$router.push({ name: 'reservation-guest-change', params: { id: this.id } })
          }
        })
        buttons.push({
          text: this.$t('reservationAndUsageHistory.changeRentalListing'),
          click: () => {
            this.$router.push({ name: 'reservation-rental-item-change', params: { id: this.id } })
          }
        })
        buttons.push({
          text: this.$t('reservationAndUsageHistory.changeParkingLot'),
          click: () => {
            this.$router.push({ name: 'reservation-parking-change', params: { id: this.id } })
          }
        })
      }
      buttons.push({
        text: this.$t('buttons.return'),
        BgColor: 'bg-silver',
        color: '--c-prm',
        click: () => {
          this.$router.replace({ name: 'reservation-detail', params: { id: this.id } })
        }
      })

      return buttons
    }
  }
}
</script>

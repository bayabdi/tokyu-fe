<template>
  <div>
    <ChangeRentalListing
      v-model="rentalItems"
      :checkInDate="booking.checkInDate"
      :checkOutDate="booking.checkOutDate"
      :facilityId="booking.room.roomType.facility.id"
      forChange
    />
    <v-btn
      rounded
      block
      height="66"
      @click="changeRentalItems"
      :disabled="!canSave"
      class="text-title bg-primary --c-white mb-3"
    >
      {{ $t('reservationAndUsageHistory.changeToTheAboveContent') }}
    </v-btn>
  </div>
</template>

<script>
import { selectedBookingComputed } from '../../selectedBookingMixin'
import ChangeRentalListing from '@/components/ReservationComponents/ChangeRentalListing.vue'
import { getPriceWithNormalTax } from '@/constants/sales-tax'
import { calculateRentalItemPrice } from '@/utils/prices'

export default {
  name: 'GuestInformationChange',
  mixins: [selectedBookingComputed],
  components: {
    ChangeRentalListing
  },
  methods: {
    async changeRentalItems () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('updateRentalItems', {
            bookingId: this.id,
            rentalItems: this.rentalItems
          })
        })
      })

      this.completeChange()
    }
  },
  data () {
    return {
      rentalItems: []
    }
  },
  computed: {
    canSave () {
      try {
        calculateRentalItemPrice(this.rentalItems)
        return true
      } catch {
        return false
      }
    }
  },
  watch: {
    booking: {
      immediate: true,
      handler (booking) {
        // we must reshape the booking rental items for the component (group by the date range)
        const groups = {}
        for (const rental of booking.rentalItems) {
          const key = `${rental.fromDate}_${rental.toDate}`
          if (!groups[key]) {
            groups[key] = {
              fromDate: rental.fromDate,
              toDate: rental.toDate,
              selects: []
            }
          }
          groups[key].selects.push({
            rentalItemId: rental.rentalItemId,
            quantity: rental.quantity,
            rentalItemDef: {
              ...rental.rentalItem.rentalItemDef,
              price: rental.unitPrice,
              rentalPeriod: rental.rentalPeriod,
              priceWithSalesTax: getPriceWithNormalTax(rental.unitPrice)
            }
          })
        };
        this.rentalItems = Object.values(groups)
      }
    }
  }
}
</script>

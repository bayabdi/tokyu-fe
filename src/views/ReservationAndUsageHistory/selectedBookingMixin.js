import { isoDate } from '@/utils/get-date'
import { canUseTvp, getPointName, isPointBasedProduct } from '@/constants/product'
import { isBookingTypeAllowedToChange, isBookingTypeFixedRight } from '@/constants/booking-type'

export const selectedBookingMixinMounted = {
  async mounted () {
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        await this.$store.dispatch('loadBookingDetail', { id: this.id })
      }, {
        BOOKING_CANNOT_READ_FOR_CLIENT_ROLE: () => {
          this.$toast.warning('この予約の閲覧権限がありません')
          this.$router.back()
        },
        BOOKING_NOT_FOUND: () => {
          this.$toast.warning('ご指定のご予約が見つかりませんでした')
          this.$router.back()
        }
      })
    })
  }
}

export const selectedBookingComputed = {
  methods: {
    completeChange (completed = true) {
      this.$store.commit('setChangeCompleted', !!completed)
    }
  },
  computed: {
    changeCompleted () {
      return this.$store.state.usageHistory.changeCompleted
    },
    id () {
      return Number(this.$route.params.id)
    },
    booking () {
      return this.$store.getters.selectedBooking
    },
    contract () {
      return this.booking?.contract
    },
    parkingCount () {
      if (!this.booking) return 0
      return this.booking.parkingRequestedNumber ?? this.booking.parkings.length
    },
    hasOptionalCleaningFee () {
      return this.booking?.optionalCleaningTotal.totalJpy > 0
    },
    isFutureBooking () {
      return this.booking?.checkInDate > isoDate(new Date())
    },
    canModify () {
      return this.booking?.canModifyByClient && isBookingTypeAllowedToChange(this.booking?.bookingTypeId)
    },
    isFixedRightBooking () {
      return isBookingTypeFixedRight(this.booking?.bookingTypeId)
    },
    cancelledAt () {
      return this.booking?.cancelledAt
    },
    facility () {
      return this.booking?.room.roomType.facility
    },
    isPointBasedProduct () {
      if (!this.contract) return null
      return isPointBasedProduct(this.contract.productTypeId)
    },
    priceUnit () {
      if (!this.contract) return ''
      return this.isPointBasedProduct ? 'ポイント' : '円'
    },
    pointName () {
      if (!this.contract) return null
      return getPointName(this.contract.productTypeId)
    },
    priceUnitShort () {
      if (!this.contract) return ''
      return this.isPointBasedProduct ? 'pt' : '円'
    },
    canUseTvp () {
      if (!this.contract) return false
      return canUseTvp(this.contract.productTypeId)
    },
    currentAccommodationFee () {
      if (!this.booking) return null
      const total = this.booking.accommodationFeeTotal
      return {
        jpy: total.totalJpy,
        sp: total.totalSp,
        fp: total.totalFp
      }
    }

  }
}

export default {
  ...selectedBookingMixinMounted,
  ...selectedBookingComputed
}

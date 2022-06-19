import { mapState, mapMutations } from 'vuex'

export default {
  async mounted () {
    if (!this.$store.getters.isReadyForSearch) {
      return this.$router.push({ name: 'vacancy-search' })
    }
  },
  computed: {
    ...mapState({
      contractId: state => state.newBooking.contractId,
      checkInDate: state => state.newBooking.checkInDate,
      checkOutDate: state => state.newBooking.checkOutDate,
      tags: state => state.newBooking.tags,
      facilities: state => state.newBooking.facilities,
      numberOfAdults: state => state.newBooking.numberOfAdults,
      numberOfChildren: state => state.newBooking.numberOfChildren,
      numberOfBedShare: state => state.newBooking.numberOfBedShare,
      bookingPlanId: state => state.newBooking.bookingPlanId,
      facilityInfo: state => state.newBooking.facilityInfo,
      roomType: (_state, getters) => getters.roomTypeForBooking,
      stayDays: (_state, getters) => getters.numberOfStayDays,
      priceUnit: (_state, getters) => getters.newBookingAccommodationPriceUnit(),
      productTypeId: (_state, getters) => getters.newBookingContractProductId,
      isPointBasedProduct: (_state, getters) => getters.isPointBasedProduct,
      isTvpPaymentAllowed: (_state, getters) => getters.isTvpPaymentAllowed
    })
  },
  methods: {
    ...mapMutations([
      'setCheckInDate',
      'setCheckOutDate',
      'setVacancyList',
      'setSearchTags',
      'setSearchFacilityIds',
      'setSearchNumberOfAdults',
      'setSearchNumberOfChildren',
      'setSearchNumberOfBedShare'
    ])
  }
}

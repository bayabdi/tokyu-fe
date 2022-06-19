import { mapState, mapMutations } from 'vuex'

export default {
  async mounted () {
    if (!this.bookingGroup) {
      await this.$router.push({ name: 'reserve-confirmation' })
    }
  },
  computed: {
    ...mapState({
      bookingGroup: (_state, getters) => getters.temporaryBookingGroup,
      bookings: (_state, getters) => getters.temporaryBookingGroup?.bookings ?? []
    })
  },
  methods: {
    ...mapMutations([
    ]),
    async extendBookingGroup () {
      await this.$showGqlError(async () => {
        await this.$store.dispatch('extendTemporaryBookingTimeout')
      })
    },
    async removeTemporaryBooking () {
      await this.$showGqlError(async () => {
        await this.$store.dispatch('deleteTemporaryBooking')
      })
    }
  }
}

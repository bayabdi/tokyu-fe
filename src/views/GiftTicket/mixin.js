export default {
  async mounted () {
    await this.$doLoading(() => this.$store.dispatch('loadRemainingPoints'))
    await this.$doLoading(() => this.$store.dispatch('loadPointExchangeProducts'))
  },
  computed: {
    pointToUse () {
      return this.$store.getters.getPointToUseForPointExchange
    },
    availablePoints () {
      return this.pointToUse?.pointRemains ?? 0
    },
    giftTicketList () {
      if (!this.pointToUse) return []
      return this.$store.state.pointExchange.products.map(p => ({
        id: p.id,
        pointsRequired: this.$store.getters.getPointExchangePrice(p.id),
        name: p.name,
        place: p.companyName
      }))
    },
    numOfTickets () {
      return this.$store.state.pointExchange.cart
    },
    cartTotal () {
      if (this.pointToUse) { return this.$store.getters.getPointExchangeCartPrice }
      return 0
    },
    cartItems () {
      if (this.pointToUse) { return this.$store.getters.getPointExchangeCartList }
      return []
    }
  }
}

import actions from './actions'

const client = {
  state: {
    cardInfo: null,
    paymentPref: null
  },
  mutations: {
    setCardInfo (state, card) {
      state.cardInfo = card
    },
    setPrefPaymentMethod (state, {
      facilityFeePayment,
      setupFeePayment,
      optionalCleaningPayment,
      taxPayment,
      otherServicePayment
    }) {
      state.paymentPref = {
        facilityFeePayment,
        setupFeePayment,
        optionalCleaningPayment,
        taxPayment,
        otherServicePayment
      }
    }
  },
  getters: {
    hasValidCard: state => !!state.cardInfo
  },
  actions
}

export default client

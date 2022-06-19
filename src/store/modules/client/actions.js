import { GET_MY_SAVED_CARD, SAVE_CARD, GET_PREF_PAYMENT_METHOD, UPDATE_PREF_PAYMENT_METHOD } from '@/api/graphql/client'
import { apolloClient } from '@/plugins/apollo'
import { gqlErrorContains } from '@/utils/graphql-errors'

export default {
  async checkSavedCard ({ commit }) {
    try {
      const res = await apolloClient.query({
        query: GET_MY_SAVED_CARD
      })
      commit('setCardInfo', res.data.mySavedCard)
      return true
    } catch (e) {
      if (gqlErrorContains(e, 'CREDIT_CARD_NOT_FOUND')) {
        commit('setCardInfo', null)
        return false
      }
      throw e
    }
  },
  async saveCard ({ commit }, token) {
    const res = await apolloClient.mutate({
      mutation: SAVE_CARD,
      variables: { token }
    })
    commit('setCardInfo', res.data.clientSaveCard)
    return true
  },

  async getPrefPaymentMethod ({ commit }) {
    const res = await apolloClient.query({
      query: GET_PREF_PAYMENT_METHOD,
      fetchPolicy: 'no-cache'
    })
    commit('setPrefPaymentMethod', res.data.myClientInfo)
    return res.data.myClientInfo
  },

  async updatePrefPaymentMethod ({ commit }, {
    facilityFeePayment,
    setupFeePayment,
    optionalCleaningPayment,
    taxPayment,
    otherServicePayment
  }) {
    const res = await apolloClient.mutate({
      mutation: UPDATE_PREF_PAYMENT_METHOD,
      variables: {
        facilityFeePayment,
        setupFeePayment,
        optionalCleaningPayment,
        taxPayment,
        otherServicePayment
      }
    })

    return res.data.updateMyClientInfo
  }
}

import {
  GET_POINT_EXCHANGE_PRODUCTS,
  ORDER_POINT_EXCHANGE_PRODUCTS,
  PURCHASE_MY_POINTS,
  DEFAULT_ROLLOVER_FEE,
  ROLLOVER_MY_POINTS,
  ADVANCE_MY_POINTS,
  GET_MY_POINT_EXCHANGE_PRODUCTS
} from '@/api/graphql/point-exchange'
import { apolloClient } from '@/plugins/apollo'

export default {
  async loadPointExchangeProducts ({ commit }) {
    const res = await apolloClient.query({
      query: GET_POINT_EXCHANGE_PRODUCTS
    })

    const products = res.data.clientPointExchangeProductList
    commit('setPointExchangeProducts', products)
  },
  async orderPointExchangeProducts ({ commit, state, getters }, {
    name, tel, email, address
  }) {
    const cartItems = getters.getPointExchangeCartList
    await apolloClient.mutate({
      mutation: ORDER_POINT_EXCHANGE_PRODUCTS,
      variables: {
        address: (name || tel || email || address)
          ? {
              name,
              tel,
              email,
              address1: address
            }
          : null,
        orders: cartItems.map(i => ({ productId: i.id, quantity: i.quantity })),
        contractId: state.contractId
      }
    })
    commit('emptyPointExchangeCart')
  },

  async purchaseMyPoints (commit, { point, contractId }) {
    point.points = parseInt(point.points)
    return new Promise((resolve, reject) => {
      apolloClient.mutate({
        mutation: PURCHASE_MY_POINTS,
        variables: {
          contractId: contractId,
          year: point.year,
          points: point.points,
          password: point.password
        }
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async defaultRolloverFee (commit) {
    return new Promise((resolve, reject) => {
      apolloClient.mutate({
        mutation: DEFAULT_ROLLOVER_FEE
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async rolloverMyPoints (commit, { point, contractId }) {
    point.points = parseInt(point.points)
    return new Promise((resolve, reject) => {
      apolloClient.mutate({
        mutation: ROLLOVER_MY_POINTS,
        variables: {
          contractId: contractId,
          year: point.year,
          points: point.points,
          password: point.password
        }
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async advanceMyPoints (commit, { point, contractId }) {
    point.points = parseInt(point.points)
    return new Promise((resolve, reject) => {
      apolloClient.mutate({
        mutation: ADVANCE_MY_POINTS,
        variables: {
          contractId: contractId,
          year: point.year,
          points: point.points,
          password: point.password
        }
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async myPointExchangeList (context, { apollo, take, skip }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: GET_MY_POINT_EXCHANGE_PRODUCTS
      }).then(data => {
        context.commit('setPointExchangeHistory', data.data.myPointExchangeList.items)
      }).catch(error => reject(error))
    })
  }
}

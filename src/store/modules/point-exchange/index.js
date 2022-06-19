import actions from './actions'
import Vue from 'vue'

const contract = {
  state: {
    products: [],
    cart: {},
    contractId: undefined,
    history: []
  },
  mutations: {
    setPointExchangeProducts (state, products) {
      state.products = products
    },
    putPointExchangeToCart (state, {
      id,
      quantity
    }) {
      Vue.set(state.cart, id, quantity)
    },
    setPointExchangeContractId (state, contractId) {
      state.contractId = contractId
    },
    emptyPointExchangeCart (state) {
      state.cart = {}
    },
    setPointExchangeHistory (state, history) {
      state.history = history
    }
  },
  getters: {
    getPointExchangeProduct: state => productId => state.products.find(p => p.id === productId),
    getPointExchangePrice: (_state, getters) => (productId) => {
      const product = getters.getPointExchangeProduct(productId)
      switch (getters.getPointTypeOfContract.toLowerCase()) {
        case 'sp':
          return product.spPoint
        case 'fp':
          return product.fpPoint
        case 'tvp':
          return product.tvpPoint
        default:
          throw new Error('UNKNOWN_POINT_TYPE')
      }
    },
    getPointExchangeCartPrice: (state, getters) => {
      return getters.getPointExchangeCartList.reduce((total, item) => total + item.total, 0)
    },
    getPointExchangeCartList: (state, getters) => {
      return Object.entries(state.cart).map(
        ([id, quantity]) => {
          const idNum = parseInt(id)
          const product = getters.getPointExchangeProduct(idNum)
          const price = getters.getPointExchangePrice(idNum)
          return {
            id: idNum,
            quantity,
            product,
            price,
            total: quantity * price
          }
        }
      )
    },
    getPointToUseForPointExchange: (state, getters) => {
      return getters.getPointByContractId(state.contractId)
    },
    getPointTypeOfContract: (state, getters) => {
      return getters.getPointToUseForPointExchange.type
    }
  },
  actions
}

export default contract

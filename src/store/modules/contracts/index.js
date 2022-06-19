import { contractIsForNewBooking, ProductTypeNameToId } from '@/constants/product'
import actions from './actions'

const contract = {
  state: {
    contractPoints: [],
    tvp: null,
    contracts: []
  },
  mutations: {
    setCurrentTvp (state, tvp) {
      state.tvp = tvp
    },
    setContractPoints (state, contractPoints) {
      state.contractPoints = contractPoints
    },
    setContracts (state, contracts) {
      state.contracts = contracts
    }
  },
  getters: {
    remainingPoints: state => {
      const points = state.contractPoints ?? []
      if (state.tvp > 0) {
        points.push({
          type: 'tvp',
          contractId: null,
          name: '東急バケーションズポイント',
          pointRemains: state.tvp
        })
      }
      return points
    },
    remainingTvp: state => state.tvp,
    getPointByContractId: (state, getters) => contractId => {
      return getters.remainingPoints.find(p => p.contractId === contractId)
    },
    getContractsForBooking: (state) => {
      const lastContractEndDate = {}
      const lastContractId = {}
      state.contracts.forEach(c => {
        if (!lastContractEndDate[c.productType.id] || lastContractEndDate[c.productType.id] < c.endDate) {
          lastContractEndDate[c.productType.id] = c.endDate
          lastContractId[c.productType.id] = c.id
        }
      })
      return state
        .contracts
        .filter(c => c.productType.id !== ProductTypeNameToId.VS) // 'VS' is not supported in this web
        .filter(c => {
          if (c.productType.id === ProductTypeNameToId.MW || c.productType.id === ProductTypeNameToId.VM) {
            // for these product we must return the latest contract only so
            return lastContractId[c.productType.id] === c.id
          }
          return true
        })
        .filter(c => contractIsForNewBooking(c.productType.id))
    },
    getContractById: (state) => contractId => {
      return state.contracts.find(c => c.id === contractId)
    }
  },
  actions
}

export default contract

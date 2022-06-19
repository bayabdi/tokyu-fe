import {
  GET_CONTRACT_POINTS_SUMMARY,
  GET_MY_AVAILABLE_POINTS,
  MY_CONTRACT_LIST,
  LOAD_CURRENT_CONTRACTS,
  MY_PW_CONTRACT,
  MY_VM_CONTRACT,
  MY_SP_CONTRACT,
  GET_CONTRACT_PRODUCT_TYPE,
  MY_MW_CONTRACT
} from '@/api/graphql/contract'
import { apolloClient } from '@/plugins/apollo'

export default {
  async loadRemainingPoints ({ commit }) {
    const res = await apolloClient.query({
      query: GET_MY_AVAILABLE_POINTS,
      fetchPolicy: 'no-cache'
    })

    const { contractPoints, tvpPoint } = res.data.myAvailablePoints
    commit('setCurrentTvp', tvpPoint)
    const contractIdAndPoints = contractPoints.map(cp => ({
      type: cp.contract.productTypeId === 2 ? 'sp' : 'fp',
      contractId: cp.contractId,
      name: cp.contract.productType.name,
      pointRemains: cp.pointRemains
    }))
    commit('setContractPoints', contractIdAndPoints)
  },

  async myContractList (context, { apollo }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: MY_CONTRACT_LIST,
        variables: {
          today: new Date()
        }
      }).then(data => {
        resolve(data)
        context.commit('setIsLoading', false)
      }).catch(error => reject(error))
    })
  },

  async myPwContract (context, { apollo, contractId }) {
    context.commit('setIsLoading', true)
    return new Promise((resolve, reject) => {
      apollo.query({
        query: MY_PW_CONTRACT,
        variables: {
          contractId: contractId
        }
      }).then(data => {
        resolve(data)
        context.commit('setIsLoading', false)
      }).catch(error => reject(error))
    })
  },

  async myVmContract (context, { apollo, contractId }) {
    context.commit('setIsLoading', true)
    return new Promise((resolve, reject) => {
      apollo.query({
        query: MY_VM_CONTRACT,
        variables: {
          contractId: contractId
        }
      }).then(data => {
        resolve(data)
        context.commit('setIsLoading', false)
      }).catch(error => reject(error))
    })
  },

  async myMwContract (context, { apollo, contractId }) {
    context.commit('setIsLoading', true)
    return new Promise((resolve, reject) => {
      apollo.query({
        query: MY_MW_CONTRACT,
        variables: {
          contractId: contractId
        }
      }).then(data => {
        resolve(data)
        context.commit('setIsLoading', false)
      }).catch(error => reject(error))
    })
  },

  async mySPContract (context, { apollo, contractId }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: MY_SP_CONTRACT,
        variables: {
          contractId: contractId
        }
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  },

  async loadContracts ({ commit }) {
    const res = await apolloClient.query({
      query: LOAD_CURRENT_CONTRACTS
    })

    const contracts = res.data.myContractList.items
    commit('setContracts', contracts)
  },

  async getContractPointSummary (_ctx, { contractId }) {
    const res = await apolloClient.query({
      query: GET_CONTRACT_POINTS_SUMMARY,
      variables: { contractId },
      fetchPolicy: 'no-cache'
    })

    return res.data.myContractPointSummary
  },

  async getContractProductType (context, { apollo, contractId }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: GET_CONTRACT_PRODUCT_TYPE,
        variables: {
          contractId: contractId
        }
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  }
}

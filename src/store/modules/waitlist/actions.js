import { apolloClient } from '@/plugins/apollo'
import {
  CREATE_CANCEL_WAITLIST,
  WAIT_LISTS,
  CANCEL_FACILITY_PARKING, DELETE_MY_CANCEL_WAIT_LIST

} from '@/api/graphql/waitlist'

export default {
  async createCancelWaitList (_context, {
    roomTypeId,
    checkInDate,
    checkOutDate
  }) {
    const res = await apolloClient.mutate({
      mutation: CREATE_CANCEL_WAITLIST,
      variables: {
        roomTypeId,
        checkInDate,
        checkOutDate,
        type: 'Member'
      }
    })

    return res.data.createMyCancelWaitList
  },
  async waitLists (context, {
    apollo,
    skip,
    take
  }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: WAIT_LISTS
      }).then(data => {
        resolve(data)
        context.commit('setIsLoading', false)
        context.commit('setWaitList', data.data)
      }).catch(error => reject(error))
    })
  },
  async CancelWaitList (context, {
    apollo,
    id
  }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: DELETE_MY_CANCEL_WAIT_LIST,
        variables: {
          id: id
        }
      }).then(data => {
        context.commit('setIsLoading', false)
        context.commit('deleteWaitList', id)
      }).catch(error => reject(error))
    })
  },
  async CancelParkingWaitList (context, {
    apollo,
    id
  }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: CANCEL_FACILITY_PARKING,
        variables: {
          id: id
        }
      }).then(data => {
        context.commit('setIsLoading', false)
        context.commit('deleteParkingWaitList', id)
      }).catch(error => reject(error))
    })
  }
}

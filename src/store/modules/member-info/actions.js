import { apolloClient } from '@/plugins/apollo'
import {
  MY_CLIENT_INFO,
  MY_CLIENT_CHARGE_LIST,
  MY_SUB_MEMBER_LIST,
  UPDATE_MY_MAIN_CONTACT,
  MAIN_CONTACT,
  MY_SUB_MEMBER,
  UPDATE_SUB_MEMBER,
  CREATE_SUB_MEMBER,
  DELETE_SUB_MEMBER,
  REFER_FUTURE_CLIENT
} from '@/api/graphql/member-info'

export default {
  async myClientInfo (context, { apollo }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: MY_CLIENT_INFO
      }).then(data => {
        context.commit('setUser', data.data.myClientInfo)
        context.commit('setMemberInfo', data.data.myClientInfo)
        context.commit('setIsLoading', false)
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async getMainContact (context) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apolloClient.query({
        query: MAIN_CONTACT
      }).then(data => {
        context.commit('setMainContact', data.data.myClientInfo.mainContact)
        context.commit('setIsLoading', false)
        resolve()
      }).catch(error => {
        context.commit('setIsLoading', false)
        console.log(error)
        reject(error)
      })
    })
  },

  async myClientChargeList (context, { apollo, skip, take }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: MY_CLIENT_CHARGE_LIST,
        variables: {
          skip: skip,
          take: take
        }
      }).then(data => {
        context.commit('setIsLoading', false)
        resolve(data.data.myClientChargeList)
      }).catch(error => {
        context.commit('setIsLoading', false)
        reject(error)
      })
    })
  },
  async mySubMemberList (context) {
    return new Promise((resolve, reject) => {
      apolloClient.query({
        query: MY_SUB_MEMBER_LIST,
        fetchPolicy: 'no-cache'
      }).then(data => {
        context.commit('setMySubMemberList', data.data.mySubMemberList)
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async mySubMember (_context, id) {
    const res = await apolloClient.query({
      query: MY_SUB_MEMBER,
      variables: { id },
      fetchPolicy: 'no-cache'
    })
    return res.data.mySubMember
  },
  async updateMySubMemberInfo (_context, {
    id,
    subMemberTypeId,
    memberUser,
    baseInfo
  }) {
    const res = await apolloClient.mutate({
      mutation: UPDATE_SUB_MEMBER,
      variables: {
        id,
        subMemberTypeId,
        memberUser: memberUser,
        baseInfo: baseInfo
      }
    })
    return res.data.updateMySubMemberAccount
  },
  async createMySubMemberInfo (_context, {
    subMemberTypeId,
    memberUser,
    baseInfo
  }) {
    const res = await apolloClient.mutate({
      mutation: CREATE_SUB_MEMBER,
      variables: {
        subMemberTypeId,
        memberUser: memberUser,
        baseInfo: baseInfo
      }
    })
    return res.data.createMySubMemberAccount
  },
  async deleteMySubMember (_context, id) {
    const res = await apolloClient.mutate({
      mutation: DELETE_SUB_MEMBER,
      variables: {
        id
      }
    })
    return res.data.createMySubMemberAccount
  },
  async updateMyMainContact (context, { apollo, mobile, email, postalCode, prefecture, locality, address1, address2 }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: UPDATE_MY_MAIN_CONTACT,
        variables: {
          mobile: mobile,
          email: email,
          postalCode: postalCode,
          prefecture: prefecture,
          locality: locality,
          address1: address1,
          address2: address2
        }
      }).then(data => {
        context.commit('setIsLoading', false)
        resolve(data)
      }).catch(error => {
        context.commit('setIsLoading', false)
        reject(error)
      })
    })
  },
  async sendReferenceFutureClient (context, { apollo, name, kana, tel }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: REFER_FUTURE_CLIENT,
        variables: {
          name: name,
          kana: kana,
          tel: tel
        }
      }).then(data => {
        context.commit('setIsLoading', false)
        resolve(data)
      }).catch(error => {
        context.commit('setIsLoading', false)
        reject(error)
      })
    })
  }
}

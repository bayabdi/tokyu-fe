import {
  REQUEST_MFA_CLIENT,
  CONFIRM_MFA_CLIENT,
  START_PASSWORD_RESET,
  CONFIRM_PASSWORD_RESET,
  REGISTER_EMAIL_START,
  REGISTER_FIRST_USER,
  GET_USER_INFO
} from '@/api/graphql/user'
import { apolloClient } from '@/plugins/apollo'
import { refreshAccessToken } from '@/api/users'

export default {
  async requestMFAClient (context, { apollo, email, password }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: REQUEST_MFA_CLIENT,
        variables: {
          email: email,
          password: password,
          vsIntent: false
        }
      }).then(data => {
        context.commit('setShortToken', data.data.requestMFAClient.token)
        resolve(data)
      }).catch(error => reject(error))
    })
  },

  async confirmMFAClient (context, { apollo, token, code }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: CONFIRM_MFA_CLIENT,
        variables: {
          token: token,
          code: code
        }
      }).then(data => {
        context.commit('setToken', data.data.confirmMFAClient.accessToken)
        context.commit('setRefreshToken', data.data.confirmMFAClient.refreshToken)
        context.commit('setShortToken', null)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logOut (context) {
    context.commit('setToken', null)
    context.commit('setUser', null)
  },
  async startPasswordReset (context, { email }) {
    const res = await apolloClient.mutate({
      mutation: START_PASSWORD_RESET,
      variables: {
        email: email
      }
    })
    context.commit('setResetToken', res.data.requestResetPasswordClient.token)
  },

  async confirmPasswordReset (context, { apollo, code, token, password }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: CONFIRM_PASSWORD_RESET,
        variables: {
          code, token, password
        }
      }).then(data => {
        context.commit('setResetToken', null)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  async refreshAccessToken ({ commit, state }) {
    const { accessToken, refreshToken } = await refreshAccessToken(state.refreshToken)
    commit('setRefreshToken', refreshToken)
    commit('setToken', accessToken)
  },

  async startEmailRegister (_ctx, email) {
    return apolloClient.mutate({
      mutation: REGISTER_EMAIL_START,
      variables: { email }
    })
  },

  async registerFirstUser (_ctx, { token, memberId, birthday, tel, password }) {
    return apolloClient.mutate({
      mutation: REGISTER_FIRST_USER,
      variables: { token, memberId, birthday, tel, password }
    })
  },

  async loadUserInfo ({ commit }) {
    const res = await apolloClient.query({
      query: GET_USER_INFO
    })

    commit('setUserInfo', res.data.myUserInfo)
  }
}

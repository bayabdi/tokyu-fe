import actions from './actions'
import config from '../../../constants'
import { needsTokenRefresh, getPayloadFromJWT } from '@/api/users'

const user = {
  state: {
    id: null,
    email: '',
    name: '',
    role: '',
    permissions: null,
    shortToken: localStorage.getItem(config.shortToken) || '',
    token: localStorage.getItem(config.authToken) || '',
    current: localStorage.getItem('currentUser') || null,
    refreshToken: localStorage.getItem(config.refreshToken) || null,
    resetToken: localStorage.getItem(config.resetToken),
    userInfo: null
  },
  mutations: {
    setToken (state, token) {
      token ? localStorage.setItem(config.authToken, token) : localStorage.removeItem(config.authToken)
      state.token = token
    },
    setShortToken (state, shortToken) {
      shortToken ? localStorage.setItem(config.shortToken, shortToken) : localStorage.removeItem(config.shortToken)
      state.shortToken = shortToken
    },
    setRefreshToken (state, refreshToken) {
      refreshToken ? localStorage.setItem(config.refreshToken, refreshToken) : localStorage.removeItem(config.refreshToken)
      state.refreshToken = refreshToken
    },
    setResetToken (state, token) {
      token ? localStorage.setItem(config.resetToken, token) : localStorage.removeItem(config.resetToken)
      state.resetToken = token
    },
    setUser (state, currentUser) {
      currentUser ? localStorage.setItem(config.user, JSON.stringify(currentUser)) : localStorage.removeItem(config.user)
      state.id = currentUser ? currentUser.id : null
      state.email = currentUser ? currentUser.email : null
      state.name = currentUser ? currentUser.name : null
      state.role = currentUser ? currentUser.role : null
      state.permissions = currentUser ? currentUser.permissions : null
    },
    setEmail (state, email) {
      state.email = email
    },
    setUserInfo (state, userInfo) {
      const addressParts = [
        userInfo.prefecture,
        userInfo.locality,
        userInfo.address1,
        userInfo.address2
      ]
      userInfo.address = addressParts.filter(v => v).join('')
      state.userInfo = userInfo
    }
  },
  getters: {
    tokenExpiresAt: (state, getters) => getters.jwtPayload.exp * 1000,
    needsTokenRefresh: (state) => {
      if (state.token) {
        return needsTokenRefresh(state.token)
      }
      return true
    },
    jwtPayload: state => {
      if (state.token) return getPayloadFromJWT(state.token)
      return {}
    },
    userToken: (state) => state.token,
    userRole: (_, getters) => getters.jwtPayload.role?.toUpperCase(),
    isMainUser: (_, getters) => getters.userRole === 'MAIN',
    isSubUser: (_, getters) => getters.userRole === 'SUB',
    isFamilyUser: (_, getters) => getters.userRole === 'FAMILY',
    isCompanyUser: (_, getters) => !!getters.jwtPayload.isCompany
  },
  actions
}

export default user

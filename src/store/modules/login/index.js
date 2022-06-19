import actions from './actions'
import config from '@/constants'

const login = {
  state: {
    rememberLoginEmail: localStorage.getItem(config.rememberLoginEmail) === '1',
    savedLoginEmail: localStorage.getItem(config.savedLoginEmail)
  },
  mutations: {
    setRememberLoginEmail (state, rememberLoginEmail) {
      state.rememberLoginEmail = rememberLoginEmail
      localStorage.setItem(config.rememberLoginEmail, state.rememberLoginEmail ? '1' : '0')
    },
    setSavedLoginEmail (state, loginEmail) {
      state.savedLoginEmail = loginEmail
      localStorage.setItem(config.savedLoginEmail, state.savedLoginEmail)
    }
  },
  getters: {
    rememberLoginEmail: (state) => state.rememberLoginEmail,
    savedLoginEmail: (state) => state.savedLoginEmail
  },
  actions
}

export default login

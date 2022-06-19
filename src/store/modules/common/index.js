import actions from './actions'

const common = {
  state: {
    isLoading: false,
    callcenterDialog: false
  },
  mutations: {
    setIsLoading (state, val) {
      state.isLoading = val
    },
    showCallCenterDialog (state, val) {
      state.callcenterDialog = val !== false
    }
  },
  actions
}

export default common

import actions from './actions'

const vacation = {
  state: {
    TvpItems: []
  },
  mutations: {
    setTvpItems (state, items) {
      state.TvpItems = items
    }
  },
  actions
}

export default vacation

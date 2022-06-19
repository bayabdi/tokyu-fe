import actions from './actions'

const roomType = {
  state: {
    isNoSmoking: false,
    isSmoking: false,
    isTwoBed: false,
    isPetAllowed: false,
    isFreeParking: false
  },
  mutations: {
    setRoomType (state, model) {
      state.isFreeParking = model.isFreeParking
      state.isNoSmoking = model.isNoSmoking
      state.isPetAllowed = model.isPetAllowed
      state.isSmoking = model.isNoSmoking
      state.isTwoBed = model.isTwoBed
    }
  },
  actions
}

export default roomType

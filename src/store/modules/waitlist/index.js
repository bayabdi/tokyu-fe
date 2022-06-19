import actions from './actions'

const waitlist = {
  state: {
    myCancelWaitList: [],
    myFacilityParkingCancelWaitlistList: []
  },
  mutations: {
    setWaitList (state, data) {
      state.myCancelWaitList = data.myCancelWaitList.items
      state.myFacilityParkingCancelWaitlistList = data.myFacilityParkingCancelWaitlistList.items
    },
    deleteWaitList (state, data) {
      const index = state.myCancelWaitList.findIndex(c => c.id === data.id)
      state.myCancelWaitList.splice(index, 1)
    },
    deleteParkingWaitList (state, data) {
      const index = state.myFacilityParkingCancelWaitlistList.findIndex(c => c.id === data.id)
      state.myFacilityParkingCancelWaitlistList.splice(index, 1)
    }
  },
  actions
}

export default waitlist

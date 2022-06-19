import actions from '@/store/modules/documents/actions'

const documents = {
  state: {
    vacationLifeList: [],
    otherPublicDocList: []
  },
  mutations: {
    setList (state, data) {
      state.vacationLifeList = data.vacationLifeList
      state.otherPublicDocList = data.otherPublicDocList
    }
  },
  actions
}

export default documents

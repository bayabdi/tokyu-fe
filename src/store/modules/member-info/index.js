import actions from './actions'

const memberInfo = {
  state: {
    memberCard: {
      id: null,
      memberId: '',
      name: ''
    },
    mainContact: {},
    mySubMemberList: []
  },
  mutations: {
    setMemberInfo (state, data) {
      state.memberCard = data
      state.mainContact = data.mainContact
    },
    setMainContact (state, data) {
      state.mainContact = data
    },
    setMySubMemberList (state, data) {
      state.mySubMemberList = data
    }
  },
  actions
}

export default memberInfo

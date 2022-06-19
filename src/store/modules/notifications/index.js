import actions from './actions'

const notifications = {
  state: {
    news: [],
    new: {
      title: '',
      body: '',
      id: '',
      imageUrl: ''
    }
  },
  mutations: {
    setNews (state, news) {
      state.news = news
    },
    setNew (state, id) {
      state.new = state.news.find(x => x.id === id.id)
    }
  },
  actions
}

export default notifications

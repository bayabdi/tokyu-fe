import store from '@/store'

export default {
  install (Vue) {
    Vue.prototype.$doLoading = async function (action) {
      store.commit('setIsLoading', true)
      try {
        return await action()
      } finally {
        store.commit('setIsLoading', false)
      }
    }
  }
}

import { GET_DOCUMENTS, USER_GUIDE_LIST } from '@/api/graphql/documents'

export default {
  async getDocuments (context, { apollo }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: GET_DOCUMENTS
      }).then(data => {
        context.commit('setIsLoading', false)
        context.commit('setList', data.data)
        resolve(data)
      }).catch(error => reject(error))
    })
  },
  async getUserGuideList (context, { apollo }) {
    return new Promise((resolve, reject) => {
      context.commit('setIsLoading', true)
      apollo.mutate({
        mutation: USER_GUIDE_LIST
      }).then(data => {
        context.commit('setIsLoading', false)
        resolve(data.data.userGuideList)
      }).catch(error => reject(error))
    })
  }
}

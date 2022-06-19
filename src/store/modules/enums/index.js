import { apolloClient } from '@/plugins/apollo'
import gql from 'graphql-tag'

const enums = {
  state: {
    relationships: null,
    prefectures: null
  },
  mutations: {
    setRelationships (state, relationships) {
      state.relationships = relationships
    },
    setPrefectures (state, prefectures) {
      state.prefectures = prefectures
    }
  },
  actions: {
    async relationshipsLoadEnum ({ commit }) {
      const res = await apolloClient.query({
        query: gql`query { enumPersonRelationshipList {id name} }`
      })
      commit('setRelationships', res.data.enumPersonRelationshipList)
    },
    async prefecturesLoadEnum ({ commit }) {
      const res = await apolloClient.query({
        query: gql`query { enumPrefectureList { id name } }`
      })
      commit('setPrefectures', res.data.enumPrefectureList)
    }
  }
}

export default enums

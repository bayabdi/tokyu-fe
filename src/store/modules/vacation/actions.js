import {
  MY_TVP_HISTORY_LIST
} from '@/api/graphql/vacation'

export default {
  async myTvpList (context, { apollo, skip, take }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: MY_TVP_HISTORY_LIST,
        variables: {
          skip: skip,
          take: take
        }
      }).then(data => {
        resolve(data.data.myTvpHistoryList)
      }).catch(error => reject(error))
    })
  }
}

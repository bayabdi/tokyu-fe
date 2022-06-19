import {
  MY_WEB_NOTIFICATION_LIST,
  MY_WEB_NOTIFICATION_LIST_URGENT
} from '@/api/graphql/notifications'

export default {
  async myWebNotificationList (context, {
    apollo,
    take,
    skip
  }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: MY_WEB_NOTIFICATION_LIST,
        variables: {
          take: take,
          skip: skip,
          important: false
        }
      }).then(data => {
        context.commit('setNews', data.data.myWebNotificationList.items)
        resolve(data)
      }).catch(error => reject(error))
    })
  },

  async myWebNotificationListUrgent (context, { apollo, take, skip }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: MY_WEB_NOTIFICATION_LIST_URGENT,
        variables: {
          take: take,
          skip: skip,
          important: true
        }
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  }
}

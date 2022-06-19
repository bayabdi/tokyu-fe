import {
  MY_EXPIRING_RIGHTS
} from '@/api/graphql/rights'

export default {
  async myExpiringRights (context, { apollo }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: MY_EXPIRING_RIGHTS
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  }
}

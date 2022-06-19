import { MY_BOOKING_LIST } from '@/api/graphql/booking'

export default {
  async mostRecentBooking (context, { apollo }) {
    let toDate = new Date()
    toDate = new Date(toDate.setMonth(toDate.getMonth() + parseInt(process.env.VUE_APP_MOST_RECENT_BOOKING_MONTH)))

    return new Promise((resolve, reject) => {
      apollo.query({
        query: MY_BOOKING_LIST,
        variables: {
          fromDate: new Date(),
          toDate: toDate
        },
        fetchPolicy: 'no-cache'
      }).then(data => {
        resolve(data)
      }).catch(error => reject(error))
    })
  }
}

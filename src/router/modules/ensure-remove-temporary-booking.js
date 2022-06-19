import store from '@/store'

export default async function ensureRemoveTemporaryBooking (to, from, next) {
  if (!to.matched.some(record => record.meta.keepTemporaryBooking)) {
    await store.dispatch('deleteTemporaryBooking')
    return next()
  } else {
    return next()
  }
}

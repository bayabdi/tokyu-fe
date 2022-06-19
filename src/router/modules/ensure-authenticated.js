import store from '@/store'

export default async function ensureAuthenticated (to, from, next) {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.state.user.token) {
      // not logged in
      return next('/Login')
    }
    if (store.getters.needsTokenRefresh) {
      // check if token refresh is needed, if it is refresh it
      try {
        await store.dispatch('refreshAccessToken')
      } catch (e) {
        return next('/Login')
      }
    }

    // check card registration unless noCard=true route
    if (!to.matched.some(record => record.meta.noCard) && !store.getters.hasValidCard) {
      const hasCard = await store.dispatch('checkSavedCard')
      if (!hasCard) return next(`/new-credit-card?from=${to.fullPath}`)
    }
    return next()
  } else {
    return next()
  }
}

export const requireAuthMeta = () => ({
  auth: true
})

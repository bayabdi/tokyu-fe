import Vue from 'vue'
import VueRouter from 'vue-router'
import Page404 from '@/views/Page404'
import { i18n } from '@/plugins/i18n'
import appRouter from './modules/app-router'
import authRouter from './modules/auth-router'
import noAuthRouter from './modules/no-auth-router'
import ensureAuthenticated from '@/router/modules/ensure-authenticated'
import ensureRemoveTemporaryBooking from './modules/ensure-remove-temporary-booking'

Vue.use(VueRouter)

const routes = [
  authRouter,
  noAuthRouter,
  appRouter,
  {
    path: '*',
    name: i18n.t('title.pageNotFound'),
    component: Page404,
    meta: { title: i18n.t('title.pageNotFound') }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach(ensureAuthenticated)
router.beforeEach(ensureRemoveTemporaryBooking)

export default router

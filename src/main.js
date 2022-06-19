import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { i18n } from './plugins/i18n'
import './permission'
import './assets/styles/index.scss'
import { defaultApolloProvider } from './plugins/apollo'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import ShowGqlError from './plugins/show-gql-error'
import filters from './filters'
import doLoading from './plugins/do-loading'

Vue.config.productionTip = false

Vue.use(VueToast, {
  position: 'bottom-right',
  duration: 5000
})

Vue.use(ShowGqlError, {
  toast: Vue.prototype.$toast
})

Vue.use(doLoading)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use({
  install (Vue) {
    Vue.prototype.$isMainUser = function () {
      return this.$store.getters.isMainUser
    }
    Vue.prototype.$isSubUser = function () {
      return this.$store.getters.isSubUser
    }
    Vue.prototype.$isFamilyUser = function () {
      return this.$store.getters.isFamilyUser
    }
    Vue.prototype.$isCompanyUser = function () {
      return this.$store.getters.isCompanyUser
    }
  }
})

new Vue({
  router,
  store,
  apolloProvider: defaultApolloProvider,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

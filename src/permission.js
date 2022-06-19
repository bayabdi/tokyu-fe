import Vue from 'vue'
import router from './router'
import setPageTitle from '@/utils/set-page-title'

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = setPageTitle(to.meta.title)
  })
})

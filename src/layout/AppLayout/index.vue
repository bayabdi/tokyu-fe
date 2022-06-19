<template>
  <div class="wrapper" :class="$route.meta.whiteBackground ? 'bg-white' : 'bg-silver'">
    <AppLayoutHeader/>
    <AppLayoutMain />
    <AppLayoutFooter/>
    <OverLayLoading />
    <CallCenterDialog />
  </div>
</template>

<script>
import { AppLayoutHeader, AppLayoutMain, AppLayoutFooter } from './components'
import OverLayLoading from '@/components/OverLayLoading'
import CallCenterDialog from '@/components/Callcenter/CallCenterDialog'

export default {
  name: 'AppLayout',
  components: {
    AppLayoutHeader,
    AppLayoutMain,
    AppLayoutFooter,
    OverLayLoading,
    CallCenterDialog
  },
  data () {
    return {
      isScroll: false
    }
  }
}
</script>

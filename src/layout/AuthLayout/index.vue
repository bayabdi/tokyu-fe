<template>
  <div class="wrapper bg-primary">
    <AuthLayoutHeader />
    <AuthLayoutMain />
    <AuthLayoutFooter />
    <OverLayLoading />
  </div>
</template>

<script>
import {
  AuthLayoutHeader,
  AuthLayoutMain,
  AuthLayoutFooter
} from './components'
import OverLayLoading from '@/components/OverLayLoading'

export default {
  name: 'AuthLayout',
  components: {
    AuthLayoutHeader,
    AuthLayoutMain,
    AuthLayoutFooter,
    OverLayLoading
  }
}
</script>

<style lang="scss" scoped>
div {
  min-height: 100vh;
}
</style>

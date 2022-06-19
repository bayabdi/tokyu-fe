<template>
  <div class="wrapper bg-primary">
    <NoAuthLayoutHeader />
    <NoAuthLayoutMain />
    <NoAuthLayoutFooter />
    <OverLayLoading />
  </div>
</template>

<script>
import {
  NoAuthLayoutHeader,
  NoAuthLayoutMain,
  NoAuthLayoutFooter
} from './components'
import OverLayLoading from '@/components/OverLayLoading'

export default {
  name: 'NoAuthLayout',
  components: {
    NoAuthLayoutHeader,
    NoAuthLayoutMain,
    NoAuthLayoutFooter,
    OverLayLoading
  }
}
</script>

<style lang="scss" scoped>
div {
  min-height: 100vh;
}
</style>

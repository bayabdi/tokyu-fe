<template>
  <footer class="bg-tertiary px-10 px-md-0 py-8">
    <ButtonScrollTop />
    <div class="t-container">
      <AppLayoutMenuList />
      <p class="text-center text-small--c-white mt-15">Copyright © Tokyu Corporation All Right Reserved</p>
    </div>
  </footer>
</template>

<script>
import AppLayoutMenuList from './AppLayoutMenuList'
import ButtonScrollTop from '@/components/ButtonScrollTop'

export default {
  name: 'AppLayoutFooter',
  components: {
    AppLayoutMenuList,
    ButtonScrollTop
  }
}
</script>

<style lang="scss" scoped>
  footer {
    position: relative;
    z-index: 1;
  }
</style>

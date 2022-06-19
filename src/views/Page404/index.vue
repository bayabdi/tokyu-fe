<template>
  <div>
    <h1 class="text-heading--c-prm">{{ $route.meta.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>

<style lang="scss" scoped>
div {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px
}
</style>

<template>
  <main>
    <router-view :key="key" />
  </main>
</template>

<script>
export default {
  name: 'AppLayoutMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

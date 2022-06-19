<template>
  <main class="pb-12 bg-silver">
    <router-view :key="key" />
  </main>
</template>

<script>
export default {
  name: 'NoAuthLayoutMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<template>
  <main class="pb-12">
    <router-view :key="key" />
  </main>
</template>

<script>
export default {
  name: 'AuthLayoutMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

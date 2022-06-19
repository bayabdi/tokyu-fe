<template>
  <v-btn
    class="bg-white"
    color="var(--color__primary)"
    large
    outlined
    fab
    absolute
    top
    right
    @click="toTop"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonScrollTop',
  methods: {
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-btn--fab {
    border-width: 2px !important;
  }
</style>

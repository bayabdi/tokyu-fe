<template>
  <v-overlay :value="isLoading" z-index="990">
    <v-progress-circular
      :size="50"
      color="var(--color__primary)"
      indeterminate
    />
  </v-overlay>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OverLayLoading',
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep.v-overlay--active {
  .v-overlay__scrim {
    opacity: .15 !important
  }
}
</style>

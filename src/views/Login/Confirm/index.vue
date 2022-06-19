<template>
    <v-container>
        <h3 class="--c-white font-weight-medium text-center px-2 mb-8">
          <template v-if="isSuccess">{{ $t('authPage.loggingInSuccess') }}</template>
          <template v-else>{{ $t('authPage.loggingInWait') }}</template>
        </h3>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      isSuccess: false
    }
  },
  async mounted () {
    await this.$doLoading(async () => this.$showGqlError(async () => {
      await this.$store.dispatch('confirmMFAClient', {
        apollo: this.$apollo,
        code: this.$route.query.code,
        token: this.$route.query.token
      })
      await this.$store.dispatch('myClientInfo', { apollo: this.$apollo })

      this.isSuccess = true
      // Redirect to main page
      await this.$router.push({
        path: '/home'
      })
    }))
  }
}
</script>

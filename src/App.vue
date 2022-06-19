<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  async mounted () {
    if (process.env.NODE_ENV === 'development') {
      // this.$store.commit('setToken', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1BSU4iLCJjbGllbnRJZCI6MSwic3ViTWVtYmVySWQiOm51bGwsInR5cGUiOjEsImlhdCI6MTYzMTU5ODgwMiwiZXhwIjoxNjYzMTU2NDAyfQ.qjHK05bLLBXZmRrSJfqUr9gqlmK2NcFjl49IbNYS4ItUwKJRpY2BcCZAcgyZnfghCcCgdYjzD_OpPCtCOA38oIaiFaPRmFvenaI2ewI1OZ977Kt2Timhe-caDzFOGTFLYd3JCLDsndlWQnjVMzq2jZO6L7P7RoAAVuIrcPiMyXx6WaLde9JLX7bcY0Z7Hbb-fBGzCQ-VNtZrPm34yOGnHMYRJo_djNRa0_vieHVaEx6TFIk_tiLVpIF2ZZGzicI6CO82YBZpPTnSUbTmw0Hirvt5Rst1lH3xea6NguqNEp3cKQ1YZ6LBE6qckIuI5qLai1TZC2ZnOTMAKyJ0Uf6Mbg')
    }

    if (this.$store.getters.userToken) {
      await this.$store.dispatch('myClientInfo', { apollo: this.$apollo })
    }
  }
}
</script>

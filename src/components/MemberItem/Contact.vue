<template>
  <div>
    <div class="bg-white">
      <div class="bg-primary guest-form-header">
        <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
          {{ $t('booking.memberContactInfo') }}
        </div>
      </div>
      <div class="px-4 mb-4 text-title" v-if="!loading">

        <div class="font-weight-bold pt-6 pb-2 --c-prm">
          {{ $t("common.membersName") }}
        </div>
        <div class="font-weight-bold pb-2 --c-bg">
          {{ membersName }}
        </div>
        <div class="font-weight-bold pb-2 --c-prm">
          {{ $t("common.emailAddress") }}
        </div>
        <div class="pb-2 --c-bg">
          {{ emailAddress }}
        </div>
        <div class="font-weight-bold pb-3 --c-prm">
          {{ $t("common.phoneNumber") }}
        </div>
        <div class="pb-2 --c-bg">
          {{ phoneNumber }}
        </div>
        <div class="font-weight-bold pb-1 --c-prm">
          {{ $t("common.address") }}
        </div>
        <div class="pb-7 --c-bg">
          {{ address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  async mounted () {
    await this.$store.dispatch('loadUserInfo')
    this.loading = false
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    userInfo () { return this.$store.state.user.userInfo },
    membersName () { return this.userInfo.name },
    emailAddress () { return this.$store.state.user.email },
    phoneNumber () { return this.userInfo.tel || this.userInfo.mobile },
    address () { return this.userInfo.address }
  }
}
</script>

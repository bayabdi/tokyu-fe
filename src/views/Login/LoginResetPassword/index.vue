<template>
  <div class="form-container">
    <template v-if="!isResetSuccess">
      <h3
        class="--c-white font-weight-medium text-center px-2 mb-6"
      >
        {{ $t("common.setPassword") }}
      </h3>
      <v-form ref="form" lazy-validation class="--c-white px-10">
        <label for="newPassword">{{ $t("authPage.enterNewPassword") }}</label>
        <v-text-field
          id="newPassword"
          :rules="rules.password"
          @keydown.space.prevent
          solo
          name="new-password"
          type="password"
          v-model="password"
          class="mt-2"
        />
        <label for="confirmNewPassword">{{ $t("authPage.enterAgainToConfirm") }}</label>
        <v-text-field
          id="confirmNewPassword"
          :rules="rules.passwordConfirm"
          solo
          name="confirm-new-password"
          type="password"
          class="mt-2"
        />

        <v-btn
          x-large
          rounded
          block
          @click="submitForm"
          class="btn-submit mt-2"
        >{{ $t("buttons.setUp") }}</v-btn>
      </v-form>
    </template>

    <!-- If reset password successfully -->
    <div v-else class="mt-8 px-10">
      <h3
        class="--c-white font-weight-medium mb-8"
        v-html="$t('authPage.resetPasswordSuccess')"
      ></h3>
      <v-btn x-large rounded block to="/login" class="btn-submit mt-3">{{ $t("buttons.toLoginScreen") }}</v-btn>
    </div>
    <!-- ------------------------------- -->
  </div>
</template>

<script>
import { checkPassword } from '@/utils/validate'

export default {
  name: 'LoginResetPassword',
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('confirmPasswordReset', {
            apollo: this.$apollo,
            code: this.$route.query.code,
            token: this.$route.query.token,
            password: this.password
          })
        })
        this.isResetSuccess = true
        setTimeout(async () => {
          await this.$router.push('/login')
        }, 2000)
      }
    }
  },
  data () {
    return {
      isResetSuccess: false,
      password: '',
      rules: {
        password: [
          v => !!v || this.$t('rules.passwordIsRequired'),
          v => checkPassword(v) || this.$t('rules.passwordRules')
        ],
        passwordConfirm: [
          v => v === this.password || this.$t('rules.passwordNotMatch')
        ]
      }
    }
  }
}
</script>

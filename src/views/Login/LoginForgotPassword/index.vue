<template>
  <div class="form-container">
    <template v-if="!isSendEmail">
      <h3 class="--c-white font-weight-medium text-center px-4 mb-8">
        {{ $t("authPage.enterEmailToResetPassword") }}
      </h3>
      <v-form ref="form" lazy-validation class="--c-white px-10">
        <label for="email">{{ $t("common.emailAddress") }}</label>
        <v-text-field
          id="email"
          :rules="rules.email"
          v-model="email"
          x-large
          solo
          type="email"
          class="mt-2"
        />

        <v-btn
          x-large
          rounded
          block
          @click="submitForm"
          class="btn-submit mt-2"
        >
          {{ $t("buttons.send") }}
        </v-btn>
      </v-form>
    </template>

    <!-- If link reset mail has been sent-->
    <h3 v-else class="--c-white font-weight-medium text-center px-4">
      {{ $t("authPage.linkResetHasBeenSent") }}
    </h3>
    <!-- ------------------------------- -->
  </div>
</template>

<script>
import {
  checkEmail
} from '@/utils/validate'

export default {
  name: 'LoginForgotPassword',
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('startPasswordReset', {
            apollo: this.$apollo,
            email: this.email
          })
        })
        this.isSendEmail = true
      }
    }
  },
  data () {
    return {
      email: null,
      isSendEmail: false,
      rules: {
        email: [
          v => !!v || this.$t('rules.emailIsRequired'),
          v => checkEmail(v) || this.$t('rules.emailMustBeValid')
        ]
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <template v-if="!isEmailSent">
      <h3 class="font-weight-medium --c-white text-center px-2 mb-8">
        {{ $t("authPage.registerEmailAddress") }}
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

        <label for="emailConfirm">{{ $t("authPage.enterAgainToConfirm") }}</label>
        <v-text-field
          id="emailConfirm"
          :rules="rules.emailConfirm"
          solo
          type="email"
          class="mt-2"
        />

        <v-btn
          x-large
          rounded
          block
          @click="submitForm"
          class="btn-submit mt-3"
        >
          {{ $t("buttons.next") }}
        </v-btn
        >
      </v-form>
    </template>

    <!-- If link register mail has been sent -->
    <div v-else class="mt-8 px-10">
      <p class="text-medium font-weight-medium --c-white">
        {{ $t("authPage.confirmEmail.line1") }}<br>
        {{ $t("authPage.confirmEmail.line2") }}<br>
        {{ $t("authPage.confirmEmail.line3") }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  checkEmail
} from '@/utils/validate'

export default {
  name: 'Register',
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('startEmailRegister', this.email)
          this.isEmailSent = true
        })
      }
    }
  },
  data () {
    return {
      isEmailSent: false,
      email: '',
      rules: {
        email: [
          v => !!v || this.$t('rules.emailIsRequired'),
          v => checkEmail(v) || this.$t('rules.emailMustBeValid')
        ],
        emailConfirm: [v => v === this.email || this.$t('rules.emailNotMatch')]
      }
    }
  }
}
</script>

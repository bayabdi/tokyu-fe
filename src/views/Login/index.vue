<template>
  <div class="form-container">
    <!-- Login failed notice -->
    <div v-if="isLoginFailed" class="pa-4 rounded-lg bg-white mb-7 mx-10">
      <dive class="text-medium --c-dark-red font-weight-medium">
        <strong>
          {{ $t("authPage.loginFailed.line1") }}
          <br />
          {{ $t("authPage.loginFailed.line2") }}
        </strong>
      </dive>
      <p class="text-medium">
        {{ $t("authPage.loginFailed.line3") }} <br />
        <strong>000-000-000</strong>
      </p>
    </div>
    <!-- ------------------- -->

    <h3
      v-if="!isLoginFailed"
      class="--c-white font-weight-medium text-center px-2 mb-4"
    >
      {{ $t("authPage.membersLogInBelow") }}
    </h3>
    <v-form ref="form" lazy-validation class="--c-white px-10">
      <label for="email">{{ $t("common.emailAddress") }}</label>
      <v-text-field
        id="email"
        :rules="rules.email"
        v-model="email"
        x-large
        solo
        name="email"
        type="email"
        class="mt-2"
      />

      <label for="password">{{ $t("common.loginPassword") }}</label>
      <v-text-field
        id="password"
        :rules="rules.password"
        @keydown.space.prevent
        solo
        name="password"
        type="password"
        current-password
        v-model="password"
        class="mt-2"
      />

      <v-checkbox
        v-model="rememberLoginEmail"
        :label="$t('authPage.saveYourLoginID')"
        hide-details
        :ripple="false"
        class="mt-0 pt-0 text-center white-checkbox"
      ></v-checkbox>

      <v-main>
        <router-link
          to="/login/forgot-password"
          class="text-title --c-white text-center mt-4 d-block"
        >
          {{ $t("authPage.forgotYourPassword") }}
          <v-icon class="--c-white">mdi-chevron-right</v-icon>
        </router-link>
        <p class="text-small pt-3 --w-light">
          {{ $t("authPage.loginHelpMessage") }}
        </p>
        <router-link
          to="#"
          class="text-medium pt-3 --c-white text-center d-block text-decoration-underline"
        >
          {{ $t('common.membershipAgreement') }}
        </router-link>
      </v-main>
      <v-btn
        x-large
        rounded
        block
        @click="submitForm"
        class="btn-submit my-4"
      >{{ $t("title.login") }}</v-btn
      >
    </v-form>

    <div class="text-center mt-6">
      <div class="text-medium--c-white mb-2">
        {{ $t("authPage.ticketUsers") }}
      </div>
      <v-btn
        to="/login/register-ticket"
        outlined
        rounded
        x-large
        color="var(--color__white)"
        class="bg-primary px-10"
      >
        {{ $t("buttons.registerEmail") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import {
  checkEmail
} from '@/utils/validate'

export default {
  name: 'Login',
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        try {
          await this.$showGqlError(
            async () => {
              await this.$store.dispatch('requestMFAClient', {
                apollo: this.$apollo,
                email: this.email,
                password: this.password
              })
            }, {
              CLIENT_LOGIN_NO_VALID_CONTRACT: () => {
                this.isLoginFailed = true
              }
            }
          )
          this.$toast.info(this.$t('toast.checkEmail').toString(), {
            duration: 0
          })
          this.password = ''

          // Save login before redirect
          await this.$store.commit('setSavedLoginEmail', this.$store.getters.rememberLoginEmail ? this.email : '')
        } catch (e) {}
      }
    }
  },
  data () {
    return {
      email: this.$store.getters.savedLoginEmail,
      password: '',
      rules: {
        email: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkEmail(v) || this.$t('rules.invalid')
        ],
        password: [
          v => !!v || this.$t('rules.isRequired')
        ]
      },
      rememberLoginEmail: this.$store.getters.rememberLoginEmail,
      isLoginFailed: false
    }
  },
  watch: {
    rememberLoginEmail (val) {
      this.$store.commit('setRememberLoginEmail', val)
    }
  }
}
</script>

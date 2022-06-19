<template>
  <div class="form-container">
    <template v-if="!isSendEmail">
      <h3 class="--c-white font-weight-medium text-center px-2 mb-8">
        {{ $t("authPage.registerEmailForTicket") }}
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

        <label for="confirmEmail">{{ $t("authPage.enterAgainToConfirm") }}</label>
        <v-text-field
          id="confirmEmail"
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
          class="btn-submit mt-2"
        >
          {{ $t("buttons.next") }}
        </v-btn>
      </v-form>
    </template>

    <!-- If link register mail has been sent -->
    <div v-else class="mt-8 px-10">
      <h3 class="--c-white font-weight-medium px-2 mb-8">
        {{ $t("authPage.checkMailSent") }}
      </h3>
    </div>
    <!-- ----------------------------------- -->
  </div>
</template>

<script>
import {
  checkEmail
} from '@/utils/validate'

export default {
  name: 'LoginTicketRegisterEmail',
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        await this.$doLoading(async () => {
          await this.$showGqlError(async () => {
            await this.$store.dispatch('registerEmailToTicket', {
              ticketNo: this.ticketId,
              secret: this.secret,
              email: this.email
            })
            this.isSendEmail = true
          })
        })
      }
    }
  },
  data () {
    return {
      email: '',
      isSendEmail: '',
      rules: {
        email: [
          v => !!v || this.$t('rules.emailIsRequired'),
          v => checkEmail(v) || this.$t('rules.emailMustBeValid')
        ],
        emailConfirm: [v => v === this.email || this.$t('rules.emailNotMatch')]
      }
    }
  },
  computed: {
    ticketId () {
      return this.$route.query.tn
    },
    secret () {
      return this.$route.query.sc
    }
  }
}
</script>

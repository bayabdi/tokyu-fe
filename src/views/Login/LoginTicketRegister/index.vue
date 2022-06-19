<template>
  <div class="form-container">
    <h3 class="font-weight-medium --c-white text-center px-2 mb-8">
      {{ $t("authPage.enterTheInformation") }}
    </h3>
    <v-form ref="form" class="--c-white px-5" lazy-validation>
      <!-- START Ticket-number -->
      <label for="ticketInput1">{{ $t("common.ticketNumber") }}</label>
      <div class="mt-2 d-flex justify-space-between">
        <fixed-length-input
          id="ticketInput1"
          :fixedLength="2"
          v-model="ticketNumber.firstValue"
          placeholder="AA"
          type="text"
          class="center-input"
          :next-input="$refs.tnSecondValue"
        />
        <label class="mx-3 mt-4 text-heading">−</label>
        <fixed-length-input
          ref="tnSecondValue"
          :fixedLength="4"
          v-model="ticketNumber.secondValue"
          placeholder="0000"
          type="number"
          class="center-input no-input-arrow"
          :next-input="$refs.tnThirdValue"
        />
        <label class="mx-3 mt-4 text-heading">−</label>
        <fixed-length-input
          ref="tnThirdValue"
          :fixedLength="3"
          v-model="ticketNumber.thirdValue"
          placeholder="000"
          type="number"
          class="center-input no-input-arrow"
          :next-input="$refs.scFirstValue"
        />
      </div>
      <!-- END Ticket-number -->

      <!-- START Authentication-number -->
      <label for="authenticationNumber1">{{ $t("common.authenticationNumber") }}</label>
      <div class="mt-2 d-flex justify-space-between">
        <fixed-length-input
          id="authenticationNumber1"
          ref="scFirstValue"
          :fixedLength="2"
          v-model="authNumber.firstValue"
          placeholder="00"
          type="number"
          class="center-input no-input-arrow"
          :next-input="$refs.scSecondValue"
        />
        <label class="mx-1 mt-4 text-heading">−</label>
        <fixed-length-input
          ref="scSecondValue"
          :fixedLength="2"
          v-model="authNumber.secondValue"
          placeholder="00"
          type="number"
          class="center-input no-input-arrow"
          :next-input="$refs.scThirdValue"
        />
        <label class="mx-1 mt-4 text-heading">−</label>
        <fixed-length-input
          ref="scThirdValue"
          :fixedLength="2"
          v-model="authNumber.thirdValue"
          placeholder="00"
          type="number"
          class="center-input no-input-arrow"
          :next-input="$refs.scFourthValue"
        />
        <label class="mx-1 mt-4 text-heading">−</label>
        <fixed-length-input
          ref="scFourthValue"
          :fixedLength="3"
          v-model="authNumber.fourthValue"
          placeholder="AAA"
          type="text"
          class="center-input"
        />
      </div>
      <!-- END Authentication-number -->
      <v-btn
        x-large
        rounded
        block
        @click="submitForm"
        class="btn-submit mt-3"
      >
        {{ $t("buttons.next") }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import FixedLengthInput from '@/components/FixedLengthInput'

export default {
  name: 'LoginTicketRegister',
  components: {
    FixedLengthInput
  },
  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        this.$router.push(`/login/register-ticket/confirm-email?tn=${this.ticketId}&sc=${this.secret}`)
      }
    }
  },
  data () {
    return {
      ticketNumber: {
        firstValue: '',
        secondValue: '',
        thirdValue: ''
      },
      authNumber: {
        firstValue: '',
        secondValue: '',
        thirdValue: '',
        fourthValue: ''
      }
    }
  },
  computed: {
    ticketId () {
      return `${this.ticketNumber.firstValue}-${this.ticketNumber.secondValue}-${this.ticketNumber.thirdValue}`
    },
    secret () {
      return `${this.authNumber.firstValue}-${this.authNumber.secondValue}-${this.authNumber.thirdValue}-${this.authNumber.fourthValue}`
    }
  }
}
</script>

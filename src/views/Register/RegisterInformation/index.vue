<template>
  <div class="form-container">
    <template v-if="accountCreated">
      <h3 class="--c-white font-weight-medium text-center px-2 mb-8">
        {{ $t("authPage.accountCreated") }}
      </h3>
    </template>
    <template v-else>
      <h3 class="--c-white font-weight-medium text-center px-2 mb-8">
        {{ $t("authPage.enterTheInformation") }}
      </h3>
      <v-form ref="form" lazy-validation class="--c-white mx-5">
        <div class="mx-5">
          <div>
            <label for="membershipNumber1" class="font-weight-medium">{{ $t("authPage.membershipNumber") }}</label>
            <label for="membershipNumber1" class="d-block my-2">{{ $t("authPage.membershipNumberDesc") }}</label>
          </div>
          <div class="horizontal-inputs">
            <v-text-field
              id="membershipNumber1"
              ref="mn1"
              :rules="rules.membershipNumber"
              :error="mnError"
              v-model="membershipNumber1"
              @keydown.space.prevent
              x-large
              solo
              type="text"
              class="width-45pc-min-65px"
              maxlength="3"
              :placeholder="$t('authPage.threeDigits')"
            />
            <div class="item">—</div>
            <v-text-field
              ref="mn2"
              v-model="membershipNumber2"
              :error="mnError"
              @keydown.space.prevent
              x-large
              solo
              type="text"
              maxlength="5"
              :placeholder="$t('authPage.fiveDigits')"
              hide-details
            />
          </div>
        </div>
        <v-divider class="bg-silver mt-2 mb-6"/>

        <div class="mx-5">
          <div>
            <label for="birthYear" class="font-weight-medium">{{ $t("common.dateOfBirth") }}</label>
            <label for="birthYear" class="d-block my-2">{{ $t("authPage.dateOfBirthDesc") }}</label>
          </div>
          <div class="horizontal-inputs no-input-arrow">
            <v-autocomplete
              id="birthYear"
              ref="by"
              v-model="birthYear"
              :rules="rules.birthday"
              :error="bdError"
              @keydown.space.prevent
              x-large
              solo
              type="number"
              :items="years"
              placeholder="YYYY"
              class="width-70pc-min-60px"
            ></v-autocomplete>
            <div class="item-extra">{{ $t("common.year") }}</div>
            <v-autocomplete
              v-model="birthMonth"
              :error="bdError"
              @keydown.space.prevent
              x-large
              solo
              type="number"
              :items="months"
              placeholder="MM"
              class="width-45pc-min-40px"
              hide-details
            ></v-autocomplete>
            <div class="item-extra">{{ $t("common.month") }}</div>
            <v-autocomplete
              v-model="birthDate"
              :error="bdError"
              @keydown.space.prevent
              x-large
              solo
              type="number"
              placeholder="DD"
              :items="dates"
              class="width-45pc-min-40px"
              hide-details
            ></v-autocomplete>
            <div class="item-extra">{{ $t("common.day") }}</div>
          </div>
        </div>
        <v-divider class="bg-silver mt-2 mb-6"/>

        <div class="mx-5">
          <div>
            <label for="telNumber" class="font-weight-medium">{{ $t("common.phoneNumber") }}</label>
            <label for="telNumber" class="d-block my-2">{{ $t("authPage.phoneNumberDesc") }}</label>
            <label class="d-block">{{ $t("authPage.phoneNumberDesc2") }}</label>
          </div>
          <v-text-field
            id="telNumber"
            :rules="rules.phoneNumber"
            solo
            type="tel"
            placeholder="03-1523-1234"
            v-model="phoneNumber"
            class="mt-2"
            validate-on-blur
            maxlength="13"
          />
        </div>
        <v-divider class="bg-silver mt-2 mb-6"/>

        <div class="mx-5">
          <label for="password">{{ $t("common.password") }}</label>
          <v-text-field
            id="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            @keydown.space.prevent
            solo
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            class="mt-2"
          />
          <div class="mb-3">{{ $t("authPage.enterPasswordRule") }}</div>

          <label for="passwordConfirmation" class="mt-4">{{ $t("authPage.enterAgainToConfirm") }}</label>
          <v-text-field
            id="passwordConfirmation"
            :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.passwordConfirm"
            @keydown.space.prevent
            solo
            :type="showPasswordConfirm ? 'text' : 'password'"
            @click:append="showPasswordConfirm = !showPasswordConfirm"
            class="mt-2"
          />
        </div>

        <div class="mt-6 mx-6">
          <v-btn x-large rounded block @click="submitForm" class="btn-submit">{{ $t("buttons.next") }}</v-btn>
        </div>
      </v-form>
    </template>
  </div>
</template>

<script>
import {
  checkPassword,
  checkPhoneNumber
} from '@/utils/validate'
import {
  dates,
  months,
  years
} from '@/constants/dates'

export default {
  name: 'RegisterInformation',
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('registerFirstUser', {
            token: this.token,
            memberId: this.membershipNumber,
            birthday: this.birthday,
            tel: this.phoneNumber,
            password: this.password
          })

          this.accountCreated = true
          setTimeout(() => {
            this.$router.push('/login')
          }, 5000)
        })
      } else {
        this.bdError = true
        this.mnError = true
      }
    }
  },
  data () {
    return {
      accountCreated: false,
      membershipNumber1: '', // null,
      membershipNumber2: '', // null,
      mnError: false,
      bdError: false,
      showPassword: false, // null,
      showPasswordConfirm: false, // null,
      password: '', // null,
      phoneNumber: '', // null,
      years: years(1910),
      birthYear: '',
      months: months,
      birthMonth: undefined,
      dates: dates(this.birthMonth),
      birthDate: '',

      rules: {
        membershipNumber: [
          _ => (this.membershipNumber !== '-') || this.$t('rules.isRequired'),
          _ => (this.membershipNumber.length === 9) || this.$t('rules.invalid')
        ],
        birthday: [
          _ => (this.birthday !== '--') || this.$t('rules.isRequired'),
          _ => (this.birthday.length === 10) || this.$t('rules.invalid')
        ],
        password: [
          v => !!v || this.$t('rules.passwordIsRequired'),
          v => checkPassword(v) || this.$t('rules.passwordRules')
        ],
        passwordConfirm: [
          v => v === this.password || this.$t('rules.passwordNotMatch')
        ],
        phoneNumber: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkPhoneNumber(v) || this.$t('rules.invalid')
        ]
      }
    }
  },
  computed: {
    token () {
      return this.$route.query.token
    },
    membershipNumber: function () {
      return this.membershipNumber1 + '-' + this.membershipNumber2
    },
    birthday: function () {
      return this.birthYear + '-' + this.birthMonth + '-' + this.birthDate
    }
  },
  watch: {
    membershipNumber1 (val) {
      this.mnError = !this.$refs.mn1.validate()
      if (val.length === 3) {
        this.$refs.mn2.focus()
      }
    },
    membershipNumber2 (_) {
      this.mnError = !this.$refs.mn1.validate()
    },
    birthYear (_) {
      this.bdError = !this.$refs.by.validate()
    },
    birthMonth (val) {
      this.dates = dates(val)
      this.bdError = !this.$refs.by.validate()
    },
    birthDate (_) {
      this.bdError = !this.$refs.by.validate()
    },
    phoneNumber (val) {
      if (val.length === 2 || val.length === 7) {
        this.phoneNumber = val + '-'
      }
    }
  }
}
</script>

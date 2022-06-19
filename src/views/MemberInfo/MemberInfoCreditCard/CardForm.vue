<template>
  <v-form
    ref="form"
    lazy-validation
    :class="newCard ? 'new-card' : 'update-card'"
  >
    <label for="holderName">{{ $t("common.cardHolderName") }}</label>
    <v-text-field
      id="holderName"
      :rules="rules.holderName"
      v-model="holderName"
      x-large
      solo
      type="text"
      class="mt-2"
    />

    <!-- START Card-number ------------------------>
    <label for="firstCardNumberValue">{{ $t("common.cardNumber") }}</label>
    <div class="d-flex justify-space-between mt-2 no-input-arrow">
      <fixed-length-input
        id="firstCardNumberValue"
        :fixedLength="4"
        :maxLength="4"
        v-model="cardNumber.firstValue"
        placeholder="0000"
        type="number"
        class="mr-1 center-input"
        :next-input="$refs.secondValue"
      />
      <fixed-length-input
        ref="secondValue"
        :fixedLength="4"
        :maxLength="4"
        v-model="cardNumber.secondValue"
        placeholder="0000"
        type="number"
        class="mr-1 center-input"
        :next-input="$refs.thirdValue"
      />
      <fixed-length-input
        ref="thirdValue"
        :fixedLength="4"
        :maxLength="4"
        v-model="cardNumber.thirdValue"
        placeholder="0000"
        type="number"
        class="mr-1 center-input"
        :next-input="$refs.fourthValue"
      />
      <fixed-length-input
        ref="fourthValue"
        :fixedLength="4"
        :maxLength="4"
        v-model="cardNumber.fourthValue"
        placeholder="0000"
        type="number"
        class="mr-1 center-input"
        :next-input="$refs.expirationMonth"
      />
    </div>
    <!-- END Card-number -------------------------->

    <label for="expirationMonth">{{ $t("menu.main.items.expirationDate") }}</label>
    <div class="d-flex pr-15 mr-15 mt-2">
      <v-select
        ref="expirationMonth"
        id="expirationMonth"
        :items="monthList"
        :rules="rules.isRequired"
        placeholder="MM"
        v-model="expirationMonth"
        solo
      />
      <label class="mx-3 mt-5">/</label>
      <v-select
        :items="yearList"
        :rules="rules.isRequired"
        placeholder="YYYY"
        v-model="expirationYear"
        solo
      />
    </div>

    <label for="securityCode">{{ $t("common.securityCode") }}</label>
    <div class="d-flex mr-4">
      <fixed-length-input
        id="securityCode"
        :minLength="3"
        :maxLength="4"
        v-model="securityCode"
        placeholder="000"
        type="number"
        class="mt-2 center-input fixed-width--medium no-input-arrow"
      />
<!--      <router-link-->
<!--        to="/"-->
<!--        class="flex-shrink-0 text-decoration-underline &#45;&#45;c-secondary mt-7 ml-6"-->
<!--      >-->
<!--        {{ $t("authPage.securityCodeQuestion") }}-->
<!--      </router-link>-->
    </div>

    <div class="text-center">
      <v-btn
        @click="submitForm"
        x-large
        rounded
        class="btn-submit w-100"
        :class="newCard ? '' : 'bg-primary text-heading--c-white'"
      >
        {{ $t("buttons.confirm") }}
      </v-btn>
      <CommonModal
        :visible="isSubmitted"
        :is-persistent="true"
        @close="$router.push(afterSubmitLink)"
      >
        <template slot-scope="props">
          <h3 class="mb-5 text-title --c-prm">
            {{ $t('memberInfo.haveChangedCreditCardInfo')}}
          </h3>
          <v-main class="mx-3">
            <v-btn
              color="primary"
              class="text-medium --w-bold"
              @click="props.close()"
              block
              elevation="2"
              x-large
              rounded
            >
              {{ $t('buttons.backToTop')}}
            </v-btn>
          </v-main>
        </template>
      </CommonModal>
    </div>
  </v-form>
</template>

<script>
import {
  checkNumber
} from '@/utils/validate'
import CommonModal from '../../Modal/Common'
import FixedLengthInput from '@/components/FixedLengthInput'
import {
  urlMixin
} from '@/mixins/url.mixin'

export default {
  name: 'CardForm',
  props: {
    newCard: Boolean
  },
  mixins: [urlMixin],
  components: {
    FixedLengthInput,
    CommonModal
  },
  mounted () {
    this.getExpirationYearList()
    // load js file for tokenizing the credit card info.
    const gmoScript = document.createElement('script')
    gmoScript.setAttribute('src', process.env.VUE_APP_GMO_TOKENIZE_JS_URL)
    document.head.appendChild(gmoScript)
  },
  methods: {
    async submitForm () {
      this.setupGmo()
      if (this.$refs.form.validate()) {
        await this.$doLoading(async () => {
          await this.$showGqlError(async () => {
            await this.$store.dispatch('saveCard', await this.tokenize())
            this.isSubmitted = true
          })
        })
      }
    },
    setupGmo () {
      if (this.gmo) return
      this.gmo = window.Multipayment
      this.gmo.init(process.env.VUE_APP_GMO_SHOP_ID)
    },
    getExpirationYearList () {
      const maxExpirationYear = 30
      const currentYear = new Date().getFullYear()
      for (let i = 0; i < maxExpirationYear; i++) {
        this.yearList.push(currentYear + i)
      }
    },
    tokenize () {
      return new Promise((resolve, reject) => {
        window.gmoResponseHandler = function gmoResponseHandler (response) {
          if (response.resultCode !== '000') {
            // show error message
            reject(response)
          } else {
            const token = response.tokenObject.token
            resolve(token)
          }
        }
        this.gmo.getToken({
          holdername: this.holderName,
          cardno: this.cardNo,
          expire: this.expires, // expiry in format 'YYYYMM'
          securitycode: this.securityCode
        }, 'gmoResponseHandler')
      })
    }
  },
  data () {
    return {
      gmo: null,
      cardNumber: {
        firstValue: '',
        secondValue: '',
        thirdValue: '',
        fourthValue: ''
      },
      holderName: '',
      expirationYear: '',
      expirationMonth: '',
      securityCode: '',

      yearList: [],
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

      rules: {
        isRequired: [v => !!v || this.$t('rules.isRequired')],
        holderName: [
          v => !!v || this.$t('rules.isRequired'),
          v => v?.trim().length < 25 || this.$t('rules.invalid')
        ],
        cardNumber: [
          v => !!v || this.$t('rules.isRequired'),
          v => (checkNumber(v) && v?.length === 4) || this.$t('rules.invalid')
        ],
        securityCode: [
          v => !!v || this.$t('rules.isRequired'),
          v => v?.trim().length === 3 || v?.trim().length === 4 || this.$t('rules.invalid')
        ]
      },
      isSubmitted: false,
      afterSubmitLink: this.getQueryParameter('from') || '/home'
    }
  },
  computed: {
    hasCard () {
      return this.$store.getters.hasValidCard
    },
    cardNo () {
      const {
        firstValue,
        secondValue,
        thirdValue,
        fourthValue
      } = this.cardNumber
      return `${firstValue}${secondValue}${thirdValue}${fourthValue}`
    },
    expires () {
      return `${this.expirationYear}${String(this.expirationMonth).padStart(2, '0')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.new-card {
  color: var(--color__white);

  & a {
    color: var(--color__white);
  }
}
</style>

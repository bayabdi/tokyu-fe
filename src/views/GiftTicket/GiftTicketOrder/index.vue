<template>
  <div class="form-container pb-15 px-5">
    <div class="text-heading font-weight-bold --c-prm text-center pt-10 pb-8">
      {{ $t('menu.main.exchangePoints') }}
    </div>

    <div class="text-heading font-weight-bold --c-prm text-center mb-4">
      {{ $t('giftTicket.applicationDetails') }}
    </div>
    <!--=========== START Gift-ticket-order-list ===========-->
    <GiftTicketItem
      v-for="item in cartItems"
      isSaleItem
      :key="item.id"
      :pointsRequired="item.total"
      :name="item.product.name"
      :place="item.product.companyName"
      :totalTickets="item.quantity"
    />
    <!--=========== END Gift-ticket-order-list ===========-->

    <!-- Number-of-points-after-exchange -->
    <div
      class="border-bold-b --border-prm d-flex justify-center align-end pb-5 --c-prm"
    >
      <label class="text-medium mr-5">
        {{ $t('giftTicket.numberOfPointsAfterExchange') }}
      </label>
      <span class="text-x-huge font-weight-bold mb-n2">
        {{ this.availablePoints - this.cartTotal | toThousands }}pt
      </span>
    </div>
    <!-- ------------------------------- -->

    <!--=========== START Addressee ===========-->
    <div class="px-5">
      <h2 class="--c-prm mt-14">
        {{ $t('common.addressee') }}
      </h2>
      <p class="text-medium--c-dark mt-2 mb-7">
        {{ $t('giftTicket.orderNoticeSending') }}
      </p>

      <v-form ref="form" lazy-validation>
        <label for="name">{{ $t('common.yourName') }}</label>
        <v-text-field
          id="name"
          v-model="name"
          x-large
          solo
          type="text"
          class="mt-2"
        />

        <label for="phoneNumber">{{ $t('common.phoneNumber') }}</label>
        <v-text-field
          id="phoneNumber"
          v-model="phoneNumber"
          placeholder="000-123-1234"
          x-large
          solo
          type="text"
          class="mt-2"
        />

        <label for="email">{{ $t('common.emailAddress') }}</label>
        <v-text-field
          id="email"
          v-model="email"
          x-large
          solo
          type="email"
          class="mt-2"
        />

        <label for="address">{{ $t('common.sendingAddress') }}</label>
        <v-text-field
          id="address"
          v-model="address"
          typeof="email"
          x-large
          solo
          type="text"
          class="mt-2"
        />
      </v-form>
    </div>
    <!-- Order-button -->
    <v-btn
      @click="submitForm"
      x-large
      rounded
      block
      class="bg-primary text-heading--c-white mt-3"
    >
      {{ $t('menu.main.items.orderTickets') }}
    </v-btn>
    <!-- ------------- -->

    <!-- Return-button -->
    <v-btn
      @click="$router.go(-1)"
      x-large
      rounded
      block
      class="bg-silver text-heading--c-prm font-weight-bold mt-4"
    >
      {{ $t('buttons.return') }}
    </v-btn>
    <!-- ------------- -->
    <!--=========== END Addressee ===========-->
    <CommonModal
      :hasCloseButton="false"
      :visible="orderComplete"
    >
      <template>
        <div class="px-6 py-4">
          <h4 class="mt-2 mb-5 text-heading --c-prm">
            {{ $t('giftTicket.orderCompleteTitle') }}
          </h4>

          <div class="px-3">
            <router-link to="/home/gift-ticket/exchange-points">
              <v-btn
                rounded
                height="57"
                class="bg-primary text-normal --c-white w-100"
              >
                {{ $t('menu.main.items.receptionStatusOrHistory') }}
              </v-btn>
            </router-link>
            <router-link to="/home">
              <v-btn
                rounded
                height="57"
                class="bg-primary text-normal --c-white w-100 mt-3"
              >
                {{ $t('buttons.backToTop') }}
              </v-btn>
            </router-link>
          </div>
        </div>
      </template>
    </CommonModal>
  </div>
</template>

<script>
import GiftTicketItem from '@/components/GiftTicketItem'
import {
  checkPhoneNumber,
  checkEmail
} from '@/utils/validate'
import mixin from '../mixin'
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'GiftTicketOrder',
  mixins: [mixin],
  components: {
    CommonModal,
    GiftTicketItem
  },
  methods: {
    async submitForm () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('orderPointExchangeProducts', {
            name: this.name,
            tel: this.phoneNumber,
            email: this.email,
            address: this.address
          })
          this.orderComplete = true
        })
      })
    },
    orderCompleteConfirm () {
      this.$router.push('/home/gift-ticket')
    }
  },
  async created () {
    if (!this.$store.getters.getPointExchangeCartList.length) await this.$router.push('/home/gift-ticket')
  },
  data () {
    return {
      name: null,
      phoneNumber: null,
      email: null,
      address: null,
      orderComplete: false,
      rules: {
        name: [
          v => !!v || this.$t('rules.isRequired'),
          v => v?.trim().length < 25 || this.$t('rules.invalid')
        ],
        phoneNumber: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkPhoneNumber(v) || this.$t('rules.invalid')
        ],
        email: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkEmail(v) || this.$t('rules.invalid')
        ],
        address: [
          v => !!v || this.$t('rules.isRequired'),
          v => v?.trim().length < 70 || this.$t('rules.invalid')
        ]
      }
    }
  }
}
</script>

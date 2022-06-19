<template>
  <div v-if="paymentPref">
    <Breadcrumbs>
      <router-link to="/home/member-info">
        {{ $t("menu.main.membershipInformation") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-15">
      <h1 class="text-heading--c-prm text-center py-6">
        {{ $t("memberInfo.currentPaymentMethod") }}
      </h1>
      <!-- START Payment-list -->
      <PaymentMethodItem
        @change="v => update('facilityFeePayment', v)"
        :title="$t('memberInfo.facilityFee')"
        :paymentMethod="paymentPref.facilityFeePayment"
      />
      <PaymentMethodItem
        @change="v => update('setupFeePayment', v)"
        :title="$t('memberInfo.setUpFee')"
        :paymentMethod="paymentPref.setupFeePayment"
      />
      <PaymentMethodItem
        @change="v => update('optionalCleaningPayment', v)"
        :title="$t('memberInfo.optionalCleaningFee')"
        :paymentMethod="paymentPref.optionalCleaningPayment"
      />
      <PaymentMethodItem
        @change="v => update('taxPayment', v)"
        :title="$t('memberInfo.inlandRevenueAndAccommodationTax')"
        :paymentMethod="paymentPref.taxPayment"
      />
      <PaymentMethodItem
        @change="v => update('otherServicePayment', v)"
        :title="$t('memberInfo.paidService')"
        :paymentMethod="paymentPref.otherServicePayment"
      />
      <!-- END Payment-list -->
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import PaymentMethodItem from './PaymentMethodItem.vue'

export default {
  name: 'MemberInfoPaymentMethod',
  components: {
    Breadcrumbs,
    PaymentMethodItem
  },
  async mounted () {
    await this.reload()
  },
  methods: {
    async update (key, value) {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('updatePrefPaymentMethod', {
            [key]: value
          })
        })
        await this.reload()
      })
    },
    async reload () {
      await this.$doLoading(() => this.$store.dispatch('getPrefPaymentMethod'))
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    paymentPref () {
      return this.$store.state.client.paymentPref
    }
  }
}
</script>

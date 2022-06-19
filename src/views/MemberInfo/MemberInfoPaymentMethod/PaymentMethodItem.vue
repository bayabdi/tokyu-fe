<template>
  <div class="pa-5 bg-white mb-3">
    <div class="text-heading font-weight-bold --c-prm text-center">
      {{ title }}
    </div>
    <v-divider class="bg-gray--light my-2"/>
    <div class="d-flex justify-space-between align-center mt-4">
      <span class="text-title--c-dark-gray font-weight-bold">
        {{ translated[0] }}
        <template v-if="translated[1]">
          <br>{{ translated[1] }}
        </template>
      </span>
      <v-btn
        @click="isOpenDialog = true"
        rounded
        height="39"
        width="154"
        class="bg-primary text-title--c-white width-x-small"
      >
        {{ $t('buttons.change') }}
      </v-btn>
    </div>

    <!-- START Dialog -->
    <CommonModal
      :visible="isOpenDialog"
      @close="isOpenDialog =false"
    >
      <h3 class="text-heading--c-prm line-height-1">
        {{ title }}
      </h3>

      <div class="px-8 py-13">
        <v-radio-group
          :value="paymentMethod"
          @change="handleChange"
          hide-details
          class="mt-0"
        >
          <v-radio
            value="Onsite"
            :ripple="false"
            class="mb-3 border-medium --border-light-gray rounded-40 pa-5"
          >
            <template slot="label">
              <div class="text-title --w-bold --c-dark">
                {{ $t('memberInfo.payAtTheFacility') }}
              </div>
            </template>
          </v-radio>
          <v-radio
            value="RegisteredCC"
            :ripple="false"
            class="mb-3 border-medium --border-light-gray rounded-40 pa-5"
          >
            <template slot="label">
              <div class="text-title--w-bold --c-dark">
                {{ $t('common.registered') }} <br/>
                {{ $t('common.creditCard') }}
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
    </CommonModal>
  </div>
</template>

<script>
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'PaymentMethodItem',
  components: { CommonModal },
  props: {
    title: String,
    paymentMethod: String
  },
  data () {
    return {
      isOpenDialog: false
    }
  },
  computed: {
    translated () {
      if (!this.paymentMethod) return ['--未選択--']
      return this.paymentMethod === 'RegisteredCC'
        ? [this.$t('common.registered'), this.$t('common.creditCard')]
        : [this.$t('memberInfo.payAtTheFacility')]
    }
  },
  methods: {
    handleChange (selected) {
      this.$emit('change', selected)
      this.isOpenDialog = false
    }
  }
}
</script>

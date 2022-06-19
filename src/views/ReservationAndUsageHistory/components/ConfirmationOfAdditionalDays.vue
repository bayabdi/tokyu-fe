<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <v-form ref="form">
      <div class="pb-4">
        <h2 class="text-title --c-medium-gray text-left font-weight-bold pt-3 pb-3 ">
          {{ reason }}<br />{{ bottomHeader }}
        </h2>
        <template v-if="hasAdditionalFee">
          <h2 class="text-medium --c-prm text-left font-weight-bold pt-3 pb-3 pl-2 ">
            {{ reason }}{{ $t('text.extraChargePt') }}
          </h2>
          <div class="text-left pb-5 pl-2">
            <span class="text-huge --c-prm font-weight-bold">
              {{ additionalFee | toThousands }}
            </span>
            <span class="text-medium --c-prm font-weight-bold"> {{ priceUnit }}</span>
          </div>
        </template>
        <div class="text-medium --c-bg text-left pb-6 pl-1">
          {{ $t('reservationAndUsageHistory.loginPasswordForConfirmation') }}<br />
          {{ $t('reservationAndUsageHistory.pleaseEnter') }}
        </div>
        <v-text-field
          class="mt-0 mb-6"
          solo
          :rules="[rules.required]"
          hide-details="true"
          v-model="password"
          type="password"
        >
        </v-text-field>
        <v-btn
          :disabled="!password"
          @click="confirm"
          rounded
          height="57"
          width="262"
          class="text-medium font-weight-bold mb-3 bg-primary --c-white"
        >
          {{ $t("reservationAndUsageHistory.reservationChange") }}
        </v-btn>
        <v-btn
          @click="back"
          rounded
          height="57"
          width="262"
          class="text-medium font-weight-bold mb-3 bg-silver --c-prm"
        >
          {{ $t('buttons.return') }}
        </v-btn>
      </div>
    </v-form>
  </CommonModal>
</template>

<script>
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'ConfirmationOfAdditionalDays',
  components: {
    CommonModal
  },
  props: {
    reason: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    additionalFee: Number,
    priceUnit: String
  },
  data () {
    return {
      password: null,
      rules: {
        required: value => !!value || this.$t('rules.isRequired')
      }
    }
  },
  computed: {
    hasAdditionalFee () {
      return this.additionalFee > 0
    },
    bottomHeader () {
      if (this.hasAdditionalFee) {
        return this.$t('reservationAndUsageHistory.thereIsAnAdditionalChargePoints')
      } else {
        return this.$t('text.noExtraChargePt')
      }
    },
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    confirm () {
      if (this.$refs.form.validate()) {
        this.$emit('confirm', {
          password: this.password
        })
      }
    },
    back () {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <CommonModal
    v-if="point != null"
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="">
      <div class="mt-n7 mb-5 text-heading --w-bold --c-prm">
        {{ $t("buttons.addPointName", { pointName: productType }) }}
      </div>
      <div class="text-huge--c-prm--w-bold">
        <span class="text-medium--c-light-gray--w-regular">{{ $t("common.current") }}</span>
        {{ point.pointRemains }}
        <span class="text-title">{{ $t("unit.points") }}</span>
      </div>
      <v-divider class="my-1"></v-divider>
      <v-row class="ma-0 mt-12">
        <v-col class="text-left pl-0 text-medium--c-light-gray--w-regular">{{ $t("common.endOfExpireDate") }}</v-col>
        <v-col class="text-left text-title--c-prm--w-bold">{{ point.validTo.replaceAll("-", "/") }}</v-col>
      </v-row>
      <v-divider class="my-0"></v-divider>
      <v-row class="ma-0">
        <v-col class="text-left pl-0 text-medium--c-light-gray--w-regular">{{ $t("common.additionalPointsPerUnit") }}</v-col>
        <v-col class="text-left pt-1 text-large--c-prm--w-bold">{{ fee }}
          <span class="text-title">{{ $t("reservationAndUsageHistory.yen") }}</span>
        </v-col>
      </v-row>
      <v-divider class="mb-3"></v-divider>
      <div class="text-left text-medium--c-light-gray">
        {{ $t("common.numberOfAdditionalPoints") }}
      </div>
      <v-row class="mb-0">
        <v-col cols="7">
          <v-text-field
            v-model="point.points"
            type="number"
            class="mt-1 mb-2"
            @input="recalculateOverallFee()"
            hide-details="true"
            solo
            required
          ></v-text-field>
        </v-col>
        <v-col class="text-medium--c-prm--w-bold pa-0 text-left pt-12">{{ $t("unit.points") }}</v-col>
      </v-row>
      <v-row class="ma-0 mb-3">
        <v-col class="text-left pl-0 text-medium--c-light-gray--w-regular">{{ $t("common.additionalChargesWithTax") }}</v-col>
        <v-col class="text-left pt-1 text-large--c-prm--w-bold">
          {{ overallFee }}
          <span class="text-title">{{ $t("reservationAndUsageHistory.yen") }}</span>
        </v-col>
      </v-row>
      <v-btn
        elevation="1"
        class="text-medium--w-bold py-6 mb-9"
        color="primary"
        @click="$emit('confirm'), $emit('close')"
        :disabled="!point.points || point.points <= 0"
        block
        rounded
      >
        {{ $t("buttons.addBtn", { pointName: productType }) }}
      </v-btn>
    </div>
  </CommonModal>
</template>

<script>
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'AddPointHead',
  components: {
    CommonModal
  },
  props: {
    point: Object,
    fee: Number,
    productType: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      endOfPointExpiration: '2022/07/30',
      overallFee: 0
    }
  },
  created () {
    this.recalculateOverallFee()
  },
  updated () {
    this.recalculateOverallFee()
  },
  computed: {
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
    recalculateOverallFee () {
      this.overallFee = this.point.points * this.fee
    }
  }
}
</script>

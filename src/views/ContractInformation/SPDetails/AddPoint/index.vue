<template>
  <CommonModal
    v-if="point != null"
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="">
      <div class="mt-n7 mb-5 text-heading --w-bold --c-prm">
        {{ $t("buttons.front", { pointName: productType }) }}
      </div>
      <v-row class="ma-0">
        <v-col class="text-left pl-0 text-medium--c-light-gray--w-regular">
          {{ $t("common.numberOfPointsRemainingForNextYear") }}
        </v-col>
        <v-col class="text-left pt-1 text-large--c-prm--w-bold">
          {{ point.pointRemains }}
          <span class="text-medium">{{ $t("unit.points") }}</span>
        </v-col>
      </v-row>
      <v-divider class="my-0"></v-divider>
      <v-row class="ma-0">
        <v-col class="text-left pl-0 text-medium--c-light-gray--w-regular">
          {{ $t("common.nextYearPointPeriod") }}
        </v-col>
        <v-col class="text-left pt-1 text-title--c-prm--w-bold">
          {{ point.validFrom.replaceAll("-", "/") }} - {{ point.validTo.replaceAll("-", "/") }}
        </v-col>
      </v-row>
      <v-divider class="mb-3"></v-divider>
      <p class="text-left text-medium--c-light-gray">
        {{ $t("common.numberOfForwardPoints") }}
      </p>
      <v-row class="mb-0">
        <v-col cols="7">
          <v-text-field
            v-model="point.points"
            type="number"
            class="mt-1 mb-2"
            hide-details="true"
            solo
            required
            @input="v => (this.isSubmitAllowed = v && v > 0)"
          ></v-text-field>
        </v-col>
        <v-col class="text-medium--c-prm--w-bold pa-0 text-left pt-12">
          {{ $t("unit.points") }}
        </v-col>
      </v-row>

      <v-btn
        @click="$emit('confirm')"
        elevation="1"
        class="text-medium--w-bold py-6 mb-9"
        color="primary"
        :disabled="!isSubmitAllowed"
        block
        rounded
      >
        {{ $t("buttons.moveTheForward", { pointName: productType }) }}
      </v-btn>
    </div>
  </CommonModal>
</template>

<script>
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'AddPoint',
  components: {
    CommonModal
  },
  props: {
    point: Object,
    productType: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSubmitAllowed: false
    }
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
  }
}
</script>

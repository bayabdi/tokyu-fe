<template>
  <v-dialog
    v-model="isVisible"
    width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>

    <div class="pa-5">
      <h3 class="text-heading--c-dark-red">
        {{ $t("rules.insufficientPoints") }}
      </h3>
      <div
        class="text-medium--c-light-gray font-weight-bold d-flex flex-wrap justify-center mt-5 mb-8"
      >
        {{ $t("rules.pointsNeededToRedeem") }}
        <span class="--c-prm">
          {{ minimumPoints + $t("rules.pointsTo") }}
        </span>
        {{ $t("rules.willBe") }}
      </div>

      <h4 class="text-heading--c-medium-gray">
        {{ $t("common.currentPoints") }}
      </h4>
      <v-divider class="my-4" />
      <h4 class="text-heading--c-dark">{{ currentPoint.name }}</h4>
      <div
        class="d-flex align-end justify-center text-medium--c-prm font-weight-bold mb-5"
      >
        <span class="text-max mr-1 mb-n2">{{ pointRemains }}</span>
        {{ pointRemains > 1 ? $t("unit.points") : $t("unit.point") }}
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'GiftTicketExchangePointsInsufficientDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    minimumPoints: {
      type: Number,
      default: 0
    },
    currentPoint: Object
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
  data () {
    return {
      pointRemains: this.currentPoint?.pointRemains ?? 0
    }
  }
}
</script>

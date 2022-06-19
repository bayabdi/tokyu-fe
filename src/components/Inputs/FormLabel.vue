<template>
  <div class="d-flex my-3">
    <div
      class="text-medium --c-bg mr-3"
      :class="disabled ? '--c-normal-gray' : ''"
    >
      {{ label }}
    </div>
    <div
      v-if="required"
      class="text-small text-center --c-white bg-pink rounded-4 px-2 py-1"
    >
      {{ $t("reservationAndUsageHistory.mandatory") }}
    </div>
    <div
      v-else-if="required === false"
      class="text-small text-center --c-white bg-grey rounded-4 px-2 py-1"
    >
      {{ $t('common.any') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

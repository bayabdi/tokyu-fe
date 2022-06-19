<template>
  <div class="rounded px-5 pt-4 pb-3 bg-white mb-3">
    <div class="d-flex justify-space-between">
      <label class="text-medium">{{ $t("common.dateAndTime") }}</label>
      <div class="text-sub-title--c-prm font-weight-bold">
        {{ dateAndTime }}
        <div class="mt-1">{{ pointName }}</div>
      </div>
    </div>

    <v-divider class="bg-smoke my-5" />

    <div class="d-flex align-center justify-space-between">
      <label class="text-medium"></label>
      <div class="--c-prm font-weight-bold flex-shrink-0">
        <span class="text-huge ml-1">{{ points | toThousands }}</span>
        <span class="text-medium">{{ Math.abs(points) > 1 ? $t("unit.points") : $t("unit.point") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VacationsHistoryItem',
  props: {
    dateAndTime: String,
    pointName: String,
    points: [Number, String],
    changeReason: String
  }
}
</script>

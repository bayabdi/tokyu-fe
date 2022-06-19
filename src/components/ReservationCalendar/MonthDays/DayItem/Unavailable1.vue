<template>
  <div class="item bg-silver text-left pa-1 d-table">
    <div class="d-flex">
      <h4 class="text-medium --w-bold mb-2 --c-dark">{{ day + 1 }}</h4>
      <IconClose :width="13" :height="13" class="mt-1 ml-1" />
    </div>
    <h4 class="text-title --c-b5-gray --w-bold">
      {{ point }}<span class="text-small">{{ $t('common.week') }}</span>
    </h4>
    <h4 class="text-subtitle --c-b5-gray --w-bold">
      B<span class="rank">{{ $t('common.rank') }}</span>
    </h4>
    <h4 class="text-small --c-b5-gray --w-bold">{{ $t('common.firstPart') }}</h4>
  </div>
</template>

<script>
import IconClose from '@/components/icons/IconClose'

export default {
  name: 'Unavailable1',
  props: {
    day: Number,
    weekDay: Number,
    point: Number
  },
  components: {
    IconClose
  }
}
</script>

<style lang="scss" scoped>
.rank {
  font-size: 9px;
}
</style>

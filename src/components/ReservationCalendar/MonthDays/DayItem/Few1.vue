<template>
  <div class="item bg-light-yellow text-left pa-1 d-table">
    <div class="d-flex">
      <p class="text-medium --w-bold mb-2 --c-dark">{{ day + 1 }}</p>
      <IconTriangle :width="13" :height="13" class="mt-1 ml-1" />
    </div>
    <p class="text-medium --c-dark-orange --w-bold">
      {{ point }}<span class="text-small">{{ $t('common.week') }}</span>
    </p>
    <p class="text-subtitle --c-dark-orange --w-bold">
      B<span class="rank">{{ $t('common.rank') }}</span>
    </p>
    <p class="text-small --c-dark-orange --w-bold">{{ $t('common.firstPart') }}</p>
  </div>
</template>

<script>
import IconTriangle from '@/components/icons/IconTriangle'

export default {
  name: 'Few1',
  props: {
    day: Number,
    weekDay: Number,
    point: Number
  },
  components: {
    IconTriangle
  }
}
</script>

<style lang="scss" scoped>
.rank {
  font-size: 9px;
}
.item {
  box-sizing: border-box;
}
</style>

<template>
  <div class="item bg-light-primary text-left pa-1 d-table">
    <div class="d-flex">
      <h4 class="text-medium --w-bold mb-2 --c-dark">{{ day + 1 }}</h4>
      <IconCircle class="mt-1 ml-1" :width="13" :height="13" />
    </div>
    <h4 class="text-medium --c-prm --w-bold">
      {{ point }}<span class="text-small">{{ $t('common.week') }}</span>
    </h4>
    <h4 class="text-subtitle --c-prm --w-bold">
      B<span class="rank">{{ $t('common.rank') }}</span>
    </h4>
    <h4 class="text-small --c-prm --w-bold">{{ $t('common.firstPart') }}</h4>
  </div>
</template>

<script>
import IconCircle from '@/components/icons/IconCircle'

export default {
  name: 'Vacant1',
  props: {
    day: Number,
    point: Number
  },
  components: {
    IconCircle
  }
}
</script>

<style lang="scss" scoped>
.rank {
  font-size: 9px;
}
</style>

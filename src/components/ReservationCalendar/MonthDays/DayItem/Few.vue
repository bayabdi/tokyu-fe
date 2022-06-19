<template>
  <div class="bg-light-yellow">
    <h4 :class="titleClass">{{ day + 1 }}</h4>
    <IconTriangle class="my-2px" />
    <h4 class="text-small --c-dark-orange --w-bold">
      {{ point | toThousands }}<span class="--text-small" v-if="isPointBasedProduct">{{ unit }}</span>
    </h4>
  </div>
</template>

<script>
import IconTriangle from '@/components/icons/IconTriangle'

export default {
  name: 'Few',
  props: {
    day: Number,
    weekDay: Number,
    point: Number
  },
  components: {
    IconTriangle
  },
  computed: {
    titleClass () {
      let _class = 'text-medium --w-bold mb-2'
      if (this.weekDay === 1) _class += '--c-pink'
      else _class += '--c-dark'

      return _class
    },
    unit () {
      return this.$store.getters.newBookingAccommodationPriceUnit()
    },
    isPointBasedProduct () {
      return this.$store.getters.isPointBasedProduct
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    height: 77px;
  }
</style>

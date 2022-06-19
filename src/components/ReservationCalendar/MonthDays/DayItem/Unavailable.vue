<template>
  <div class="bg-silver">
    <h4 :class="titleClass">{{ day + 1 }}</h4>
    <IconClose class="my-2px"/>
  </div>
</template>

<script>
import IconClose from '@/components/icons/IconClose'

export default {
  name: 'Unavailable',
  props: {
    day: Number,
    weekDay: Number
  },
  components: {
    IconClose
  },
  computed: {
    titleClass () {
      let _class = 'text-medium --w-bold mb-2'
      if (this.weekDay === 1) _class += '--c-pink'
      else _class += '--c-dark'

      return _class
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 77px;
}
</style>

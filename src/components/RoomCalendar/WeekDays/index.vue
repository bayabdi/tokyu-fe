<template>
  <div class="my-0 px-3 pb-0">
    <v-row class="ma-0">
      <v-col v-for="(day, i) in days" :key="i" class="px-1 py-0 pt-2">
        <div :class="getClass(i)">
          {{ day }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'WeekDays',
  components: {
  },
  data () {
    return {
      days: [
        this.$t('daysOfWeek.mon'),
        this.$t('daysOfWeek.tue'),
        this.$t('daysOfWeek.wed'),
        this.$t('daysOfWeek.thu'),
        this.$t('daysOfWeek.fri'),
        this.$t('daysOfWeek.sat'),
        this.$t('daysOfWeek.sun')]
    }
  },
  methods: {
    getClass (i) {
      let _class = 'text-small --w-regular'

      if (i < 6) {
        _class += ' --c-x-dark'
      } else {
        _class += ' --c-pink'
      }

      return _class
    }
  }
}
</script>

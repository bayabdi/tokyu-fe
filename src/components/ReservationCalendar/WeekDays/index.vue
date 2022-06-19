<template>
  <div class="px-3">
    <v-row class="ma-0">
      <v-col v-for="(day, i) in days" :key="i" class="px-1">
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
        this.$t('daysOfWeek.sun'),
        this.$t('daysOfWeek.mon'),
        this.$t('daysOfWeek.tue'),
        this.$t('daysOfWeek.wed'),
        this.$t('daysOfWeek.thu'),
        this.$t('daysOfWeek.fri'),
        this.$t('daysOfWeek.sat')]
    }
  },
  methods: {
    getClass (i) {
      let _class = 'text-medium --w-bold border-bold-b pb-1'

      if (i > 0) _class += ' --c-x-dark --border-x-dark'
      else _class += ' --c-pink --border-pink'

      return _class
    }
  }
}
</script>

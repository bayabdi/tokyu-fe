<template>
  <div class="pb-1">
    <v-container>
      <div class="pb-5">
        <v-row v-for="(item, i) in list" :key="item">
          <v-col md="auto" class="pl-0">{{ item }}</v-col>
          <v-col v-if="i === 0" class="text-right col-8 pl-0 pr-0">{{ date }}</v-col>
          <v-col v-if="i === 1" class="text-right col-7 pl-0 pr-0">{{ username }}</v-col>
          <v-col v-if="i === 2" class="text-right col-9 pl-0 pr-0">{{ operation }}</v-col>
        </v-row>
      </div>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'UsageHistory',
  props: {
    date: [Number, String],
    username: String,
    operation: String,
    link: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {
      list: [
        this.$t('reservationAndUsageHistory.dateAndTime'),
        this.$t('reservationAndUsageHistory.username'),
        this.$t('reservationAndUsageHistory.operation')
      ]
    }
  }
}
</script>

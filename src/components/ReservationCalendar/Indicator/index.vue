<template>
  <div class="my-2 px-3">
    <v-row class="ma-0 bg-silver pa-2">
      <v-col class="text-left pa-0">
        <v-btn
          @click="add(-1)"
          class="bg-white py-6 border-medium --border-light-gray"
        >
          <IconPrev color="#747474" />
        </v-btn>
      </v-col>
      <v-col class="text-heading">
        {{ getDate }}
      </v-col>
      <v-col class="text-right pa-0">
        <v-btn
          @click="add(1)"
          class="bg-white py-6 pl-5 border-medium --border-light-gray"
        >
          <IconNext color="#747474" />
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import IconPrev from '@/components/icons/IconPrev'
import IconNext from '@/components/icons/IconNext'
export default {
  name: 'Indicator',
  components: {
    IconPrev,
    IconNext
  },
  data () {
    return {
      date: '',
      year: 0,
      month: 0
    }
  },
  mounted () {
    this.year = this.$store.state.reservationCalendar.year
    this.month = this.$store.state.reservationCalendar.month
    this.date = new Date(this.year, this.month, 0)
  },
  computed: {
    getDate: {
      get () {
        return this.year + this.$t('common.year') + this.month + this.$t('common.month')
      }
    }
  },
  methods: {
    add (month) {
      this.date.setMonth(this.date.getMonth() + month)
      this.year = this.date.getFullYear()
      this.month = this.date.getMonth() + 1

      this.$store.commit('setReservationDate', { year: this.year, month: this.month })
    }
  }
}
</script>

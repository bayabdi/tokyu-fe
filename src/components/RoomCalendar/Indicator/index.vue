<template>
  <div class="mt-2 mb-0 px-3">
    <v-row class="ma-0">
      <v-col class="pa-0">
        <v-btn
          @click="add(-1)"
          min-width="30"
          class="bg-white py-5 border-medium --border-smoke"
        >
          <IconPrev />
        </v-btn>
      </v-col>
      <v-col class="text-title pa-0 pt-2 --w-light --c-medium-gray">
        {{ getDate }}
      </v-col>
      <v-col class="pa-0">
        <v-btn
          @click="add(1)"
          min-width="30"
          class="bg-white py-5 border-medium --border-smoke"
        >
          <IconNext />
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
  mounted () {
  },
  computed: {
    getDate: {
      get () {
        return this.year + this.$t('common.year') + this.month + this.$t('common.month')
      }
    },
    year () {
      return this.$store.state.reservationCalendar.year
    },
    month () {
      return this.$store.state.reservationCalendar.month
    }
  },
  methods: {
    add (num) {
      const date = new Date(this.year, this.month - 1, 1)
      date.setMonth(date.getMonth() + num)

      const year = date.getFullYear()
      const month = date.getMonth() + 1

      this.$store.commit('setReservationDate', { year, month })
    }
  }
}
</script>

<template>
  <div class="px-3">
    <v-row v-for="week in nWeek" :key="week" class="ma-0">
      <v-col v-for="day in 7" :key="day" class="pa-0">
<!--     Todo need to add days of previous and next months   -->
        <div
          v-if="getMonthDay(week, day) > 0"
          :class="getClass(week, day)"
          @click="select(getMonthDay(week, day))"
        >
          {{ getMonthDay(week, day) }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createIsoDate, isoDate } from '@/utils/get-date'

export default {
  name: 'MonthDays',
  data () {
    return {
      selectBegin: true
    }
  },
  methods: {
    getMonthDay (week, day) {
      const monthDay = (week - 1) * 7 + day - this.startDay

      if (monthDay >= this.days) {
        return -1
      }

      return monthDay
    },
    getClass (week, weekDay) {
      let _class = 'text-small --w-medium py-2 cursor-default '
      const day = this.getMonthDay(week, weekDay)

      if (weekDay === 7) {
        _class += '--c-pink'
      } else {
        _class += '--c-dark'
      }
      if (this.beginDay < day && day < this.endDay) {
        _class += ' bg-light-blue'
      } else if (day === this.beginDay) {
        _class += ' startDay'
      } else if (day === this.endDay) {
        _class += ' endDay'
      } else if (!this.canSelect(day)) {
        _class += ' no-select'
      } else if (this.canSelect(day)) {
        _class += ' cursor-pointer'
      }
      return _class
    },
    getSelectedDate (dayNumber) {
      return createIsoDate(this.year, this.month, dayNumber)
    },
    select (dayNumber) {
      if (!this.canSelect(dayNumber)) return
      const dateString = this.getSelectedDate(dayNumber)
      if (this.selectBegin) {
        this.$store.commit('setReservationCalendarFromDate', dateString)
        this.$store.commit('setReservationCalendarToDate', null)
      } else {
        this.$store.commit('setReservationCalendarToDate', dateString)
      }
      this.selectBegin = !this.selectBegin
    },
    getDay (date) {
      const [year, month, day] = date.split('-')
      if (this.year < Number(year) || (this.year === Number(year) && this.month < Number(month))) {
        return 32 // previous month
      } else if (this.year === Number(year) && this.month === Number(month)) {
        return Number(day)
      } else {
        return -1
      }
    },
    canSelect (dayNumber) {
      const date = this.getSelectedDate(dayNumber)
      if (!this.selectBegin) {
        // date must be after the select Begin
        if (this.fromDate >= date) return false
        // must check the checkOutUntil
        if (this.$store.state.reservationCalendar.canCheckOutUntil < date) {
          return false
        }
      } else {
        if (isoDate(new Date()) >= date) return false // can book from tomorrow
        if (this.$store.state.reservationCalendar.canCheckInUntil < date) {
          return false
        }
      }
      return true
    }
  },
  computed: {
    year () {
      return this.$store.state.reservationCalendar.year
    },
    month () {
      return this.$store.state.reservationCalendar.month
    },
    fromDate () {
      return this.$store.state.reservationCalendar.fromDate
    },
    toDate () {
      return this.$store.state.reservationCalendar.toDate
    },
    beginDay () {
      if (this.fromDate) {
        return this.getDay(this.fromDate)
      }
      return null
    },
    endDay () {
      if (this.toDate) {
        return this.getDay(this.toDate)
      }
      return null
    },
    days () {
      return new Date(this.year, this.month, 0).getDate() + 1
    },
    startDay () {
      return (new Date(this.year, this.month - 1, 1).getDay() + 6) % 7
    },
    nDay () {
      return (this.startDay + this.days)
    },
    nWeek () {
      return Math.floor((this.nDay + 5) / 7)
    }
  }
}
</script>

<style lang="scss">
.startDay {
  background: #004F8B;
  color: white !important;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
.endDay {
  background: #004F8B;
  color: white !important;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}
.no-select {
  background: var(--color__silver);
}

.cursor-default {
  cursor: default;
}
.cursor-pointer {
  cursor: pointer!important;
}
</style>

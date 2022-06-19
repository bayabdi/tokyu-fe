<template>
  <div class="my-1 px-3">
    <v-row v-for="week in nWeek" :key="week" class="ma-0">
      <v-col v-for="day in 7" :key="day" class="pa-2px week-day-col">
        <div v-if="getMonthDay(week, day) > -1">
          <div v-if="getType(getMonthDay(week, day)) === cellTypes.vacant">
            <Vacant
              v-if="type === '0'"
              :weekDay="day"
              :day="getMonthDay(week, day)"
              :point="getPoint(getMonthDay(week, day))"
            />
            <Vacant1
              v-if="type === '1'"
              :weekDay="day"
              :day="getMonthDay(week, day)"
              :point="getPoint(getMonthDay(week, day))"
            />
          </div>
          <div v-else-if="getType(getMonthDay(week, day)) === cellTypes.unavailable">
            <Unavailable
              v-if="type === '0'"
              :day="getMonthDay(week, day)"
              :weekDay="day"
            />
            <Unavailable1
              v-if="type === '1'"
              :point="getPoint(getMonthDay(week, day))"
              :day="getMonthDay(week, day)"
              :weekDay="day"
            />
          </div>
          <div v-else>
            <Few
              v-if="type === '0'"
              :day="getMonthDay(week, day)"
              :weekDay="day"
              :point="getPoint(getMonthDay(week, day))"
            />
            <Few1
              v-if="type === '1'"
              :day="getMonthDay(week, day)"
              :weekDay="day"
              :point="getPoint(getMonthDay(week, day))"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vacant from '@/components/ReservationCalendar/MonthDays/DayItem/Vacant'
import Unavailable from '@/components/ReservationCalendar/MonthDays/DayItem/Unavailable'
import Few from '@/components/ReservationCalendar/MonthDays/DayItem/Few'
import Vacant1 from '@/components/ReservationCalendar/MonthDays/DayItem/Vacant1'
import Unavailable1 from '@/components/ReservationCalendar/MonthDays/DayItem/Unavailable1'
import Few1 from '@/components/ReservationCalendar/MonthDays/DayItem/Few1'
import { CalendarCellType } from '@/constants/reservation-calendar'
import { createIsoDate } from '@/utils/get-date'
import { BookCalendarFewFrom } from '@/constants'

export default {
  name: 'MonthDays',
  props: {
    type: String
  },
  components: {
    Vacant,
    Unavailable,
    Few,
    Vacant1,
    Unavailable1,
    Few1
  },
  data () {
    return {
      cellTypes: CalendarCellType
    }
  },
  methods: {
    getMonthDay (week, day) {
      const monthDay = (week - 1) * 7 + day - 1 - this.startDay
      if (monthDay >= this.days) return -1
      return monthDay
    },
    getFullDate (day) {
      return createIsoDate(this.year, this.month, day + 1)
    },
    getPriceAndInv (day) {
      return this.$store.getters.getPriceAndInventory(this.getFullDate(day))
    },
    getType (day) {
      const count = this.getPriceAndInv(day).roomsAvailable
      if (count === 0) return CalendarCellType.unavailable
      if (count <= BookCalendarFewFrom) return CalendarCellType.few
      return CalendarCellType.vacant
    },
    getPoint (day) {
      return this.getPriceAndInv(day).contractPrice
    }
  },
  computed: {
    year () {
      return this.$store.state.reservationCalendar.year
    },
    month () {
      return this.$store.state.reservationCalendar.month
    },
    days () {
      return new Date(this.year, this.month, 0).getDate()
    },
    startDay () {
      return new Date(this.year, this.month - 1, 1).getDay()
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

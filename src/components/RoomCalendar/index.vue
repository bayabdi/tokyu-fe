<template>
  <div class="my-6">
    <Indicator />
    <WeekDays />
    <MonthDays />
  </div>
</template>

<script>
import Indicator from '@/components/RoomCalendar/Indicator'
import WeekDays from '@/components/RoomCalendar/WeekDays'
import MonthDays from '@/components/RoomCalendar/MonthDays'

export default {
  name: 'Calendar',
  components: {
    Indicator,
    WeekDays,
    MonthDays
  }
}
</script>

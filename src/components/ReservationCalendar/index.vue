<template>
  <div>
    <Indicator />
    <WeekDays />
    <MonthDays :type="type" />
    <div class="text-left ml-4 mb-7">
      <label class="mr-4">
        <IconCircle class=" pt-2" />
        <span class="text-medium --c-dark --w-regular ">{{ $t('common.vacant') }}</span>
      </label>
      <label class="mr-4">
        <IconTriangle class="mr-1 pt-1" />
        <span class="text-medium --c-dark --w-regular ">{{ $t('common.fewRemaining') }}</span>
      </label>
      <label>
        <IconClose class="mr-1" />
        <span class="text-medium --c-dark --w-regular ">{{ $t('common.noCheckin') }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import Indicator from '@/components/ReservationCalendar/Indicator'
import WeekDays from '@/components/ReservationCalendar/WeekDays'
import MonthDays from '@/components/ReservationCalendar/MonthDays'
import IconCircle from '@/components/icons/IconCircle'
import IconClose from '@/components/icons/IconClose'
import IconTriangle from '@/components/icons/IconTriangle'

export default {
  name: 'Calendar',
  props: {
    type: String
  },
  components: {
    Indicator,
    WeekDays,
    MonthDays,
    IconCircle,
    IconClose,
    IconTriangle
  }
}
</script>

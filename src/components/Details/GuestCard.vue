<template>
  <div class="bg-white rounded mb-3">
    <Details
      :left="$t('reservationAndUsageHistory.guest') + index"
      :right="guestName"
      :aClass="'font-weight-bold --c-medium-gray col-8'"
    />
    <v-divider class="mx-4" />
    <Details
      :left="$t('reservationAndUsageHistory.accommodationSchedule')"
      :right="schedule"
      :aClass="'--c-medium-gray col-8'"
    />
  </div>
</template>

<script>
import Details from './index'

export default {
  name: 'GuestCard',
  components: {
    Details
  },
  props: {
    index: {
      Number,
      default: 1
    },
    guestName: {
      String
    },
    schedule: {
      String
    }
  }
}
</script>

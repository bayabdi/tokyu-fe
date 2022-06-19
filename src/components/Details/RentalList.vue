<template>
  <div class="bg-white rounded mb-3">
    <Details
      :left="$t('reservationAndUsageHistory.rentalListing') + (index + 1)"
      :right="rental"
      :aClass="'--c-medium-gray col-8'"
    />
    <v-divider class="mx-4 bg-medium-smoke"/>
    <Details
      :left="$t('reservationAndUsageHistory.lendingSchedule')"
      :right="schedule"
      :aClass="'--c-medium-gray col-8'"
    />
  </div>
</template>

<script>
import Details from './index'

export default {
  name: 'RentalList',
  components: {
    Details
  },
  props: {
    rental: {
      String
    },
    schedule: {
      String
    },
    index: {
      Number
    }
  }
}
</script>

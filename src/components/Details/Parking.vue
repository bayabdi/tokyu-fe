<template>
  <div class="bg-white rounded mb-3">
    <Details
      :left="$t('reservationAndUsageHistory.noParkingRequired')"
      :right="status"
      :aClass="'font-weight-bold text-right --c-medium-gray col-6'"
    />
    <v-divider class="mx-4 bg-medium-smoke"/>
    <Details
      v-if="number > 0"
      :left="$t('reservationAndUsageHistory.numberOfCars')"
      :right="`${number}${$t('common.stand')}`"
      :aClass="'font-weight-bold --c-medium-gray text-right col-6'"
    />
  </div>
</template>

<script>
import Details from './index'

export default {
  name: 'Parking',
  components: {
    Details
  },
  props: {
    number: {
      String
    }
  },
  computed: {
    status () { return this.number > 0 ? this.$t('common.necessary') : this.$t('common.unnecessary') }
  }
}
</script>

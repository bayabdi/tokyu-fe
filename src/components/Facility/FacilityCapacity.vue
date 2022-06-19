<template>
  <span v-if="roomType">{{ $t('common.capacity') }}{{ maxOccupancy }}{{ $t('common.firstName') }} {{ bedShareText }}</span>
</template>

<script>
export default {
  name: 'FacilityCapacity',
  props: {
    roomType: Object
  },
  computed: {
    maxOccupancy () {
      return this.roomType.maxOccupancy
    },
    bedShareMaxOccupancy () {
      return this.roomType.bedShareMaxOccupancy
    },
    bedShareText () {
      if (this.bedShareMaxOccupancy) {
        return this.$t('booking.plusBedShareMaxOccupancy', [this.bedShareMaxOccupancy])
      } else {
        return this.$t('booking.includeSleeping')
      }
    }
  }
}
</script>

<template>
  <div class="bg-white --c-gray pa-5 mb-5">
    <div class="text-sub-title font-weight-bold mb-4">
      {{ dateFormat(dateFrom) + "-" + dateFormat(dateTo) }}
    </div>
    <v-divider class="bg-silver" />
    <h3 class="text-heading mt-4 mb-1">{{ name }}</h3>
    <div class="d-flex text-sub-title">
      <template v-if="roomName">
        {{ roomName }} <label class="mx-3">/</label> {{ pointName }}
      </template>
      <template v-else>
        <span class="mr-3"> {{ typeVehicle }} </span>
        ({{ $t("vacancy.vehicleHeightLimit") + heightLimit }}cm)
      </template>
    </div>
    <div class="text-center">
      <v-btn
        @click="handleCancel(id)"
        x-large
        rounded
        class="px-10 bg-primary --c-white mt-8 mb-3"
      >
        {{ $t("buttons.cancelNotification") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VacancyNotiItem',
  props: {
    id: [String, Number],
    dateFrom: String,
    dateTo: String,
    name: String,
    parking: {
      Boolean,
      default: false
    },
    roomName: String,
    pointName: String,
    typeVehicle: String,
    heightLimit: [String, Number]
  },
  methods: {
    dateFormat (date) {
      return date.slice(0, 4) + '年' +
        date.slice(5, 7) + '月' +
        date.slice(8, 10) + '日'
    },
    handleCancel (id) {
      if (!this.parking) {
        this.$store.dispatch('CancelWaitList', {
          apollo: this.$apollo,
          id: id
        })
      } else {
        this.$store.dispatch('CancelParkingWaitList', {
          apollo: this.$apollo,
          id: id
        })
      }
    }
  }
}
</script>

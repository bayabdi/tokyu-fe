<template>
  <v-dialog
    v-model="isVisible"
    max-width="400px"
    content-class="bg-white text-center"
    persistent
  >
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon"></div>
      </button>
    </div>
    <div class="px-6">
      <h2 class="mt-n7 mb-10 text-heading --c-prm">{{ $t('common.selectDate') }}</h2>
      <div class="min-width-300px">
        <Calendar />
        <v-row class="ma-0">
          <v-col class="px-0">
            <div class="text-normal --c-prm --w-bold">{{ $t('buttons.checkIn') }}</div>
            <div v-if="startDay" class="text-medium --c-light-gray my-1">
              {{ dateFormat(startDay) }}
            </div>
            <v-container v-else class="pa-4"></v-container>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="2" class="text-title --c-light-gray align-self-end">〜</v-col>
          <v-col class="px-0">
            <div class="text-normal --c-prm --w-bold">{{ $t('common.checkOut') }}</div>
            <div v-if="endDay" class="text-medium --c-light-gray my-1">
              {{ dateFormat(endDay) }}
            </div>
            <v-container v-else class="pa-4"></v-container>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-btn
          elevation="1"
          rounded
          class="text-medium--w-bold py-6 px-16 my-6"
          color="primary"
          @click="confirm"
          :disabled="!isReady"
        >
          {{ $t('buttons.decision') }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Calendar from '@/components/RoomCalendar'

export default {
  name: 'Room',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Calendar
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    startDay () {
      return this.$store.state.reservationCalendar.fromDate
    },
    endDay () {
      return this.$store.state.reservationCalendar.toDate
    },
    isReady () {
      return this.startDay && this.endDay
    }
  },
  methods: {
    dateFormat (date) {
      if (!date) return date
      const dateArr = date.split('-')
      return `${dateArr[0]}${
        this.$t('common.year')}${
          parseInt(dateArr[1])}${this.$t('common.month')}${
          parseInt(dateArr[2])}${this.$t('common.day')
        }`
    },
    confirm () {
      this.$emit('confirm', {
        checkInDate: this.startDay,
        checkOutDate: this.endDay
      })
    }
  }
}
</script>

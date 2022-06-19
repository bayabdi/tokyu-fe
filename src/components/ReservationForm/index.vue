<template>
  <div class="bg-primary pt-6 pb-16 px-5">
    <v-form ref="form" lazy-validation>
      <h1 class="--c-white text-large">{{ $t("title.reservation") }}</h1>
      <v-select
        :value="selectedDates"
        :items="[selectedDates]"
        @click="isVisibleRoomAv = true"
        solo
        hide-details
        :height="70"
        class="mt-5"
      >
        <template v-slot:prepend-inner>
          <IconSelectDate :width="35" :height="35" class="mx-3" />
        </template>
      </v-select>
      <v-select
        :items="roomTypes"
        item-text="name"
        item-value="id"
        v-model="roomTypeId"
        solo
        hide-details
        :height="70"
        class="mt-4 mb-6"
      >
        <template v-slot:prepend-inner>
          <IconFurniture :width="35" :height="35" class="mx-3" />
        </template>
      </v-select>
      <div v-if="roomsGuestsAvailability.rooms > 0">
        <v-row class="ma-0 mb-6">
          <v-col cols="2" class="pa-0 vertical-child-center">
            <span class="text-title --w-bold --c-white">{{ $t("common.nRoom") }}</span>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              v-model="numberOfRooms"
              :items="availableRooms"
              solo
              hide-details
              class="select-align-center"
            />
          </v-col>
          <v-col
            cols="2"
            class="pa-0 text-left text-title --w-bold --c-white"
            align-self="end"
          >
            {{ $t("common.room") }}
          </v-col>
        </v-row>
        <div class="px-0 mb-6 mx-1" v-for="ind in numberOfRooms" :key="ind">
          <h2 class="mb-3 text-title --c-white text-left">
            {{ numberOfRooms === 1 ? '' : $t('common.room') + ind }} {{ $t("common.nGuest") }}
          </h2>
          <v-col cols="6" class="pa-0 mt-2">
            <v-row class="ma-0">
              <v-col cols="4" class="pa-0">
                <h4 class="text-center text-title --c-white --w-bold">
                  {{ $t("common.adult") }}
                </h4>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-select
                  :items="numOfAdultsItems"
                  :value="numberOfGuests[ind - 1].adults"
                  @input="v => setNumOfAdults(ind, v)"
                  :rules="[
                    rules.maxOccupancy(
                      ind - 1,
                      numberOfGuests,
                      roomsGuestsAvailability.maxOccupancy
                    )
                  ]"
                  class="select-align-center"
                  solo
                  hide-details
                />
              </v-col>
              <v-col
                cols="2"
                class="pa-0 text-left pl-2 text-title --w-medium --c-white"
                align-self="end"
              >
                <span>{{ $t("common.firstName") }}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-row class="ma-0 mt-3">
            <v-col cols="2" class="pa-0 pt-2">
              <h4 class="text-center text-title --c-white --w-bold">
                {{ $t("common.child") }}
              </h4>
            </v-col>
            <v-col cols="5" class="pa-0 mt-2">
              <v-row class="ma-0">
                <v-col cols="12" class="pa-0 mb-2">
                  <h4 class="text-left text-title --w-medium --c-white">
                    {{ $t("common.sleepTogether") }}
                  </h4>
                </v-col>
                <v-col cols="7" class="pa-0">
                  <v-select
                    :items="numOfBedShareItems"
                    :value="numberOfGuests[ind - 1].bedShare"
                    @input="v => setNumOfBedShare(ind, v)"
                    class="select-align-center"
                    solo
                    hide-details
                  />
                </v-col>
                <v-col
                  cols="3"
                  class="pa-0 text-left pl-2 text-title --w-medium --c-white"
                  align-self="end"
                >
                  <span>{{ $t("common.firstName") }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5" class="pa-0 mt-2">
              <v-row class="ma-0">
                <v-col cols="12" class="pa-0 mb-2">
                  <h4 class="text-left text-title --w-medium --c-white">
                    {{ $t("common.noSleepTogether") }}
                  </h4>
                </v-col>
                <v-col cols="7" class="pa-0">
                  <v-select
                    :items="numOfChildrenItems"
                    :value="numberOfGuests[ind - 1].children"
                    @input="v => setNumOfChildren(ind, v)"
                    :rules="[
                      rules.maxOccupancy(
                        ind - 1,
                        numberOfGuests,
                        roomsGuestsAvailability.maxOccupancy
                      )
                    ]"
                    class="select-align-center"
                    solo
                    hide-details
                  />
                </v-col>
                <v-col
                  cols="3"
                  class="pa-0 text-left pl-2 text-title --w-medium --c-white"
                  align-self="end"
                >
                  <span>{{ $t("common.firstName") }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider
            v-if="ind !== numberOfRooms"
            color="#fff"
            class="ma-4"
          />
        </div>
      </div>
      <div class="px-0">
        <template v-if="isReadyForPriceTemporaryBooking">
          <h4 class="--c-fda-yellow mt-3">
            <span class="text-m-heading --w-regular">
              {{ $t("common.total") }}
            </span>
            <span v-if="calculating" class="text-max --w-bold mr-4">
              <v-progress-circular indeterminate color="white" />
            </span>
            <span v-else class="text-max --w-bold mr-4">
              {{ point | toThousands }}<span class="text-large">{{ unit }}</span>
            </span>
            <span class="text-large --w-bold">
              {{ night }}{{ $t("common.night") }}
            </span>
            <span class="text-default --w-regular">{{ $t('common.totalOf') }}</span>
          </h4>
          <v-btn
            :loading="calculating"
            :disabled="calculating"
            class="mt-5 py-6 --c-prm text-heading"
            @click="hasError ? (isAddWaitListModalOpen = true) : submitForm()"
            block
            rounded
          >
            {{ $t("buttons.goToReservation") }}
          </v-btn>
        </template>
        <template v-else-if="roomsGuestsAvailability.rooms === 0 && roomTypeId">
<!--          <h3 class="&#45;&#45;c-white">-->
<!--            {{ $t("reservationAndUsageHistory.noFreeRoomsInRoomType") }}-->
<!--          </h3>-->

          <v-btn
            :loading="calculating"
            :disabled="calculating"
            class="mt-5 py-6 --c-prm text-heading"
            @click="isAddWaitListModalOpen = true"
            block
            rounded
          >
            {{ $t("buttons.goToReservation") }}
          </v-btn>
        </template>
        <template v-else-if="isMaxOccupancyOverflow">
          <h3 class="--c-white">
            {{ $t("reservationAndUsageHistory.overMaxOccupancy") }}
          </h3>
        </template>
        <template v-else>
          <h3 class="--c-white">
            {{ $t("reservationAndUsageHistory.enterAccommodationDetails") }}
          </h3>
        </template>

        <AddWaitListModal
          v-if="checkInDate && checkOutDate && facilityInfo && roomType"
          :visible="isAddWaitListModalOpen"
          @close="isAddWaitListModalOpen = false"
          :checkInDate="checkInDate"
          :checkOutDate="checkOutDate"
          :facilityInfo="facilityInfo"
          :roomType="roomType"
        />
      </div>
      <RoomAvailability
        :visible="isVisibleRoomAv"
        @close="isVisibleRoomAv = false"
        @confirm="selectDate"
      />
    </v-form>
  </div>
</template>

<script>
import IconSelectDate from '@/components/icons/IconSelectDate'
import IconFurniture from '@/components/icons/IconFurniture'
import RoomAvailability from '@/views/VacancySearch/components/RoomAvailability'
import { jaShortDate } from '@/utils/get-date'
import AddWaitListModal from '@/views/Modal/AddWaitList'
import { numberArrayGenerator } from '@/utils/generator'

export default {
  components: {
    IconSelectDate,
    IconFurniture,
    RoomAvailability,
    AddWaitListModal
  },
  created () {
    this.$store.commit('setNumberOfRoomsForBooking', 0)
  },
  data () {
    return {
      hasError: false,
      calculating: false,
      isVisibleRoomAv: false,
      point: null,
      isAddWaitListModalOpen: false,
      rules: {
        maxOccupancy (index, numberOfGuests, maxOccupancy) {
          return _ => {
            return numberOfGuests[index].adults + numberOfGuests[index].children <= maxOccupancy
          }
        }
      }
    }
  },
  mounted () {
    this.calculatePrice()
  },
  computed: {
    selectedDates () {
      const from = jaShortDate(this.$store.state.newBooking.checkInDate)
      const to = jaShortDate(this.$store.state.newBooking.checkOutDate)

      return `${from} - ${to}`
    },
    roomTypes () {
      return this.$store.state.reservationCalendar.roomTypes
    },
    roomsGuestsAvailability () {
      let minAvailableRoom = 0
      if (this.roomType) {
        const available = this.roomType.priceAndAvailability
        const min = available.findIndex(rt => rt.stayDate === this.checkInDate)
        const max = available.findIndex(rt => rt.stayDate === this.checkOutDate)
        const minAvailableRooms = available.slice(min, max).map(a => a.roomsAvailable)
        minAvailableRoom = Math.min(...minAvailableRooms)
      }
      return {
        rooms: minAvailableRoom,
        maxOccupancy: this.roomType?.maxOccupancy ?? 0,
        bedShareMaxOccupancy: this.roomType?.bedShareMaxOccupancy ?? 0
      }
    },
    roomTypeId: {
      get () { return this.$store.state.newBooking.roomTypeId },
      set (val) {
        this.$store.commit('setRoomTypeIdForBooking', val)
        this.$store.commit('setNumberOfRoomsForBooking', this.roomsGuestsAvailability.rooms ? 1 : 0)
        this.calculatePrice()
      }
    },
    numberOfRooms: {
      get () { return this.$store.state.newBooking.numberOfRooms },
      set (val) {
        this.$store.commit('setNumberOfRoomsForBooking', val)
        this.calculatePrice()
      }
    },
    availableRooms () {
      return numberArrayGenerator(this.roomsGuestsAvailability.rooms)
    },
    numOfAdultsItems () {
      return numberArrayGenerator(this.roomsGuestsAvailability.maxOccupancy)
    },
    numOfChildrenItems () {
      return numberArrayGenerator(this.roomsGuestsAvailability.maxOccupancy, false)
    },
    numOfBedShareItems () {
      return numberArrayGenerator(this.roomsGuestsAvailability.bedShareMaxOccupancy, false)
    },
    night () {
      return this.$store.getters.numberOfStayDays
    },
    numberOfGuests () {
      return this.$store.state.newBooking.numberOfGuests
    },
    isReadyForPriceTemporaryBooking () {
      return this.$store.getters.isReadyForPriceTemporaryBooking && !this.isMaxOccupancyOverflow
    },
    isMaxOccupancyOverflow () {
      return this.numberOfGuests.some(n => n.adults + n.children > this.roomsGuestsAvailability.maxOccupancy)
    },
    unit () {
      return this.$store.getters.newBookingAccommodationPriceUnit()
    },
    roomType () {
      return this.$store.state.reservationCalendar.roomTypes.find(r => r.id === this.$store.state.newBooking.roomTypeId)
    },
    facilityInfo () {
      return this.$store.state.newBooking.facilityInfo
    },
    checkInDate () {
      return this.$store.state.newBooking.checkInDate
    },
    checkOutDate () {
      return this.$store.state.newBooking.checkOutDate
    }
  },
  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        this.$emit('commit')
      }
    },
    async calculatePrice () {
      if (this.roomsGuestsAvailability.rooms === 0 || this.isMaxOccupancyOverflow) {
        this.point = null
      } else if (this.isReadyForPriceTemporaryBooking) {
        this.calculating = true
        try {
          const { totalPrice } = await this.$store.dispatch('calculateAccommodationPrice')
          this.point = totalPrice
          this.hasError = false
        } catch (e) {
          this.hasError = true
        }
        this.calculating = false
      }
    },
    selectDate ({ checkInDate, checkOutDate }) {
      this.$store.commit('setCheckInDate', checkInDate)
      this.$store.commit('setCheckOutDate', checkOutDate)
      this.isVisibleRoomAv = false
      this.calculatePrice()
    },
    setNumOfBedShare (ind, num) {
      this.$store.commit('setNumberOfRoomBedShare', {
        ind: ind - 1,
        num
      })
      this.calculatePrice()
    },
    setNumOfChildren (ind, num) {
      this.$store.commit('setNumberOfRoomChildren', {
        ind: ind - 1,
        num
      })
      this.calculatePrice()
    },
    setNumOfAdults (ind, num) {
      this.$store.commit('setNumberOfRoomAdults', {
        ind: ind - 1,
        num
      })
      this.calculatePrice()
    }
  }
}
</script>

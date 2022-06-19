<template>
  <div>
    <div class="bg-white">
      <div class="bg-primary guest-form-header">
        <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
          {{ $t("reservationAndUsageHistory.changeParkingLot") }}
        </div>
      </div>
      <!--  -->
      <div class="px-4 pb-4 mb-4">

        <!--Parking use or not BEGIN-->
        <v-radio-group
          hide-details
          v-model="borrow"
          @change="toggleBorrow"
        >
          <v-container>
            <v-row>
              <v-col
                class="radio-border d-flex py-2 mr-1 pr-0"
                v-for="item in parkingRadio"
                :key="item.value"
              >
                <v-radio
                  class="px-0"
                  :value="item.value"
                ></v-radio>
                <div class="d-flex flex-column">
                  <div class="text-medium">
                    {{ $t('reservationAndUsageHistory.parkingLot') }}
                  </div>
                  <h1 class="text-medium--c-prm">
                    {{ item.use }}
                  </h1>
                </div>

              </v-col>
              <v-col class="col-2 px-0 d-flex flex-column justify-center">
                <span class="text-small text-center --c-white px-0 bg-pink rounded-4 py-1 mx-2">
                  {{ $t('reservationAndUsageHistory.mandatory') }}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>
        <!--Parking use or not END-->
        <template v-if="borrow">
          <!--Number of cars header BEGIN-->
          <div class="text-medium pt-6 pb-3">
            {{ $t('reservationAndUsageHistory.numberOfCars') }}
            <span class="text-small col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
              {{ $t('reservationAndUsageHistory.mandatory') }}
            </span>
          </div>
          <div class="col-5 text-medium --c-bg px-0 py-1">
            <v-select
              hide-details
              solo
              :items="parkingCountItems"
              v-model="parkingCount"
            ></v-select>
          </div>
          <!--Number of cars END-->

          <template v-if="isParkingManaged" class="pb-3">
            <div v-for="(item, ind) in value" :key="ind">
              <div class="bg-smoke text-medium font-weight-bold --c-ms pa-2 mt-4">
                {{ $t("reservationAndUsageHistory.car") }}{{ ind + 1 }}
              </div>

              <!--Number and colour BEGIN-->
              <v-container class="mt-3">
                <v-row>
                  <v-col class="px-0">
                    {{ $t("reservationAndUsageHistory.number") }}
                    <v-text-field
                      class="pb-0"
                      hide-details
                      solo
                      :value="item.carNumber"
                      @input="(v) => changeParking(ind, { carNumber: v })"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="px-0">
                    {{ $t("reservationAndUsageHistory.colour") }}
                    <v-menu>
                      <template v-slot:activator="{on}">
                        <div class="color-picker-field pa-5" v-on="on"
                             :style="{ 'background-color': item.color ? item.color : '#ffffff' }"
                        >{{ item.color ? '' : 'ピックカラー' }}</div>
                      </template>
                      <v-card class="pa-4 text-center">
                        <v-color-picker
                          hide-details
                          :value="item.color ? item.color : '#ffffff'"
                          @input="(v) => changeParking(ind, { color: v })"
                          hide-inputs
                        />
                      </v-card>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
              <!--Number and colour END-->

              <!--Start and end date of use BEGIN-->
              <div>
                <FormLabel :label="$t('booking.usingDates')" required />
                <div class="d-flex align-center">
                  <v-select
                    solo
                    hide-details
                    :value="getFormattedDate(item.fromDate)"
                    :items="[getFormattedDate(item.fromDate)]"
                    @click="openFromDialog(ind)"
                  />
                  <ModalDated
                    :visible="rentalDateModalsFrom[ind]"
                    @close="openFromDialog(ind, false)"
                    :items="fromDateRange"
                    :value="item.fromDate"
                    @input="(v) => changeParking(ind, { from: v })"
                  />
                  <div class="text-medium --c-prm --w-bold px-4"> 〜 </div>
                  <v-select
                    :disabled="!item.fromDate"
                    :value="getFormattedDate(item.toDate)"
                    :items="[getFormattedDate(item.toDate)]"
                    @click="openToDialog(ind)"
                    solo
                    hide-details
                  />
                  <ModalDated
                    :visible="rentalDateModalsTo[ind]"
                    @close="openToDialog(ind, false)"
                    :items="getToDateRange(ind)"
                    :value="item.toDate"
                    @input="(v) => changeParking(ind, { to: v })"
                  />
                </div>
              </div>
              <!--Start and end date of use END-->

              <!--Parking lot format BEGIN-->
              <v-radio-group
                hide-details
                :value="item.parking && item.parking.id"
              >
                <v-container>
                  <v-row>
                    <FormLabel :label="$t('reservationAndUsageHistory.parkingLotFormat')" required />
                  </v-row>
                  <v-row
                    class="mb-2 pa-0"
                    v-for="parking in parkings"
                    :key="parking.id"
                  >
                    <v-col
                      class="pr-0 col-12 radio-border "
                      :class="{'bg-gray--light opacity-9': isFull(parking)}"
                    >
                      <v-radio
                        class="py-2 pl-0 pr-1"
                        :disabled="isFull(parking)"
                        :value="parking.id"
                        @change="changeSelectedParking(ind, parking, false)"
                      >
                        <template v-slot:label>
                          <div class="d-flex justify-space-between">
                            <div
                              class="text-medium pr-2 parking-name"
                              :class="{ '--c-super-dark-red': isFull(parking) }"
                            >
                              {{ parking.name }}
                            </div>
                            <h1
                              class="text-medium --c-prm justify-center flex-column d-flex"
                              :class="{ '--c-tertiary': isFull(parking) }"
                            >
                              ({{ $t('reservationAndUsageHistory.vehicleHeightLimit') }}: {{ parking.maxHeight ? `${parking.maxHeight}cm` : $t('common.none') }})
                            </h1>
                          </div>
                          <h1
                            v-if="isFull(parking)"
                            class="text-x-heading --c-white mx-auto justify-center flex-column d-flex parking-full"
                          >
                            {{ $t('reservationAndUsageHistory.full') }}
                          </h1>
                        </template>
                      </v-radio>
                    </v-col>
                    <v-col v-if="isFull(parking)" class="pr-0 pt-2 col-12 d-flex">
                      <IconDownRight class="mx-2"/>
                      <v-radio
                        class="py-2 pl-0 pr-1"
                        :label="$t('reservationAndUsageHistory.registerWaitingForCancellation')"
                        :value="parking.id"
                        @change="changeSelectedParking(ind, parking, true)"
                      ></v-radio>
                    </v-col>
                  </v-row>
                </v-container>
              </v-radio-group>
            </div>
          </template>
        </template>
      </div>
      <!--Parking lot format END-->
    </div>
    <!--Buttons BEGIN-->
    <v-btn
      v-if="btn"
      rounded
      block
      height="66"
      class="text-title bg-primary --c-white mb-3"
    >
      {{ $t('reservationAndUsageHistory.changeToTheAboveContent') }}
    </v-btn>
  </div>
</template>

<script>
import { addDays, getDateRangeArray, getStayDateRangeArray } from '@/utils/get-date'
import FormLabel from '../Inputs/FormLabel'
import ModalDated from './modal/ModalDated'
import IconDownRight from '@/components/icons/IconDownRight'
import { numberArrayGenerator } from '@/utils/generator'

export default {
  name: 'ChangeParkingInformation',
  components: {
    FormLabel,
    ModalDated,
    IconDownRight
  },
  props: {
    checkInDate: String,
    checkOutDate: String,
    facilityId: Number,
    btn: {
      Boolean
    },
    value: {
      type: [Array, Number],
      default: () => []
    }
  },
  watch: {
    facilityId: {
      immediate: true,
      async handler () {
        await this.loadParkings()
      }
    },
    checkInDate: {
      async handler () {
        await this.loadParkings()
      }
    },
    checkOutDate: {
      async handler () {
        await this.loadParkings()
      }
    }
  },
  methods: {
    getFormattedDate (date) {
      if (!date) return ''
      return this.$options.filters.jaShortDate(date)
    },
    openFromDialog (ind, visible = true) {
      this.$set(this.rentalDateModalsFrom, ind, visible)
    },
    openToDialog (ind, visible = true) {
      this.$set(this.rentalDateModalsTo, ind, visible)
    },
    getDefaultRentalPeriod (ind) {
      if (this.forChange) {
        if (this.value[ind]) {
          const { fromDate, toDate } = this.value[ind]
          if (fromDate === this.checkInDate && toDate === this.checkOutDate) {
            return 'whole'
          }
        }
        return 'part'
      }
      return null
    },
    getToDateRange (ind) {
      const { fromDate } = this.value[ind]
      return getDateRangeArray(addDays(fromDate, 1), this.checkOutDate, { excludeLast: false })
    },
    changeParking (ind, {
      from, to, carNumber, color, parking
    }) {
      const copied = this.value.slice()
      const item = copied[ind]
      if (from) {
        item.fromDate = from
      }
      if (to) {
        item.toDate = to
      }
      if (parking) {
        item.parking = parking
        if (parking.maxHeight) {
          item.height = parking.maxHeight
        }
      }
      if (carNumber) {
        item.carNumber = carNumber
      }
      if (color) {
        item.color = color
      }

      if (item.fromDate && item.toDate && item.toDate <= item.fromDate) {
        // from date cannot be the same or after toDate. Reset todate to prompt user to re-select
        item.toDate = null
      }
      copied.splice(ind, 1, item)
      this.emitInput(copied)
    },
    emitInput (arr) {
      this.$emit('input', arr)
    },
    toggleBorrow (borrow) {
      if (!borrow) {
        this.emitInput([])
      }
    },
    isFull (p) {
      return p.maxQuantity <= 0
    },
    changeSelectedParking (ind, parking, waitlist) {
      this.changeParking(ind, {
        parking: {
          ...parking,
          waitlist
        }
      })
    },
    async loadParkings () {
      await this.$doLoading(async () => {
        await this.$store.dispatch('loadParkingsForBooking', {
          facilityId: this.facilityId,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate
        })
      })
    }
  },
  data () {
    return {
      borrow: true,
      completionModal: false,
      parkingRadio: [
        { use: this.$t('reservationAndUsageHistory.use'), value: true },
        { use: this.$t('reservationAndUsageHistory.doNotUse'), value: false }
      ],
      rentalDateModalsFrom: [],
      rentalDateModalsTo: []
    }
  },
  computed: {
    parkingCount: {
      get () { return this.value.length },
      set (newLength) {
        if (this.isParkingManaged) {
          if (this.value.length < newLength) {
            this.emitInput(
              this.value.concat([...Array(newLength - this.value.length)].map(() => ({})))
            )
          } else {
            this.emitInput(this.value.slice(0, newLength))
          }
        } else {
          this.$emit('input', newLength)
        }
      }
    },
    parkingCountItems () {
      return numberArrayGenerator(20, false)
    },
    isParkingManaged () {
      return this.$store.getters.isParkingManagedFacility
    },
    parkings () { return this.$store.getters.parkingsForBooking },
    fromDateRange () {
      return getStayDateRangeArray(this.checkInDate, this.checkOutDate)
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'src/assets/styles/modules/variables-scss' as v;

::v-deep {
  .v-radio {
    label {
      font-size: var(--font-size__medium);
      color: var(--color__ue-red);
      font-weight: bold !important;
    }
  }
  .rounded-10 {
    border: solid 1px var(--color__primary);
  }
  @media (max-width: v.$breakpoint__x-small - 1) {
    .rounded-10 {
      padding: 12px !important;
    }
  }
}
.opacity-9 {
  opacity: 0.9;
}
.parking-name {
  word-break: break-all;
  max-width: 60%;
}
.parking-full {
  width: 4em;
  text-align: center;
}
</style>

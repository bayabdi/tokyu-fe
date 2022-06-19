<template>
  <div>
    <div class="bg-white">
      <div class="bg-primary guest-form-header">
        <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
          {{ $t("reservationAndUsageHistory.changeRentalListing") }}
        </div>
      </div>
      <!--  -->

      <div class="px-4 mb-4">

        <v-radio-group
          v-model="borrow"
          hide-details
          @change="toggleBorrow"
        >
          <v-container>
            <v-row>
              <v-col
                class="radio-border d-flex justify-center flex-column py-0 mr-1 pr-0 mb-3"
                v-for="item in firstRadio"
                :key="item.id"
              >
                <v-radio
                  class="py-2 pl-0 pr-1 px-0"
                  :label="item.label"
                  :value="item.value"
                ></v-radio>
              </v-col>
              <v-col class="col-2 px-0">
                <span class="text-medium  col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
                  {{ $t('reservationAndUsageHistory.mandatory') }}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>

        <template v-if="borrow">
          <FormLabel :label="$t('reservationAndUsageHistory.numberOfRentalListingGroups')" required />

          <v-container>
            <v-row>
              <v-col class="text-medium col-5 --c-bg px-0 py-1 mb-3">
                <v-select
                  :items="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                  v-model="itemCount"
                  solo
                  hide-details
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>

          <div v-for="(item, ind) in value" :key="ind">
            <div class="bg-smoke text-medium font-weight-bold --c-ms py-2 mt-4">
              {{ $t('reservationAndUsageHistory.rentalExhibitionGroup') }}{{ ind + 1 }}
            </div>

            <v-radio-group
              hide-details
              :value="typeof rentalType[ind] === 'undefined' ? getDefaultRentalPeriod(ind) : rentalType[ind]"
              @change="(v) => setRentalPeriod(ind, v)"
            >
              <v-container>
                <v-row>
                  <v-col
                    class="radio-border d-flex justify-center flex-column  py-0 mr-1 pr-0"
                    v-for="item in secondRadio"
                    :key="item.id"
                  >
                    <v-radio
                      class="py-2 pl-0 pr-0 px-0"
                      :label="item.label"
                      :value="item.value"
                    />
                  </v-col>
                  <v-col class="col-2 px-0">
                    <span class="text-medium  col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
                      {{ $t('reservationAndUsageHistory.mandatory') }}
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-radio-group>

            <v-main class="mt-3">
              <FormLabel :label="$t('reservationAndUsageHistory.lendingSchedule')" required />
              <div class="d-flex align-center">
                <v-select
                  :value="getFormattedDate(item.fromDate)"
                  :items="[getFormattedDate(item.fromDate)]"
                  @click="openFromDialog(ind)"
                  solo
                  hide-details
                />
                <ModalDated
                  :visible="rentalDateModalsFrom[ind]"
                  @close="openFromDialog(ind, false)"
                  :items="fromDateRange"
                  :value="item.fromDate"
                  @input="(v) => changeRentalItem(ind, { from: v })"
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
                  @input="(v) => changeRentalItem(ind, { to: v })"
                 />
              </div>
            </v-main>

            <v-main class="mt-3">
              <FormLabel :label="$t('reservationAndUsageHistory.rentalListing')" required />
              <div @click="openItemSelect(ind)">
                <v-select
                  :value="getSelectedItemName(ind)"
                  :items="getSelectedItemName(ind) ? [getSelectedItemName(ind)] : []"
                  solo
                />
              </div>
            </v-main>
          </div>

          <v-divider></v-divider>
          <v-container class="mt-3 pb-9">
            <v-row>
              <v-col class="text-title d-flex flex-column justify-center px-0 py-1">
                <span>
                  {{ $t('reservationAndUsageHistory.totalRentalAmount') }}
                </span>
              </v-col>
              <v-col class="--c-prm font-weight-bold text-right --c-bg px-0 py-1">
                <span class="text-large">{{ totalPrice }}</span>
                <span class="text-title">
                  {{ $t('reservationAndUsageHistory.yen') }}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </div>
    </div>
    <ModalRentalListing
      :visible="isOpen"
      :checkInDate="checkInDate"
      :checkOutDate="checkOutDate"
      :facilityId="facilityId"
      :value="selectedGroup"
      @close="isOpen = false"
      @select="(v) => selectRentalItem(v)"
    />
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
import Vue from 'vue'
import FormLabel from '../Inputs/FormLabel.vue'
import ModalDated from './modal/ModalDated'
import ModalRentalListing from './modal/ModalRentalListing'
import { calculateRentalItemPrice } from '@/utils/prices'
import { addDays, getDateRangeArray, getStayDateRangeArray } from '@/utils/get-date'

export default {
  name: 'ChangeRentalListing',
  components: {
    ModalDated,
    ModalRentalListing,
    FormLabel
  },
  props: {
    checkInDate: String,
    checkOutDate: String,
    facilityId: Number,
    forChange: Boolean,
    btn: {
      Boolean
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isOpen: false,
      borrow: true,
      itemInd: null,
      rentalType: [],
      firstRadio: [
        { label: this.$t('reservationAndUsageHistory.borrowRentalListing'), value: true },
        { label: this.$t('reservationAndUsageHistory.noRentalListingRequired'), value: false }
      ],
      secondRadio: [
        { label: this.$t('reservationAndUsageHistory.usedForAllDates'), value: 'whole' },
        { label: this.$t('reservationAndUsageHistory.useOnlyForSpecificDates'), value: 'part' }
      ],
      rentalDateModalsFrom: [],
      rentalDateModalsTo: [],
      selectedItems: []
    }
  },
  computed: {
    itemCount: {
      get () { return this.value.length },
      set (newLength) {
        if (this.value.length < newLength) {
          this.emitInput(
            this.value.concat([...Array(newLength - this.value.length)].map(() => ({})))
          )
        } else {
          this.emitInput(
            this.value.slice(0, newLength)
          )
        }
      }
    },
    totalPrice () {
      try {
        const result = calculateRentalItemPrice(this.value)
        return this.$options.filters.toThousands(result.totalPrice)
      } catch (e) {
        return '----'
      }
    },
    fromDateRange () {
      return getStayDateRangeArray(this.checkInDate, this.checkOutDate)
    },
    selectedGroup () {
      if (typeof this.itemInd === 'number') { return this.value[this.itemInd]?.selects ?? [] }
      return []
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
    emitInput (arr) {
      this.$emit('input', arr)
    },
    changeRentalItem (ind, {
      from, to, selects
    }) {
      const copied = this.value.slice()
      const item = copied[ind]
      if (from) { item.fromDate = from }
      if (to) { item.toDate = to }
      if (selects) { item.selects = selects }

      if (item.fromDate && item.toDate && item.toDate <= item.fromDate) {
        // from date cannot be the same or after toDate. Reset todate to prompt user to re-select
        item.toDate = null
      }
      copied.splice(ind, 1, item)
      this.emitInput(copied)
    },
    setRentalPeriod (ind, newType) {
      if (newType === 'whole') {
        this.changeRentalItem(ind, {
          from: this.checkInDate,
          to: this.checkOutDate
        })
      }
      Vue.set(this.rentalType, ind, newType)
    },
    getSelectedItemName (ind) {
      const { selects } = this.value[ind]
      if (selects) return selects.map(s => s.rentalItemDef.name).join(', ')
      return null
    },
    openItemSelect (ind) {
      this.itemInd = ind
      this.isOpen = true
    },
    selectRentalItem (selects) {
      this.changeRentalItem(this.itemInd, { selects })
      this.isOpen = false
    },
    toggleBorrow (borrow) {
      if (!borrow) {
        this.emitInput([])
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
@use '/src/assets/styles/modules/variables-scss' as v;

::v-deep {
  .v-radio {
    label {
      font-size: var(--font-size__medium);
      color: var(--color__x-dark);
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
.radio-border{
  border: 2px solid #E0E0E0;
  border-radius: 10px;
  opacity: 1;
}
</style>

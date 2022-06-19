<template>
  <div>
    <v-dialog
      v-model="isVisible"
      max-width="378"
      content-class="bg-white text-center"
    >
      <div class="text-right">
        <button @click.stop="$emit('close')" class="btn-close bg-primary">
          <div class="btn-close__icon" />
        </button>
      </div>
      <div class="px-6">
        <h2 class="mt-n7 mb-5 text-heading --c-prm">{{ $t('common.searchCriteria') }}</h2>
        <div @click="isVisibleRoomAv = true">
          <v-select
            :label="$t('common.selectDate')"
            :value="selectedDate"
            :items="[selectedDate]"
            solo
            hide-details
            height="75"
            class="mb-5"
            readonly
          >
            <template v-slot:prepend-inner>
              <IconSelectDate :width="35" :height="35" class="mx-3"/>
            </template>
          </v-select>
        </div>
        <div @click="isVisibleFacilities = true">
          <v-select
            :value="selectedFacilities"
            :items="selectedFacilities"
            multiple
            :label="$t('common.selectFac')"
            solo
            hide-details
            readonly
            class="mb-5 multiple-select-min-height-75 normal-label"
          >
            <template v-slot:prepend-inner>
              <IconFac :width="35" :height="35" class="mx-3"/>
            </template>
          </v-select>
        </div>
        <div @click="isVisibleTags = true">
          <v-select
            class="mb-5 multiple-select-min-height-75 normal-label"
            :value="selectedTags"
            :items="selectedTags"
            multiple
            :label="$t('common.searchByTag')"
            style="min-height: 75px"
            hide-details
            solo
            readonly
          >
            <template v-slot:prepend-inner>
              <IconNoSmoke :width="35" :height="35" class="mx-3"/>
            </template>
          </v-select>
        </div>
        <div @click="isVisibleNumberGuest = true">
          <v-select
            :label="$t('common.numberPeople')"
            :value="selectedGuests"
            :items="[selectedGuests]"
            height="75"
            hide-details
            solo
            readonly
          >
            <template v-slot:prepend-inner>
              <IconPeople :width="35" :height="35" class="mx-3"/>
            </template>
          </v-select>
        </div>
        <v-btn
          color="primary"
          @click="$emit('search')"
          class="my-8"
          elevation="2"
          large
          rounded
        >
          <IconSearch color="white" class="mr-2" />{{ $t('buttons.search') }}
        </v-btn>
      </div>
    </v-dialog>
<!--    todo don't save data when it'll be closed-->
    <RoomAvailability
      :visible="isVisibleRoomAv"
      @close="isVisibleRoomAv = false"
      @confirm="setCheckInOut"
    />
    <RoomType
      :value="selectedTags"
      @confirm="changeTags"
      :visible="isVisibleTags"
      @close="isVisibleTags = false"
    />
    <FacilitySelect
      :value="facilities"
      @confirm="changeFacilities"
      :visible="isVisibleFacilities"
      @close="isVisibleFacilities = false"
    />
    <NumberGuest
      :visible="isVisibleNumberGuest"
      @close="isVisibleNumberGuest = false"
    />
  </div>
</template>

<script>
import IconFac from '@/components/icons/IconFac'
import IconNoSmoke from '@/components/icons/IconNoSmoke'
import IconPeople from '@/components/icons/IconPeople'
import IconSelectDate from '@/components/icons/IconSelectDate'
import IconSearch from '@/components/icons/IconSearch'
import RoomType from '@/views/VacancySearch/components/SearchModal/components/RoomType'
import FacilitySelect from '@/views/VacancySearch/components/SearchModal/components/FacilitySelect'
import NumberGuest from '@/views/VacancySearch/components/SearchModal/components/NumberGuest'
import RoomAvailability from '@/views/VacancySearch/components/RoomAvailability'
import { mapState } from 'vuex'
import { jaShortDate } from '@/utils/get-date'

export default {
  name: 'SearchModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IconFac,
    IconNoSmoke,
    IconPeople,
    IconSelectDate,
    IconSearch,
    RoomType,
    NumberGuest,
    RoomAvailability,
    FacilitySelect
  },
  data () {
    return {
      isVisibleTags: false,
      isVisibleNumberGuest: false,
      isVisibleRoomAv: false,
      isVisibleFacilities: false
    }
  },
  computed: {
    ...mapState({
      checkInDate: state => state.newBooking.checkInDate,
      checkOutDate: state => state.newBooking.checkOutDate,
      selectedTags: state => state.newBooking.tags,
      facilities: state => state.newBooking.facilities,
      numberOfAdults: state => state.newBooking.numberOfAdults,
      numberOfChildren: state => state.newBooking.numberOfChildren,
      numberOfBedShare: state => state.newBooking.numberOfBedShare
    }),
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
    selectedGuests () {
      return `${this.numberOfAdults + this.numberOfChildren + this.numberOfBedShare}${this.$t('common.peopleUse')}`
    },
    selectedFacilities () {
      return this.facilities?.map(f => f.shortName) ?? []
    },
    selectedDate () {
      return `${jaShortDate(this.checkInDate)} ~ ${jaShortDate(this.checkOutDate)}`
    }
  },
  methods: {
    setCheckInOut ({ checkInDate, checkOutDate }) {
      this.$store.commit('setCheckInDate', checkInDate)
      this.$store.commit('setCheckOutDate', checkOutDate)
      this.isVisibleRoomAv = false
    },
    changeTags (tags) {
      this.$store.commit('setSearchTags', tags)
      this.isVisibleTags = false
    },
    changeFacilities (facilities) {
      this.$store.commit('setSearchFacilityIds', facilities)
      this.isVisibleFacilities = false
    }
  }
}
</script>

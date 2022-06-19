<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/vacancy-search/reservation">
        {{ $t("menu.main.vacancySearch") }}
      </router-link>
      >
      <template v-if="facilityInfo">
        {{ facilityInfo.name }}
      </template>
    </Breadcrumbs>
    <div class="form-container" v-if="facilityInfo">
      <v-img
        lazy-src="@/assets/images/tokyu-vacation-reservation.jpg"
        :src="facilityInfo.mainImageUrl"
        max-height="250"
      ></v-img>
      <div class="bg-white text-center pt-5">
        <h4 class="text-default --w-regular">
          <FacilityLocation :address="facilityInfo.address1" />
        </h4>
        <h1 class="text-large --c-prm">{{ facilityInfo.name }}</h1>
        <v-btn
          :href="facilityInfo.facilityHpUrl"
          target="_blank"
          class="my-4 text-medium --w-bold --c-prm"
          rounded
          color="var(--color__smoke)"
          x-large
        >
          {{ $t("buttons.openFacilityInformation") }}
          <IconOpen />
        </v-btn>
        <h3 class="my-4 text-medium --c-x-dark --w-bold">
          {{ $t("text.roomType.pleaseSelect") }}
        </h3>
        <div class="px-3">
          <RoomTypeSelect :roomTypes="roomTypes" v-model="roomTypeId" />
        </div>
        <Calendar :type="type" />
        <ReservationForm v-if="type === '0'" @commit="goToPlanSelect" />
<!--    @deprecated type === '1'    -->
        <ReservationFormShort
          v-if="type === '1'"
          @commit="isVisibleCancel = true"
        />
      </div>
    </div>
    <!-- <NotificationsSetUp :visible="isVisibleComplete" @commit="complete()" @close="isVisibleComplete = false"/>
    <ReservationCancellation :visible="isVisibleCancel" @close="isVisibleCancel = false" @commit="isVisibleReservationCancellationComplete = true"/>
    <ReservationCancellationComplete :visible="isVisibleReservationCancellationComplete" @close="isVisibleReservationCancellationComplete = false"/> -->
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import IconOpen from '@/components/icons/IconOpen'
import RoomTypeSelect from '@/components/RoomTypeSelect'
import Calendar from '@/components/ReservationCalendar'
import ReservationForm from '@/components/ReservationForm'
import ReservationFormShort from '@/components/ReservationFormShort'
import mixin from '../searchVacancyMixin'
import FacilityLocation from '@/components/Facility/FacilityLocation'
import { isoDate } from '@/utils/get-date'

export default {
  name: 'Reservation',
  mixins: [mixin],
  components: {
    Breadcrumbs,
    IconOpen,
    RoomTypeSelect,
    Calendar,
    ReservationForm,
    ReservationFormShort,
    FacilityLocation
  },
  watch: {
    facilityId: {
      immediate: true,
      async handler () {
        await this.loadData()
      }
    },
    async year () {
      await this.loadData()
    },
    async month () {
      await this.loadData()
    }
  },
  created () {
    if (this.checkInDate) {
      const split = this.checkInDate.split('-')
      this.$store.commit('setReservationDate', {
        year: parseInt(split[0]),
        month: parseInt(split[1])
      })
    }
  },
  data () {
    return {
      isVisibleComplete: false,
      isVisibleCancel: false,
      isVisibleReservationCancellationComplete: false
    }
  },
  methods: {
    async loadData () {
      await this.$doLoading(async () => {
        const facilityInfo = await this.$store.dispatch('getPricingOfFacility', {
          facilityId: this.facilityId,
          fromDate: this.fromDate,
          toDate: this.toDate
        })
        this.$store.commit('setFacilityInfoForBooking', facilityInfo)
        this.$store.commit('setRoomTypePrices', facilityInfo.roomTypes)
        if (this.roomTypeId && facilityInfo.roomTypes.some(rt => rt.id === this.roomTypeId)) {
          // check if the room type exists in the new search result, and if exists keep that
        } else {
          this.$store.commit('setRoomTypeId', facilityInfo.roomTypes[0].id)
        }
      })
    },
    async goToPlanSelect () {
      if (this.$store.getters.isReadyForPriceTemporaryBooking) {
        await this.$router.push('/home/vacancy-search/reservation/selectplan')
      }
    }
  },
  computed: {
    facilityInfo () { return this.$store.state.newBooking.facilityInfo },
    facilityId () { return parseInt(this.$route.params.id) },
    type () { return '0' },
    year () { return this.$store.state.reservationCalendar.year },
    month () { return this.$store.state.reservationCalendar.month },
    fromDate () {
      return isoDate(new Date(this.year, this.month - 1, 1))
    },
    toDate () {
      return isoDate(new Date(this.year, this.month, 1))
    },
    roomTypes () {
      return this.$store.state.reservationCalendar.roomTypes
    },
    roomTypeId: {
      get () { return this.$store.state.reservationCalendar.roomTypeId },
      set (val) { this.$store.commit('setRoomTypeId', val) }
    }
  }
}
</script>

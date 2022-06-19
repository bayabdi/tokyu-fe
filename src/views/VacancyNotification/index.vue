<template>
  <div class="form-container px-5 pb-15">
    <!-- Vacancy notification list -->
    <h2 v-if="vacationList !== 0" class="text-heading--c-prm py-8 text-center">
      {{ $t("vacancy.vacancyNotificationList") }}
    </h2>
    <VacancyNotiItem
      v-for="item in vacationList"
      :key="item.id"
      :id="item.id"
      :dateFrom="item.checkInDate"
      :dateTo="item.checkOutDate"
      :name="item.roomType.facility.name"
      :roomName="item.roomType.name"
      :pointName="item.roomType.facility.name"
    />

    <!-- Parking-lot List -->
    <h2
      v-if="ParkingList.length !== 0"
      class="text-heading--c-prm py-4 text-center"
    >
      {{ $t("vacancy.parkingLotRegistrationList") }}
    </h2>
    <VacancyNotiItem
      v-for="item in ParkingList"
      :key="item.id + 'x'"
      :id="item.id"
      :dateFrom="item.fromDate"
      :dateTo="item.toDate"
      :name="item.facilityParking.facility.name"
      :typeVehicle="item.facilityParking.name"
      :heightLimit="item.facilityParking.maxHeight"
      :parking="true"
    />
    <NotRegistered :visible="isNotRegistered" @close="back()" />
  </div>
</template>

<script>
import VacancyNotiItem from '@/components/VacancyNotiItem'
import NotRegistered from './component/NotRegistered'

export default {
  name: 'VacancyNotification',
  components: {
    VacancyNotiItem,
    NotRegistered
  },
  mounted () {
    this.$store.dispatch('waitLists', {
      apollo: this.$apollo
    }).then(res => {
      this.isNotRegistered = (this.vacationList.length + this.ParkingList.length < 1)
    })
  },
  methods: {
    back () {
      this.$router.push('/home')
    }
  },
  computed: {
    vacationList () {
      return this.$store.state.waitlist.myCancelWaitList
    },
    ParkingList () {
      return this.$store.state.waitlist.myFacilityParkingCancelWaitlistList
    }
  },
  data () {
    return {
      isNotRegistered: false
    }
  }
}
</script>

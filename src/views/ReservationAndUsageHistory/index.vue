<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-15">
      <!-- Latest reservation BEGIN-->
      <h2
        v-if="nearFutureBookings.length > 0"
        class="text-bold --c-prm text-center font-weight-bold pt-6 pb-3"
      >
        {{ $t("reservationAndUsageHistory.theLatest") }}
      </h2>
      <div v-for="booking in nearFutureBookings" :key="booking.id" class="mb-4">
        <UsageHistoryItem
          :id="booking.id"
          :urlImg="booking.room.roomType.facility.mainImageUrl"
          :title="booking.room.roomType.facility.name"
          :checkInDate="booking.checkInDate"
          :checkOutDate="booking.checkOutDate"
          :roomTypeName="booking.room.roomType.name"
          :isSoon="confirmationCheck(booking)"
        />
      </div>
      <!-- Latest reservation END-->

      <!-- Current room reservation BEGIN-->
      <h2
        v-if="futureBookings.length > 0"
        class="text-bold --c-prm text-center font-weight-bold pt-6 pb-3"
      >
        {{ $t("reservationAndUsageHistory.currentRoomReservation") }}
      </h2>
      <div v-for="booking in futureBookings" :key="booking.id" class="mb-4">
        <UsageHistoryItem
          :id="booking.id"
          :urlImg="booking.room.roomType.facility.mainImageUrl"
          :title="booking.room.roomType.facility.name"
          :checkInDate="booking.checkInDate"
          :checkOutDate="booking.checkOutDate"
          :roomTypeName="booking.room.roomType.name"
        />
      </div>
      <!-- Current room reservation END-->

      <!-- Past accommodation reservations BEGIN-->
      <h2
        v-if="pastBookings.length > 0"
        class="text-bold --c-prm text-center font-weight-bold pt-6 pb-3"
      >
        {{ $t("reservationAndUsageHistory.pastAccommodationReservations") }}
      </h2>
      <div v-for="booking in pastBookings" :key="booking.id" class="mb-4">
        <UsageHistoryItem
          :id="booking.id"
          :urlImg="booking.room.roomType.facility.mainImageUrl"
          :title="booking.room.roomType.facility.name"
          :checkInDate="booking.checkInDate"
          :checkOutDate="booking.checkOutDate"
          :roomTypeName="booking.room.roomType.name"
        />
      </div>
      <!-- Past accommodation reservations END-->

      <div class="text-center mb-7">
        <v-btn
          @click="loadMorePastBookings"
          rounded
          height="50"
          class="bg-primary --c-white mt-3 mb-7 pl-7 pr-7"
        >
          {{ $t("reservationAndUsageHistory.seeMore") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import UsageHistoryItem from '@/components/UsageHistoryItem'
import { confirmationCheck } from '@/utils/check'
export default {
  name: 'ReservationAndUsageHistory',
  components: {
    Breadcrumbs,
    UsageHistoryItem
  },
  async mounted () {
    await this.$doLoading(async () => {
      await this.$store.dispatch('loadNearFutureBookings')
      await this.$store.dispatch('loadFutureBookings')
      await this.$store.dispatch('loadPastFutureBookings')
    })
  },
  computed: {
    nearFutureBookings () {
      return this.$store.getters.nearFutureBookings
    },
    futureBookings () {
      return this.$store.getters.futureBookings
    },
    pastBookings () {
      return this.$store.getters.pastBookings
    }
  },
  methods: {
    confirmationCheck,
    async loadMorePastBookings () {
      await this.$doLoading(async () => {
        await this.$store.dispatch('loadPastFutureBookings')
      })
    }
  }
}
</script>

<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/usage-history">
        {{ $t("reservationAndUsageHistory.reservationAndUsageHistory") }}
      </router-link>>

      <router-link :to="{name: 'reservation-detail', params: {id}}">
        {{ $t("reservationAndUsageHistory.reservationDetails") }}
      </router-link>
      >
      <router-link :to="{name: 'reservation-change', params: {id}}">
        {{ $t("reservationAndUsageHistory.reservationChange") }}
      </router-link>>
      {{ $route.meta.title }}
    </Breadcrumbs>

    <div class="form-container  pb-15 pt-5" v-if="booking">
      <UsageHistoryItem
        :id="booking.id"
        :urlImg="facility.mainImageUrl"
        :title="facility.name"
        :checkInDate="booking.checkInDate"
        :checkOutDate="booking.checkOutDate"
        :roomTypeName="booking.room.roomType.name"
        isActive
        :cancelledAt="cancelledAt"
      />
      <router-view :btn="true"></router-view>
      <v-btn
        rounded
        block
        height="66"
        class="text-title bg-white --c-prm mb-3"
        @click="back"
      >
        {{ $t('reservationAndUsageHistory.return')}}
      </v-btn>
    </div>
    <ReturnTopPage :visible="changeCompleted" @close="() => completeChange(false)">
      <div class="text-left pb-5 pl-12">
        {{ $t('text.reservationChanged') }}
      </div>
    </ReturnTopPage>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import UsageHistoryItem from '@/components/UsageHistoryItem'
import ReturnTopPage from '../../components/ReturnTopPage.vue'
import selectedBookingMixin from '../../selectedBookingMixin'
export default {
  name: 'AccommodationDateExtension',
  mixins: [selectedBookingMixin],
  components: {
    Breadcrumbs,
    UsageHistoryItem,
    ReturnTopPage
  },
  methods: {
    back () {
      this.$router.push({
        name: 'reservation-change',
        params: { id: this.id }
      })
    }
  },
  data () {
    return {
      completed: false
    }
  }
}
</script>

<template>
  <div class="form-container">
    <div class="text-center text-heading --w-bold --c-prm py-5">{{ $t('booking.thanksForBooking') }}</div>

    <div class="px-5">
      {{ $t('booking.bookingConfirmed') }}
      <!-- Reservation Details START-->
      <UsageHistoryItem
        :id="facilityInfo.id"
        :title="facilityInfo.name"
        :urlImg="facilityInfo.mainImageUrl"
        :roomTypeName="roomType.name"
        :checkInDate="checkInDate"
        :checkOutDate="checkOutDate"
        class="px-0"
        :isActive="true"
        :bgWhite="true"
      />
      {{ $t('booking.confirmationSentToEmail', { email: myEmail }) }}
      <v-btn
        class="text-heading mt-4 mb-12 --w-bold"
        :to="{ name: 'home' }"
        height="57"
        rounded
        block
        color="primary"
        large
      >{{ $t('buttons.backToMainPage') }}</v-btn>
    </div>
</div>
</template>

<script>
import UsageHistoryItem from '@/components/UsageHistoryItem'
import searchVacancyMixin from '../searchVacancyMixin'

export default {
  name: 'Complete',
  mixins: [searchVacancyMixin],
  components: {
    UsageHistoryItem
  },
  computed: {
    myEmail () {
      return this.$store.state.user.email
    }
  }
}
</script>

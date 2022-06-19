<template>
  <router-link
    tag="div"
    :to="
      !isActive ? {
        name: 'reservation-detail',
        params: { id }
      } : ''
    "
    class="pa-4 rounded p-relative"
    :class="{ 'bg-white block-pointer': !isActive, 'bg-white px-4 my-5': bgWhite }"
  >
    <div class="d-flex pt-2 pb-2">
      <v-img
        :src="urlImg"
        width="73"
        height="73"
        max-width="73"
        lazy-src="@/assets/images/lazy-img.png"
        class="mr-3"
        :class="{ 'circle ml-0': isActive }"
      ></v-img>

      <div>
        <div v-if="cancelledAt" class="--c-red">{{ $t('booking.alreadyCancelled') }}</div>
        <div
          class="text-medium --w-medium line--1"
          :class="{ '--c-prm mb-3': !isActive, '--c-medium-gray': isActive }"
        >
          {{ title }}
        </div>
        <div
          class="text-regular"
          :class="{ '--c-prm font-weight-bold': isActive }"
        >
          {{ checkInDate | jaLongDate }} ~ {{ checkOutDate | jaLongDate }}
        </div>
        <div
          class="text-regular d-flex"
          :class="{ '--c-medium-gray': isActive }"
        >
          {{ roomTypeName }}
        </div>
      </div>
    </div>
    <div v-if="isSoon">
      <p class="--c-dark-red mt-5 mt-5 font-weight-bold">
        {{ $t("homePage.availableServiceNotice.line1") }} <br />
        {{ $t("homePage.availableServiceNotice.line2") }}
      </p>
      <div></div>
      <v-btn
        rounded
        block
        height="50"
        class="bg-red --c-white mt-3 mb-3"
        :to="{
          name: 'reservation-usage-confirmation',
          params: { id }
        }"
      >
        {{ $t("reservationAndUsageHistory.enterInformationAndConfirmUsage") }}
      </v-btn>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'UsageHistoryItem',
  props: {
    id: [Number, String],
    title: String,
    urlImg: String,
    isSoon: {
      type: Boolean,
      default: false
    },
    checkInDate: String,
    checkOutDate: String,
    roomTypeName: String,
    isActive: Boolean,
    bgWhite: {
      type: Boolean,
      default: false
    },
    cancelledAt: {
      type: [String, Date],
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.circle{
  border-radius: 100px
}
</style>

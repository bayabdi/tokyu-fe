<template>
  <div
    @click="$listeners.click"
    class="bg-white --border-r-2 mt-5 text-left vacancy-item-outer"
  >
    <v-row class="ma-0 pb">
      <v-col class="pa-0 pl-5 pt-3">
        <FacilityLocation :address="address" />
      </v-col>
      <v-col class="pa-0 pt-3 text-right">
        <button class="bg-black px-3 py-2 --border-rl-2">
          <IconNext color="white" />
        </button>
      </v-col>
    </v-row>
    <h3 class="pl-5 text-large --w-bold --c-prm">{{ name }}</h3>
    <v-row class="ma-0 pl-5 mt-3 pr-5">
      <v-col cols="5" class="pa-0">
        <v-img
          width="137"
          height="137"
          :src="imageUrl"
          lazy-src="@/assets/images/tokyu-vacation-reservation.jpg"
        ></v-img>
      </v-col>
      <v-col class="pa-0">
        <p class="text-normal --c-x-dark mb-2 pl-2">
          <a
            v-if="facilityHpUrl"
            :href="facilityHpUrl"
            target="_blank"
            @click.stop
          >
            {{ $t('booking.facilityInformation') }} <IconOpen/>
          </a>
        </p>
        <div
          v-for="feature in tags"
          :key="feature"
          class="feature pa-0 --c-x-dark border-medium --border-light-gray ma-0 mb-2 ml-2 --border-r-2 px-2 py-1"
        >
          {{ feature }}
        </div>
      </v-col>
    </v-row>
    <div class="overflow-auto pa-2">
      <div class="d-flex nowrap">
        <div
          v-for="day in priceFrom.slice(0, 5)"
          :key="day.stayDate"
          class="px-1 price-by-day"
        >
          <div
            v-if="typeof day.price === 'number'"
            class="bg-yellow --border-r-2 pa-2"
          >
            <h5 class="text-x-small --w-regular --c-bg text-center">
              {{ day.stayDate | jaShortDateWithDow }}
            </h5>
            <h4 class="--w-bold mt-1 --c-black text-center" :class="{ 'text-x-small': unit !== 'Pt' }">
              {{ day.price }}{{ unit }}~
            </h4>
          </div>
          <div v-else class="bg-gray-x-light --border-r-2 pa-2">
            <h5 class="text-x-small --w-regular --c-bg text-center">
              {{ day.stayDate | jaShortDateWithDow }}
            </h5>
            <h4 class="--w-bold mt-1 --c-black text-center">
              {{ $t("common.noVacancy") }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconNext from '@/components/icons/IconNext'
import FacilityLocation from '../Facility/FacilityLocation.vue'
import IconOpen from '@/components/icons/IconOpen'

export default {
  name: 'VacationItem',
  components: {
    IconNext,
    FacilityLocation,
    IconOpen
  },
  props: {
    address: String,
    imageUrl: String,
    facilityHpUrl: String,
    name: String,
    tags: Array,
    priceFrom: Array,
    unit: String
  }
}
</script>

<style scoped>
.feature {
    display: table;
    float: left;
}
.vacancy-item-outer {
    max-width: 100%;
}
.price-by-day {
    min-width: 70px;
}
.nowrap {
    white-space: nowrap;
}
</style>

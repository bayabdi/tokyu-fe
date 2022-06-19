<template>
  <div class="form-container" v-if="facilityInfo">
    <Stage />
    <div class="pa-4">
      <h3 class="text-center text-heading --w-bold --c-prm my">
        {{ $t('text.selectPlan.pleaseSelect') }}
      </h3>
      <v-row class="ma-0 mt-7">
        <v-col cols="5" class="pa-0">
          <v-img
            :src="facilityInfo.mainImageUrl"
            lazy-src="@/assets/images/tokyu-vacation-reservation.jpg"
            max-height="150"
          ></v-img>
        </v-col>
        <v-col class="pa-0 pl-4">
          <h4 class="text-title --c-prm --w-regular">{{ facilityInfo.name }}</h4>
          <p class="mt-4 text-default --w-regular --c-x-dark">
            {{ facilityInfo.postalCode | postalCode }}<br />
            {{ facilityInfo.address1 }}
          </p>
        </v-col>
      </v-row>
      <PlanItem
        v-for="plan in plans"
        :plan="plan"
        :key="plan.id"
        @click="() => selectPlan(plan)"
      />
      <PlanItem @click="selectNoPlan" />
    </div>
    <!-- <LackPoints :visible="isVisibleLack" @close="isVisibleLack = false"/> -->
  </div>
</template>

<script>
import Stage from '@/components/Stage'
import PlanItem from '@/components/PlanItem'
// import LackPoints from '@/views/VacancySearch/components/LackPoints'

export default {
  name: 'SelectPlan',
  components: {
    Stage,
    PlanItem
    // LackPoints
  },
  async mounted () {
    if (!this.facilityInfo) {
      return this.$router.replace({ name: 'vacancy-search' })
    }
    await this.$doLoading(async () => {
      await this.$showGqlError(() => this.$store.dispatch('loadAvailableBookingPlans'), {
        BOOKING_PLAN_NOT_SUPPORTED_CONTRACT_PRODUCT_TYPE: () => {
          this.planNotAvailable()
        }
      })
      this.$nextTick(() => {
        if (!this.plans || this.plans.length === 0) {
          // there is no plan for this booking condition
          this.planNotAvailable()
        }
      })
    })
  },
  data () {
    return {
      isVisibleLack: false
    }
  },
  computed: {
    facilityInfo () { return this.$store.state.newBooking.facilityInfo },
    plans () { return this.$store.state.newBooking.bookingPlans }
  },
  methods: {
    selectPlan (plan) {
      this.$store.commit('setBookingPlanId', plan.id)
      this.$router.push('confirmation')
    },
    selectNoPlan () {
      this.$store.commit('setBookingPlanId', null)
      this.$router.push('confirmation')
    },
    planNotAvailable () {
      this.$store.commit('setBookingPlanId', null)
      this.$router.replace('confirmation')
    }
  }
}
</script>

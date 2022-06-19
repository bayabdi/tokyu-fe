<template>
  <div class="form-container" v-if="facilityInfo">
    <Stage :stage="2" />
    <h3 class="text-heading --w-bold --c-prm py-5 text-center">{{ $t('text.reservationConfirm.please') }}</h3>

    <div class="bg-white pa-5 --border-r-2">
      <v-row class="ma-0">
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
      <div class="d-flex justify-space-between mt-4">
        <div class="text-left text-title --w-regular --c-x-dark">
          {{ $t('buttons.checkIn') }}
        </div>
        <div class="text-title --c-x-dark text-right">
          {{ checkInDate | jaLongDate }}
        </div>
      </div>
      <div class="d-flex justify-space-between mt-4">
        <div class="text-left text-title --w-regular --c-x-dark">
          {{ $t('common.checkOut') }}
        </div>
        <div class="text-title --c-x-dark text-right">
          {{ checkOutDate | jaLongDate }}
        </div>
      </div>
      <div class="d-flex justify-space-between mt-4">
        <div class="text-left text-title --w-regular --c-x-dark">
          {{ $t('common.room') }}
        </div>
        <div class="text-title --c-x-dark text-right">
          {{ roomType.name }}
        </div>
      </div>
      <div class="d-flex justify-space-between mt-4">
        <div class="text-left text-title --w-regular --c-x-dark">
          {{ $t('common.capacity') }}
        </div>
        <div class="text-title --c-x-dark text-right">
          <FacilityCapacity :roomType="roomType" />
        </div>
      </div>
    </div>

    <div class="bg-white mt-3 pa-5 --border-r-2">
      <div class="d-flex justify-space-between">
        <div class="text-title text-left pa-0 --c-x-dark vertical-child-center">
          <span>{{ stayDays }}{{ $t('booking.totalAccommodationOneNight') }}</span>
        </div>
        <div class="text-m-huge text-right --c-prm --w-bold pa-0">
          {{ point | toThousands }}<span class="text-large">{{ priceUnit }}</span>
        </div>
      </div>
      <template v-if="currentPoint.isPointBasedProduct">
        <v-divider class="--border-light-gray" />
        <v-row class="ma-0 mt-4">
          <v-col class="pa-0 text-left text-medium --c-x-dark" cols="8">
            {{ $t('common.currentPoint') }}
          </v-col>
          <v-col class="pa-0 text-right text-medium --c-prm --w-bold" cols="4">
            {{ currentPoint.remainingPoint | toThousands }}{{ priceUnit }}
          </v-col>
        </v-row>
        <v-row class="ma-0 mt-2">
          <v-col class="pa-0 text-left text-medium --c-x-dark" cols="8">
            {{ $t('common.afterBook') }}
          </v-col>
          <v-col class="pa-0 text-right text-medium --c-prm --w-bold" cols="4">
            {{ (currentPoint.remainingPoint - point) | toThousands }}{{ priceUnit }}
          </v-col>
        </v-row>
      </template>
    </div>

    <div class="mt-3 bg-white pa-4">
      <CancelPolicy
        :contractId="contractId"
        :checkInDate="checkInDate"
        :bookingPlanId="bookingPlanId"
      />
    </div>

    <div class="mt-3 bg-white pa-4">
      <OtherFeeDisclaimer :pricesByDays="pricesByDays" />
    </div>

    <p class="text-left mt-4 text-normal">{{ $t('common.allTaxInclude') }}</p>

    <v-btn
      class="text-heading mt-4 mb-12 --w-bold"
      rounded
      block
      color="primary"
      large
      @click="goToBookingInfo"
    >{{ $t('buttons.agreeAndEnterMyDetails') }}</v-btn>
    <AddWaitListModal
      :visible="noStock"
      @close="noStock = false"
      :checkInDate="checkInDate"
      :checkOutDate="checkOutDate"
      :facilityInfo="facilityInfo"
      :roomType="roomType"
    />
    <InsufficientPoint
      :visible="insufficientPoint"
      @close="insufficientPoint = false"
      :currentPoint="currentPoint"
      :point="point"
      :contractId="contractId"
    />
  </div>
</template>

<script>
import Stage from '@/components/Stage'
import searchVacancyMixin from '../searchVacancyMixin'
import FacilityCapacity from '@/components/Facility/FacilityCapacity.vue'
import CancelPolicy from '@/components/CancelPolicy/CancelPolicy.vue'
import OtherFeeDisclaimer from '@/components/Facility/OtherFeeDisclaimer.vue'
import AddWaitListModal from '@/views/Modal/AddWaitList'
import InsufficientPoint from '@/views/Modal/InsufficientPoint'

export default {
  name: 'Confirmation',
  mixins: [searchVacancyMixin],
  components: {
    InsufficientPoint,
    Stage,
    FacilityCapacity,
    CancelPolicy,
    OtherFeeDisclaimer,
    AddWaitListModal
  },
  async mounted () {
    if (!this.facilityInfo) {
      await this.$router.replace({ name: 'vacancy-search' })
      return
    }

    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        const result = await this.$store.dispatch('calculateAccommodationPrice')
        this.point = result.totalPrice
        this.pricesByDays = result.prices
        await this.$store.dispatch('loadRemainingPoints')
      })
    })
  },
  data () {
    return {
      pricesByDays: [],
      point: null,
      noStock: false,
      insufficientPoint: false
    }
  },
  computed: {
    currentPoint () {
      return this.$store.getters.remainingPointsForBooking
    }
  },
  methods: {
    async goToBookingInfo () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('createTemporaryBooking')
          await this.$router.push({ name: 'reserve-enter-information' })
        }, {
          OUT_OF_INVENTORY_STOCK: () => {
            this.noStock = true
          },
          CONTRACT_POINTS_NOT_ENOUGH: () => {
            this.insufficientPoint = true
          }
        })
      })
    }
  }
}
</script>

<template>
  <div class="form-container mb-16">
    <Stage :stage="4"/>
    <div class="text-center text-heading --w-bold --c-prm py-5">{{ $t('booking.finalConfirmation') }}</div>

    <div class="px-5">
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
      />
      <div v-for="(booking, bookingInd) in bookings" :key="bookingInd">
        <h3 v-if="bookings.length > 1" class="text-heading--c-prm mb-2">{{ $t('title.reservation') }}{{ bookingInd + 1 }}</h3>
        <div class="form-container mb-3">
          <ReservationDetailItem
            v-for="(guest, guestInd) in booking.guests"
            :key="guestInd"
            :left="guest.representative
              ? $t('reservationAndUsageHistory.accommodationRepresentative')
              : `${ $t('reservationAndUsageHistory.guest') }${ guestInd + 1 }`
            "
            :right="guest.name"
            :aClass="'text-title font-weight-bold --c-bg'"
            :divider="guestInd !== booking.guests.length - 1"
          />
          <ReservationDetailItem
            :left="$t('common.totalPeople')"
            :right="booking.guests.length + $t('common.people')"
            :aClass="'text-title font-weight-bold --c-bg'"
            :divider="true"
            :notWhiteBg="true"
          />
        </div>
        <RentalList
          v-for="(rentalGroup, rentalGroupInd) in booking.rentalItems"
          :key="rentalGroupInd"
          :index="rentalGroupInd"
          :rental="getRentalItemNames(rentalGroup)"
          :schedule="getRentalSchedule(rentalGroup)"
        />
        <Parking
          :parking="getParkingCount(booking) > 0 ? $t('common.necessary') : $t('common.unnecessary')"
          :number="getParkingCount(booking)"
        />
      </div>

      <div :class="{ 'bg-white': !notWhiteBg }">
        <div class="pa-4 rounded p-relative">
          <template v-for="(charge, ind) in charges" >
            <div :key="ind" class="d-flex justify-space-between mb-4">
              <div class="text-title --c-prm font-weight-bold">
                {{ charge.name }}
              </div>
              <div class="text-title font-weight-medium --c-bg text-right">
                {{ charge.value | toThousands }}{{ charge.unit === 'jpy' ? $t('reservationAndUsageHistory.yen') : $t('common.points') }}
              </div>
            </div>
            <template v-if="charge.details">
              <div v-for="(detail, dInd) in charge.details"
                :key="`${ind}-${dInd}`"
                class="d-flex justify-space-between"
              >
                <div class="text-normal font-weight-medium --c-bg pa-0">
                  <div class="charge-details">{{ dInd === 0 ? $t('booking.breakdown') : '' }}</div>
                  ・{{ detail.name }}
                </div>
                <div class="text-normal font-weight-medium --c-bg pa-0">{{ detail.value }}</div>
              </div>
            </template>
          </template>
          <v-divider class="bg-medium-smoke mt-4"/>
            <div class="d-flex justify-space-between mt-3">
              <div class="text-title --c-prm font-weight-bold">
                {{ $t('common.totalCharge') }}
              </div>
              <div class="text-title font-weight-medium --c-bg text-right">
                {{ chargeTotal | toThousands }}{{ $t('reservationAndUsageHistory.yen') }}
              </div>
            </div>
        </div>
      </div>
      <div class="--c-bg py-4">{{ $t('reservationAndUsageHistory.allListedPricesIncludeTax') }}</div>
      <PointBalance v-if="isTvpPaymentAllowed" :point="tvp"/>
      <!-- Reservation Details END-->

      <!--<v-checkbox
        :label="$t('booking.sameRoomOnSameBookingBeforeOrAfterDay')"
        v-model="requestSameRoom"
      ></v-checkbox>

      <div class="pb-13">
        {{ $t('booking.sameRoomAvailableText') }}
      </div>-->

      <!-- Contact START-->
      <Contact />
      <!-- Contact  END-->

      <!-- First Radio START-->
      <div class="text-title --c-prm font-weight-bold pl-1 pt-7">
        {{ $t('booking.issuanceCertificateUse') }}
        <span class="text-small col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
          {{$t('reservationAndUsageHistory.mandatory')}}
        </span>
      </div>
      <v-radio-group
        class="mt-2"
        hide-details
        v-model="requestMailCertificate"
      >
        <v-container>
          <v-row>
            <v-col class="radio-border bg-white d-flex py-2 mr-1 pr-0">
              <v-radio
                class="px-0"
                :value="false"
              >
                <template v-slot:label>
                  <div class="d-flex flex-column">
                    <h1 class="text-medium">
                      {{ $t('booking.sendingUserIdCards') }}
                    </h1>
                    <h1 class="text-medium --c-prm">
                      {{ $t('common.unnecessary') }}
                    </h1>
                  </div>
                </template>
              </v-radio>

            </v-col>
            <v-col class="radio-border bg-white d-flex py-2 mr-1 pr-0">
              <v-radio
                class="px-0"
                :value="true"
              >
                <template v-slot:label>
                  <div class="d-flex flex-column">
                    <h1 class="text-medium">
                      {{ $t('booking.sendingUserIdCards') }}
                    </h1>
                    <h1 class="text-medium --c-prm">
                      {{ $t('common.necessary') }}
                    </h1>
                  </div>
                </template>
              </v-radio>
            </v-col>
          </v-row>
        </v-container>

        <div class="border-medium-b --border-light-gray pt-7"></div>

      </v-radio-group>
      <!-- First Radio END-->

      <div class="text-title --c-prm font-weight-bold pl-1 pt-7">
        {{ $t('booking.howToPayTotalFee') }}
        <span class="text-small col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
          {{$t('reservationAndUsageHistory.mandatory')}}
        </span>
      </div>
      <!-- Second Radio START-->
      <v-radio-group
        class="mt-2"
        hide-details
        v-model="feePaymentType"
      >
        <v-container>
          <v-row>
            <v-col class="radio-border bg-white d-flex py-2 mr-1 pr-0">
              <v-radio
                class="px-0"
                value="Onsite"
              >
                <template v-slot:label>
                  <div class="d-flex flex-column">
                    <h1 class="text-medium --c-prm">
                      {{ $t('booking.onSite') }}
                    </h1>
                    <h1 class="text-medium">
                      {{ $t('booking.payment') }}
                    </h1>
                  </div>
                </template>
              </v-radio>
            </v-col>
            <v-col class="radio-border bg-white d-flex py-2 mr-1 pr-0">
              <v-radio
                class="px-0"
                value="RegisteredCC"
              >
                <template v-slot:label>
                  <div class="d-flex flex-column">
                    <h1 class="text-medium --c-prm">
                      {{ $t('booking.allOnRegisterCard') }}
                    </h1>
                    <h1 class="text-medium">
                      {{ $t('booking.payment') }}
                    </h1>
                  </div>
                </template>
              </v-radio>
            </v-col>
          </v-row>
        </v-container>
      </v-radio-group>
      <!-- Second Radio END-->

      <v-btn
        class="text-heading mt-4 mb-12 --w-bold"
        @click="confirmBookingGroup"
        :disabled="!canConfirm"
        height="57"
        rounded
        block
        color="primary"
        large
      >{{ $t('buttons.confirmBooking') }}</v-btn>
      <div>
        {{ $t('booking.ifHaveSpecRequest') }}
        <a href="#" @click.prevent="openCallCenter">
          {{ $t('booking.callCenter') }}
        </a>
        {{ $t('booking.contactUsAt') }}
      </div>
    </div>
  </div>
</template>

<script>
import Stage from '@/components/Stage'
import UsageHistoryItem from '@/components/UsageHistoryItem'
import PointBalance from '@/components/Details/PointBalance'
import Contact from '@/components/MemberItem/Contact'
import searchVacancyMixin from '../searchVacancyMixin'
import withTemporaryBookingMixin from '../withTempraryBookingMixin'
import { toThousands } from '@/filters'
import { summarizePricesByDate } from '@/utils/prices'
import RentalList from '@/components/Details/RentalList'
import Parking from '@/components/Details/Parking'
import ReservationDetailItem from '@/components/Details'
import { jaLongDateRange } from '@/utils/get-date'

export default {
  name: 'FinalConfirmation',
  mixins: [searchVacancyMixin, withTemporaryBookingMixin],
  components: {
    Stage,
    UsageHistoryItem,
    PointBalance,
    Contact,
    RentalList,
    Parking,
    ReservationDetailItem
  },
  async mounted () {
    await this.$doLoading(async () => {
      const { totalPrice, prices } = await this.$store.dispatch('calculateAccommodationPrice')
      this.totalPrice = totalPrice
      this.prices = prices
    })
  },
  data () {
    return {
      totalPrice: null,
      notWhiteBg: false,
      requestMailCertificate: false,
      requestSameRoom: false,
      feePaymentType: null
    }
  },
  computed: {
    canConfirm () {
      return !!this.feePaymentType
    },
    chargeTotal () {
      return this.charges.reduce((sum, c) => {
        if (c.unit === 'jpy') return sum + c.value
        return sum
      }, 0)
    },
    charges () {
      const accommodationFee = {
        name: this.isPointBasedProduct ? this.$t('booking.usedPoints') : this.$t('booking.usageFees'),
        value: this.totalPrice,
        unit: this.isPointBasedProduct ? 'pt' : 'jpy'
      }
      const summarized = summarizePricesByDate(this.prices)

      const { totalPrice, charges } = this.$store.getters.rentalItemSummary

      const result = [
        accommodationFee,
        ...summarized.map(charge => ({
          name: charge.subject,
          value: charge.price,
          unit: 'jpy'
        }))
      ]
      if (totalPrice) {
        result.push({
          name: this.$t('common.rentalListingTotal'),
          value: totalPrice,
          unit: 'jpy',
          details: charges.map(c => ({
            name: c.name,
            value: `${toThousands(c.price)}${this.$t('reservationAndUsageHistory.yen')}`
          }))
        })
      }

      return result
    },
    tvp () {
      return this.$store.getters.remainingTvp
    }
  },
  methods: {
    async confirmBookingGroup () {
      await this.$doLoading(async () => {
        await this.$showGqlError(() => this.$store.dispatch('confirmBookingGroup', {
          requestSameRoom: this.requestSameRoom,
          requestMailCertificate: this.requestMailCertificate,
          feePaymentType: this.feePaymentType
        }))
        await this.$router.push({ name: 'reserve-complete' })
      })
    },
    openCallCenter () {
      this.$store.commit('showCallCenterDialog')
    },
    getRentalItemNames (rentalGroup) {
      return rentalGroup.selects &&
        rentalGroup.selects.map(s => `${s.rentalItemDef.name}×${s.quantity}個`).join(', ')
    },
    getRentalSchedule (rentalGroup) {
      return jaLongDateRange(rentalGroup.fromDate, rentalGroup.toDate)
    },
    getParkingCount (booking) {
      if (typeof booking.parkings === 'number') {
        return booking.parkings
      } else {
        return booking.parkings?.length ?? 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-input__slot {
    label {
      font-size: var(--font-size__title);
      font-weight: var(--font-weight__bold) !important;
      color: var(--color__black-gray);
    }
    i {
      font-size: var(--font-size__huge);
    }
  }
  .v-input--selection-controls__input {
    background: white;
  }
}

.charge-details {
  width: 50px;
  display: inline-block;
}
</style>

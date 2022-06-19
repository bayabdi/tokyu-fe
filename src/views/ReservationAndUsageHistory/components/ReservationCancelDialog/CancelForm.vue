<template>
  <div class="px-0 pb-4">
    <div class="text-title --c-x-dark --w-bold text-left pt-3 pb-3">
      {{ $t("text.areYouSureToCancel") }}
    </div>
    <template v-if="noPenalty">
      <div v-if="totalRefundPoint">
        <div class="text-normal font-weight-bold --c-prm">{{ pointName }}</div>
        <div>
          <span class="text-title font-weight-bold --c-prm text-right">
            {{ totalRefundPoint | toThousands }}
          </span>
          <span class="text-normal font-weight-bold --c-prm text-right">
            {{ priceUnit }}
          </span>
          {{ $t("text.willBeReturnedTo") }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-normal  --c-medium-gray text-left pb-11">
        <span v-if="isPointBasedProduct">
          {{ $t("text.cancellationPolicyRefunded") }}
        </span>
        <span v-else>
          {{ $t("text.inAccordanceCancellation") }}
        </span>
      </div>

      <!--Total cancellation fee START-->
      <div class="d-flex justify-space-between align-center --c-prm">
        <div class="text-normal font-weight-bold --c-prm text-left  pt-3 pb-3">
          <span v-if="isPointBasedProduct">
            {{ $t("text.totalCancellation") }}
            <br />
            {{ pointName }}
          </span>
          <span v-else>{{ $t("text.totalCancellationFee") }}</span>
        </div>
        <div>
          <span class="text-title font-weight-bold --c-prm text-right">
            {{ totalPenalty | toThousands }}
          </span>
          <span class="text-normal font-weight-bold --c-prm text-right">
            {{ priceUnit }}
          </span>
        </div>
      </div>
      <v-divider></v-divider>
      <!--Total cancellation fee END-->

      <v-divider class="pt-1"></v-divider>

      <!--Breakdown of cancellation fee START-->

      <div
        class="text-normal --c-bg text-left font-weight-bold pt-7 pl-1 pb-5"
      >
        {{ $t("text.cancellationFeeBreakdown") }}
      </div>
      <v-container v-for="(day, ind) in penaltiesSorted" :key="ind" class="mb-6">
        <v-row>
          <div style="border-top: 1px solid #707070;width: 100%;"></div>
        </v-row>
        <v-row>
          <v-col class="--c-bg text-left px-0">
            {{ $t("common.reservationTime") }}
          </v-col>
          <v-col class="font-weight-bold --c-prm pl-0">
            {{ day.stayDate | jaLongDateSlash }}
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col class="--c-bg text-left px-0 col-7">
            {{ $t("common.cancellationPolicy") }}
          </v-col>
          <v-col class="text-left font-weight-bold col-5 --c-prm px-0">
            {{ day.penaltyRate | percent }}
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col class="--c-bg text-left pl-0 col-7">
            <span v-if="isPointBasedProduct">
              {{ $t("text.cancellationCharge") }}
            </span>
          </v-col>
          <v-col class="text-left col-5 font-weight-bold --c-prm pl-0">
            {{ getCacelPenalty(day) }}{{ priceUnitShort }}
          </v-col>
        </v-row>
        <v-row>
          <div style="border-top: 1px solid #707070;opacity: 1;width: 100%;"></div>
        </v-row>
      </v-container>

      <!--Breakdown of cancellation fee END-->

      <!--Total cancellation fee START-->
      <div class="d-flex justify-space-between align-center --c-prm">
        <div class="text-normal font-weight-bold --c-prm text-left  pt-3 pb-3">
          <span v-if="isPointBasedProduct"
          >{{ $t("text.totalCancellation") }}<br />{{ pointName }}</span
          >
          <span v-else>{{ $t("text.totalCancellationFee") }}</span>
        </div>
        <div class="">
          <span class="text-title font-weight-bold --c-prm text-right">
            {{ totalPenalty | toThousands }}
          </span>
          <span class="text-normal font-weight-bold --c-prm text-right">
            {{ priceUnit }}
          </span>
        </div>
      </div>
      <v-divider></v-divider>
      <!--Total cancellation fee END-->

      <template v-if="isPointBasedProduct">
        <div
          v-for="(refund, ind) in refunds"
          :key="`refund-${ind}`"
          class="d-flex justify-space-between align-center --c-prm"
        >
          <div class="text-normal text-left font-weight-bold --c-prm pt-3 pb-3">
            {{ $t("common.return") }}{{ refund.year }}{{ $t("common.fisYear") }}
            <br />
            {{ pointName }}
          </div>
          <div class="text-right">
            <span class="text-title font-weight-bold">{{ refund.amount }}</span>
            <span class="text-x-small font-weight-bold">{{ $t("unit.point") }}</span>
          </div>
        </div>
        <v-divider></v-divider>
      </template>
      <template v-else-if="canUseTvp">
        <div>
          <!--Use Vacations Points for payment START-->
          <v-container>
            <v-row>
              <v-col class="--c-prm col-1 pa-0 text-left">
                <v-checkbox v-model="useTvp"> </v-checkbox>
              </v-col>
              <v-col class="d-flex flex-column justify-center col-11">
                <div class="--c-gg text-left">
                  {{ $t("text.useVacationPointForPayment") }}
                </div>
              </v-col>
            </v-row>
          </v-container>
          <!--Use Vacations Points for payment END-->

          <!--Number of points used START-->
          <div class="--c-gg text-left pt-5 pb-2">
            {{ $t("text.numberOfPointsUsed") }}
          </div>
          <v-container>
            <v-row>
              <v-col class="--c-prm  pa-0 py-0 text-left">
                <v-text-field
                  class="mt-0 "
                  solo
                  hide-details="true"
                  :disabled="!useTvp"
                  type="number"
                  :min="0"
                  :max="remainingTvp"
                  v-model="useTvpAmount"
                >
                </v-text-field>
              </v-col>
              <v-col class="text-regular d-flex flex-column justify-end pa-0 pb-1">
                <div class="--c-gg pl-3 text-left">{{ $t("unit.point") }}</div>
              </v-col>
            </v-row>
          </v-container>
          <div class="--c-prm font-weight-bold text-left pt-2 pb-2">
            ({{ $t("common.numberOfPointHeld") }}:{{ remainingTvp | toThousands }}pt)
          </div>
          <!--Number of points used END-->
        </div>
      </template>
    </template>

    <!--Enter your login password START-->
    <div class="--c-bg text-left f-w-100 pt-7 pl-1 pb-2">
      {{ $t("common.pleaseEnterYourLoginPassword") }}
    </div>

    <v-text-field
      class="mt-0 mb-6"
      solo
      hide-details="true"
      v-model="password"
      type="password"
    >
    </v-text-field>
    <!--Enter your login password END-->

    <v-btn
      :disabled="!ready"
      rounded
      height="57"
      width="262"
      class="bg-primary --c-white text-medium font-weight-bold mb-3"
      @click="confirm"
    >
      {{ $t("menu.main.items.cancelReservation") }}
    </v-btn>
    <v-btn
      rounded
      height="57"
      width="262"
      class="bg-silver --c-prm text-medium font-weight-bold mb-3"
      @click="$listeners.back"
    >
      {{ $t("reservationAndUsageHistory.return") }}
    </v-btn>
  </div>
</template>

<script>
import { isPointBasedProduct } from '@/constants/product'
import { selectedBookingComputed } from '../../selectedBookingMixin'

export default {
  mixins: [selectedBookingComputed],
  props: {
    cancelStayDates: {
      type: Array,
      required: true
    }
  },
  async mounted () {
    await this.calculate()
    await this.$doLoading(async () => {
      await this.$store.dispatch('loadRemainingPoints')
    })
  },
  data () {
    return {
      useTvp: false,
      useTvpAmount: null,
      password: null,
      penalties: [],
      contractPoints: []
    }
  },
  computed: {
    noPenalty () {
      return this.totalPenalty === 0
    },
    totalRefundPoint () {
      return this.refunds.reduce((sum, refund) => sum + refund.amount, 0)
    },
    totalPenalty () {
      return this.penalties.reduce((sum, p) => sum + this.getCacelPenalty(p), 0)
    },
    refunds () {
      const refundByDate = this.penaltiesSorted.map(penalty => {
        return {
          stayDate: penalty.stayDate,
          amount: (
            (penalty.spPoint ?? 0) - (penalty.penaltySpPoint ?? 0) +
            (penalty.fpPoint ?? 0) - (penalty.penaltyFpPoint ?? 0)
          )
        }
      })
      const refundByYear = {}
      refundByDate.forEach(refund => {
        const contractPoint = this.contractPoints
          .find(cp => cp.validFrom <= refund.stayDate && cp.validTo >= refund.stayDate)
        let baseDate
        if (contractPoint) {
          baseDate = contractPoint.validFrom
        } else {
          baseDate = refund.stayDate
        }
        const year = new Date(baseDate).getFullYear()
        if (!refundByYear[year]) {
          refundByYear[year] = { contractPoint, amount: 0 }
        }
        refundByYear[year].amount += refund.amount
      })
      return Object.keys(refundByYear).sort().map(year => {
        return {
          year,
          amount: refundByYear[year].amount
        }
      })
    },
    remainingTvp () {
      return this.$store.getters.remainingTvp
    },
    penaltiesSorted () {
      return this.penalties.slice().sort((a, b) => a.stayDate.localeCompare(b.stayDate))
    },
    ready () {
      return !!this.password && !!this.penalties?.length
    }
  },
  watch: {
    useTvp (val) {
      if (!val) {
        // reset the input of the amount
        this.useTvpAmount = null
      }
    },
    cancelStayDates: {
      async handler () {
        await this.calculate()
      }
    },
    contract: {
      immediate: true,
      async handler (contract) {
        this.contractPoints = []
        if (contract?.id) {
          if (isPointBasedProduct(contract.productTypeId)) {
            await this.$doLoading(async () => {
              this.contractPoints = await this.$store.dispatch('getContractPointSummary', {
                contractId: contract.id
              })
            })
          }
        }
      }
    }
  },
  methods: {
    async calculate () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          const res = await this.$store.dispatch('calculateCancelPenalty', {
            bookingId: this.booking.id,
            cancelDates: this.cancelStayDates
          })
          this.penalties = res.penalties
        })
      })
    },
    getCacelPenalty (day) {
      return (
        (day.penaltyPrice ?? 0) +
        (day.penaltySpPoint ?? 0) +
        (day.penaltyFpPoint ?? 0) +
        (day.penaltyTvpPoint ?? 0)
      )
    },
    async confirm () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('cancelBooking', {
            bookingId: this.booking.id,
            cancelDates: this.cancelStayDates,
            password: this.password,
            useTvp: this.useTvpAmount ? Number(this.useTvpAmount) : null
          })
        })
      })
      this.$emit('complete', {
        totalRefundPoint: this.totalRefundPoint
      })
    }
  }
}
</script>

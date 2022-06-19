<template>
  <div>
    <v-overlay absolute :value="loading" />
    <div class="text-title text-center --w-bold --c-prm">
      {{ $t("common.cancellationPolicy") }}
    </div>
    <div class="d-flex mt-4 justify-space-around">
      <template v-for="(threshold, i) in thresholds">
        <div class="text-center" :key="`day-${i}`">
          <div class="text-small --c-x-dark">{{ threshold.day }}{{ $t('common.dayBefore') }}</div>
          <div class="text-small --c-x-dark">{{ threshold.penalty | percent }}</div>
        </div>
        <v-divider
          v-if="thresholds.length !== i + 1"
          vertical
          class="--border-light-gray mx-2"
          :key="`divider-${i}`"
        />
      </template>
    </div>
    <p class="py-4">{{ policyDescription }}</p>
    <p v-if="willHaveCancelPenalty" class="--c-red --w-bold">
      {{ $t("text.reservationConfirm.cancellationPolicyWarm") }}
    </p>
  </div>
</template>

<script>
import {
  getBookingCancelPolicy,
  getCancelPolicyBeforeBook
} from '@/api/booking'
import { percent } from '@/filters'

export default {
  name: 'CancelPolicy',
  props: {
    bookingId: {
      type: Number,
      required: false
    },
    code: {
      type: String,
      required: false
    },
    contractId: {
      type: Number,
      required: false
    },
    checkInDate: {
      type: String,
      required: false
    },
    checkOutDate: {
      type: String,
      required: false
    },
    bookingPlanId: {
      type: Number,
      required: false
    }
  },
  async mounted () {
    await this.load()
  },
  watch: {
    checkInDate () {
      this.load()
    },
    checkOutDate () {
      this.load()
    },
    bookingPlanId () {
      this.load()
    },
    contractId () {
      this.load()
    },
    bookingId () {
      this.load()
    }
  },
  data () {
    return {
      cancelPolicy: null,
      loading: false
    }
  },
  computed: {
    thresholds () {
      if (!this.cancelPolicy) return []
      const thresholds = this.cancelPolicy.thresholds.slice()
      thresholds.sort((a, b) => b.day - a.day)

      return thresholds
    },
    willHaveCancelPenalty () {
      if (!this.cancelPolicy) return false
      return this.cancelPolicy.appliedToday > 0
    },
    theEarliestPenaltyDays () {
      return this.thresholds[0]?.day
    },
    policyDescription () {
      if (!this.cancelPolicy) return ''
      let anyPenalty = false
      let str = ''
      if (typeof this.theEarliestPenaltyDays === 'number') {
        str = `${this.theEarliestPenaltyDays + 1}${this.$t('booking.cancellationUpToSecondDayFreeOfCharge')}`
        anyPenalty = true
      }
      str += this.thresholds
        .map(th => `${th.day}${this.$t('common.dayBefore')}${percent(th.penalty)}`)
        .join(' ')
      if (this.cancelPolicy.day0Penalty) {
        str += ` ${this.$t('common.onDay')}${percent(this.cancelPolicy.day0Penalty)}`
        anyPenalty = true
      }
      if (this.cancelPolicy.noShowPenalty) {
        anyPenalty = true
        str += ` ${this.$t('common.noContact')}${percent(this.cancelPolicy.noShowPenalty)}`
      }

      if (anyPenalty) {
        str += this.$t('booking.cancellationFeeWillBeChargedAsFollows')
      } else {
        str = this.$t('booking.noCancellationFee')
      }
      return str
    }
  },
  methods: {
    async load () {
      this.loading = true
      try {
        await this.$showGqlError(async () => {
          if (this.bookingId) {
            this.cancelPolicy = await getBookingCancelPolicy(
              this.bookingId,
              this.code
            )
          } else {
            this.cancelPolicy = await getCancelPolicyBeforeBook(
              this.contractId,
              this.checkInDate,
              this.bookingPlanId
            )
          }
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

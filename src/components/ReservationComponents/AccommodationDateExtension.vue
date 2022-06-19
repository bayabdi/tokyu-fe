<template>
  <div>
    <div class="bg-white guest-form">
      <div class="bg-primary guest-form-header">
        <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
          {{ $t("reservationAndUsageHistory.changeReservationDetails") }}
        </div>
      </div>
      <div class="px-4 mb-4">
        <div class="text-medium text-center  --c-bg text-left pt-3 pb-8">
          {{ $t("reservationAndUsageHistory.accommodationDateExtensionTitle") }}
        </div>
        <v-container class="pb-6">
          <v-row>
            <v-col>
              <v-select
                solo
                outlined
                hide-details="true"
                v-model="daysToExtend"
                :items="extendDaysSelectItems"
              >
              </v-select>
            </v-col>
            <v-col class="text-heading text-left d-flex flex-column justify-end font-weight-bold --c-prm text-left pt-3 pb-3">
              {{ $t("reservationAndUsageHistory.extendTheDay") }}
            </v-col >
          </v-row>
        </v-container>

        <div class="text-center text-medium --c-pink ">
          {{ $t("reservationAndUsageHistory.additionalChargesAdditionalPointsDueToAdditionalDays") }}
        </div>

        <div class="text-center --c-prm pb-6" v-if="typeof additionalFee === 'number'">
          <span class="text-max font-weight-bold">{{ additionalFee }}</span>
          <span class="text-medium">{{ priceUnit }}</span>
        </div>

        <v-divider class="pb-4"></v-divider>

        <div class="d-flex justify-space-between align-center pb-4">
          <div class="--c-medium-gray">
            <span class="text-title font-weight-bold">{{ $t('reservationAndUsageHistory.totalFee') }}</span>
          </div>
          <div>
            <div class="text-right --c-prm" v-if="totalFeeAfterExtend.point">
              <span class="text-huge font-weight-bold">{{ totalFeeAfterExtend.point | toThousands }}</span>
              <span class="text-medium">ポイント</span>
            </div>
            <div class="text-right --c-prm" v-if="totalFeeAfterExtend.jpy">
              <span class="text-huge font-weight-bold">{{ totalFeeAfterExtend.jpy | toThousands }}</span>
              <span class="text-medium">円</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-medium pb-9">{{ $t('reservationAndUsageHistory.allListedPricesIncludeTax') }}</div>
    <v-btn
      rounded
      block
      height="66"
      @click="confirm"
      :disabled="!canSave"
      class="text-title bg-primary --c-white mb-3"
    >
      {{ $t('reservationAndUsageHistory.save') }}
    </v-btn>

    <confirmation-of-additional-days
      reason="日数追加による"
      :visible="confirmDaysModal"
      :additionalFee="additionalFee"
      :priceUnit="priceUnit"
      @close="confirmDaysModal = false"
      @confirm="extendBooking"
    />
  </div>
</template>

<script>
import { selectedBookingComputed } from '@/views/ReservationAndUsageHistory/selectedBookingMixin'
import { addDays } from '@/utils/get-date'
import ConfirmationOfAdditionalDays from '@/views/ReservationAndUsageHistory/components/ConfirmationOfAdditionalDays.vue'

export default {
  name: 'AccommodationDateExtension',
  mixins: [selectedBookingComputed],
  components: { ConfirmationOfAdditionalDays },
  props: {
    btn: {
      Boolean
    }
  },
  watch: {
    daysToExtend: {
      async handler () {
        await this.recalulate()
      }
    }
  },
  data () {
    return {
      daysToExtend: null,
      calculating: false,
      confirmDaysModal: false,
      calculatedResult: null
    }
  },
  computed: {
    maxExtendDays () {
      return 10
    },
    canSave () {
      return this.daysToExtend && !this.calculating
    },
    days () {
      const fromDate = this.booking.checkOutDate
      const toExtend = []
      for (let i = 0; i < this.daysToExtend; i++) {
        toExtend.push(addDays(fromDate, i))
      }

      return toExtend
    },
    totalAdditional () {
      return this.calculatedResult?.totalAdditional
    },
    additionalFee () {
      const total = this.calculatedResult?.totalAdditional
      if (!total) return

      return (
        (total.accommodationPrice ?? 0) +
        (total.accommodationPriceSp ?? 0) +
        (total.accommodationPriceFp ?? 0)
      )
    },
    totalFeeAfterExtend () {
      if (!this.currentAccommodationFee) { return {} }
      return {
        point: (this.isPointBasedProduct ? this.additionalFee ?? 0 : 0) + this.currentAccommodationFee.sp + this.currentAccommodationFee.fp,
        jpy: (this.isPointBasedProduct ? 0 : this.additionalFee ?? 0) + this.currentAccommodationFee.jpy
      }
    },
    extendDaysSelectItems () {
      return [...Array(this.maxExtendDays)].map((_, ind) => ind + 1)
    }
  },
  methods: {
    confirm () {
      this.confirmDaysModal = true
    },
    async extendBooking ({ password }) {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('extendBooking', {
            id: this.id, days: this.days, password
          })
          this.confirmDaysModal = false
          this.completeChange()
        })
      })
    },
    async recalulate () {
      if (this.daysToExtend) {
        this.calculating = true

        await this.$doLoading(async () => {
          await this.$showGqlError(async () => {
            this.calculatedResult = await this.$store.dispatch('calculateExtendFee', {
              id: this.id, days: this.days
            })
          })
        })
        this.calculating = false
      }
    }
  }
}
</script>

<style scoped>
.guest-form{
}
.guest-form-header{
  height: 55px;
}
</style>

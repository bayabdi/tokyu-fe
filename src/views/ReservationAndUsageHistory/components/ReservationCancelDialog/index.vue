<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="px-5 pb-4">
      <AskDays
        v-if="needsToAskDays"
        :maxDays="maxCancelDays"
        @back="close"
        @confirm="setDaysToCancel"
      />
      <CancelForm
        v-else
        :cancelStayDates="cancelStayDates"
        @back="closeOrSelectDays"
        @complete="complete"
      />
      <ReturnTopPage :visible="completed">
        <div
          class="text-medium --c-medium-gray px-5 text-left font-weight-bold pt-3 pb-3"
        >
          {{ $t('text.canceledMyReservation') }}
        </div>

        <v-container class="text-left pl-8 py-6" v-if="totalRefundPoint">
          <v-row>
            <v-col class="text-heading font-weight-bold --c-prm px-0 py-0">
              {{ pointName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="--c-prm  pa-0 py-0">
              <div class="text-huge  d-flex ">
                <span class="font-weight-bold">
                  {{ totalRefundPoint | toThousads }}
                </span>
                <div
                  class="text-medium font-weight-normal d-flex flex-column justify-end pa-auto pb-1"
                >
                  {{ $t('unit.point') }}
                </div>
              </div>
            </v-col>
            <v-col class="text-regular d-flex flex-column justify-end pa-0 pb-1">
              <div class="text-medium font-weight-bold --c-medium-gray">
                {{ $t('text.hasBeenReturned') }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </ReturnTopPage>
    </div>
  </CommonModal>
</template>

<script>
import CommonModal from '@/views/Modal/Common'
import { getStayDateRangeArray } from '@/utils/get-date'
import { selectedBookingComputed } from '../../selectedBookingMixin'
import AskDays from './AskDays'
import CancelForm from './CancelForm'
import ReturnTopPage from '../ReturnTopPage.vue'

export default {
  components: { AskDays, CancelForm, ReturnTopPage, CommonModal },
  mixins: [selectedBookingComputed],
  name: 'ReservationCancellation1',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    allCancel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      daysToCancel: null,
      completed: false,
      totalRefundPoint: null
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    },
    maxCancelDays () {
      return this.stayDates.length
    },
    stayDates () {
      return getStayDateRangeArray(this.booking.checkInDate, this.booking.checkOutDate).reverse()
    },
    cancelStayDates () {
      if (this.allCancel) {
        return this.stayDates
      } else if (this.daysToCancel) {
        return this.stayDates.slice(0, this.daysToCancel)
      }
      return null
    },
    needsToAskDays () {
      return !this.allCancel && !this.daysToCancel
    }
  },
  methods: {
    close () {
      this.daysToCancel = null
      this.$emit('close')
    },
    setDaysToCancel ({ numberOfDays }) {
      this.daysToCancel = numberOfDays
    },
    closeOrSelectDays () {
      if (this.allCancel) this.close()
      else {
        this.daysToCancel = null
      }
    },
    complete ({ totalRefundPoint }) {
      this.totalRefundPoint = totalRefundPoint
      this.completed = true
    }
  }
}
</script>

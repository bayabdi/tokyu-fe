<template>
  <div v-if="booking">
    <Breadcrumbs>
      <router-link to="/home/usage-history">
        {{ $t("reservationAndUsageHistory.reservationAndUsageHistory") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-15 pt-5">
      <UsageHistoryItem
        :id="booking.id"
        :urlImg="facility.mainImageUrl"
        :title="facility.name"
        :checkInDate="booking.checkInDate"
        :checkOutDate="booking.checkOutDate"
        :roomTypeName="booking.room.roomType.name"
        isActive
        :cancelledAt="cancelledAt"
      />

      <GuestCard
        v-for="(guest, index) in booking.guests"
        :key="guest.id"
        :index="index + 1"
        :guestName="guest.name"
        :schedule="getSchedule(guest)"
      />

      <RentalList
        v-for="(itemGroup, ind) in getRentalItemGroups(booking.rentalItems)"
        :key="`rental-${ind}`"
        :index="ind"
        :rental="itemGroup.list"
        :schedule="itemGroup.schedule"
      />
      <Parking :number="parkingCount" />
      <Details
        :left="$t('common.optionalCleaning')"
        :right="hasOptionalCleaningFee ? $t('common.yes') : $t('common.no')"
        :aClass="'font-weight-bold text-right --c-medium-gray'"
      />

      <template v-if="this.forStayConfirmation">
        <div class="text-center text-medium --w-bold mt-5 --c-prm">
          {{ $t('text.ifNoChanges') }}
          <br />
          {{ $t('text.pressThisButton') }}
        </div>
        <v-btn
          rounded
          block
          height="66"
          @click="confirmStay"
          class="text-medium --c-white my-5"
          color="#008FE1"
        >
          {{ $t('text.completeUsageConfir') }}
        </v-btn>
        <div class="text-center">
          <a
            class="real-anchor text-medium"
            :href="facility.facilityHpUrl"
            target="_blank"
          >
            {{ $t('text.openFacInfo') }}
          </a>
        </div>

        <div
          class="text-center text-medium --w-bold --c-prm mt-6 pt-4"
          v-if="btns.length"
        >
          {{ $t('text.wishChangeOptions') }}
        </div>
      </template>

      <v-btn
        rounded
        block
        text
        height="66"
        style="display:block"
        v-for="(btn, ind) in btns"
        :key="`btn-${ind}`"
        @click="btn.click"
        class="text-medium --c-white mt-3 mb-3"
        :class="btn.BgColor || 'bg-primary'"
      >
        {{ btn.text }}<br />
        <span class="text-normal">{{ btn.description }}</span>
      </v-btn>
    </div>
    <ReservationCancelDialog
      :visible="cancelDialog"
      :allCancel="allCancel"
      @close="cancelDialog = false"
    />
    <ReturnTopPage :visible="stayConfirmed" @close="stayConfirmed = false">
      <div class="pl-13 pb-10 text-title text-left --c-bg font-weight-bold">
        {{ $t('text.confirmationOfUse') }}
      </div>
    </ReturnTopPage>
  </div>
</template>

<script>
import ReservationCancelDialog from './../components/ReservationCancelDialog'
import Breadcrumbs from '@/components/Breadcrumbs'
import UsageHistoryItem from '@/components/UsageHistoryItem'
import Details from '@/components/Details'
import GuestCard from '@/components/Details/GuestCard'
import RentalList from '@/components/Details/RentalList'
import Parking from '@/components/Details/Parking'
import {
  addDays,
  jaLongDateRange
} from '@/utils/get-date'
import ReturnTopPage from '../components/ReturnTopPage.vue'
import selectedBookingMixin from '../selectedBookingMixin'

export default {
  name: 'ReservationDetails',
  mixins: [selectedBookingMixin],
  components: {
    Breadcrumbs,
    ReservationCancelDialog,
    Details,
    RentalList,
    UsageHistoryItem,
    GuestCard,
    Parking,
    ReturnTopPage
  },
  props: {
    forStayConfirmation: Boolean
  },
  methods: {
    handleClick (link, modal) {
      if (link) {
        this.$router.push(link)
      } else {
        if (modal === 1) {
          this.reservationCancellation.first = true
        }
        if (modal === 2) {
          this.reservationCancellation.cash = true
        }
      }
    },
    getSchedule (guest) {
      const {
        stayDateRange
      } = guest
      if (!stayDateRange) return this.$t('common.noOvernightStay')
      return jaLongDateRange(stayDateRange.fromDate, addDays(stayDateRange.toDate, 1))
    },
    getRentalItemGroups (rentalItems) {
      const dateToItems = {}
      rentalItems.forEach((rentalItem) => {
        const {
          fromDate,
          toDate,
          quantity,
          rentalItem: {
            rentalItemDef: {
              name
            }
          }
        } = rentalItem
        const key = `${fromDate}-${toDate}`

        if (!dateToItems[key]) {
          dateToItems[key] = {
            fromDate,
            toDate,
            items: []
          }
        }
        dateToItems[key].items.push({
          name,
          quantity
        })
      })

      return Object.values(dateToItems).map(group => {
        return {
          list: group.items.map(item => `${item.name}×${item.quantity}${this.$t('common.individual')}`).join(', '),
          schedule: jaLongDateRange(group.fromDate, group.toDate)
        }
      })
    },
    async confirmStay () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('confirmStay', {
            id: this.id
          })
        })
        this.stayConfirmed = true
      })
    }
  },
  data () {
    return {
      active: true,
      stayConfirmed: false,
      cancelDialog: false,
      allCancel: false
    }
  },
  computed: {
    btns () {
      const buttons = []
      if (this.canModify) {
        if (!this.forStayConfirmation) {
          buttons.push({
            text: this.$t('buttons.preCheckIn'),
            BgColor: 'bg-red',
            click: () => {
              this.$router.push({
                name: 'pre-check-in',
                params: {
                  id: this.id
                }
              })
            }
          })
          buttons.push({
            text: this.$t('buttons.openFacilityInformation'),
            disabled: !this.facility?.facilityHpUrl,
            click: () => {
              window.open(this.facility?.facilityHpUrl)
            }
          })
        }
        buttons.push({
          text: this.$t('menu.main.items.reservationChange'),
          click: () => {
            this.$router.push({
              name: 'reservation-change',
              params: {
                id: this.id
              }
            })
          }
        })
        buttons.push({
          text: this.$t('buttons.cancelAllReservations'),
          click: () => {
            this.allCancel = true
            this.cancelDialog = true
          }
        })
        buttons.push({
          text: this.$t('buttons.partialScheduleCancellation'),
          description: this.$t('text.cancelLastDay'),
          click: () => {
            this.allCancel = false
            this.cancelDialog = true
          }
        })
      }
      this.booking?.finalizedInvoices.forEach((invoice, ind) => {
        buttons.push({
          text: this.$t('common.receipt') + (ind + 1) + this.$t('common.show'),
          click: () => {
            window.open(invoice.pdfFileUrl)
          }
        })
      })

      return buttons
    }
  }
}
</script>

<style>
.v-btn__content {
  display: block;
}

.v-btn__content > span {
  font-weight: 100;
  font-size: 15px;
}
</style>

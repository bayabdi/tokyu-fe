<template>
  <div class="form pb-15 pt-5">
    <div v-if="error">{{ $t('text.errorWhileLoading') }}</div>
    <template v-else>
      <UsageHistoryItem
        :id="booking.id"
        :urlImg="facility.mainImageUrl"
        :title="facility.name"
        :checkInDate="booking.checkInDate"
        :checkOutDate="booking.checkOutDate"
        :roomTypeName="booking.room.roomType.name"
        isActive
      />
      <div class="text-medium --c-prm text-center font-weight-bold pb-3"> {{ $t('text.advanceCheckInInfo') }} </div>
      <v-form ref="form">
        <div
          v-for="(guest, ind) in booking.guests"
          :key="guest.id">
          <GuestInfoInput
            class="mb-7"
            preCheckIn
            nameFixed
            topLevel
            :guest="guest"
            :representative="guest.representative"
            :index="ind + 1"
            @change="(newGuest) => guestChange(ind, newGuest)"
            :bookingId="id"
            :bookingCode="code"
          />
        </div>
        <div class="ma-3 mt-6">
          <v-btn
            rounded
            block
            height="66"
            @click="save"
            class="text-medium --c-white"
            color="primary"
          >
            {{ $t('buttons.save') }}
          </v-btn>
        </div>
      </v-form>
    </template>
  </div>
</template>

<script>
import UsageHistoryItem from '@/components/UsageHistoryItem'
import GuestInfoInput from '@/components/ReservationComponents/GuestInfoInput.vue'
export default {
  name: 'PreChekInInformation',
  components: {
    UsageHistoryItem,
    GuestInfoInput
  },
  data () {
    return {
      error: false
    }
  },
  async mounted () {
    await this.$doLoading(async () => {
      try {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('loadBookingDetail', {
            id: this.id,
            code: this.code
          })
        })
      } catch (e) {
        this.error = true
      }
    })
  },
  computed: {
    id () {
      if (this.$route.params.id) return Number(this.$route.params.id)
      if (this.$route.query.id) return Number(this.$route.query.id)
      return null
    },
    code () {
      return this.$route.query.code
    },
    booking () {
      return this.$store.getters.selectedBooking
    },
    facility () {
      return this.booking?.room.roomType.facilty ?? {}
    }
  },
  methods: {
    guestChange (ind, guest) {
      this.$store.commit('updateGuestOfSelectedBooking', {
        ind, guest
      })
    },
    async save () {
      if (this.$refs.form.validate()) {
        await this.$doLoading(async () => {
          await this.$showGqlError(async () => {
            await this.$store.dispatch('preCheckIn', {
              id: this.id,
              code: this.code,
              guests: this.booking.guests
            })
          })
          this.$toast.success(this.$t('text.preCheckSave'))
        })
      }
    },
    getIndexOf (current, index) {
      return this.booking.guests
        .filter((g, ind) =>
          ind < index &&
          g.child === current.child &&
          g.bedShared === current.bedShared
        ).length + 1
    }
  }
}
</script>

<style>
  .v-btn__content {
    display: block;
  }
  .v-btn__content > span{
    font-weight: 100;
    font-size: 15px;
  }
</style>

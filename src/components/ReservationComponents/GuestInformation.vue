<template>
  <div>
    <div class="bg-white guest-form">
      <div class="bg-primary guest-form-header">
        <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
          {{ $t("reservationAndUsageHistory.changeReservationDetails") }}
        </div>
      </div>
      <div class="px-4 mb-4">
        <div class="text-medium text-center --c-bg text-left pt-3 pb-8" v-if="!notChange">
          {{ $t("reservationAndUsageHistory.pleaseEnterTheChangeInTheDesiredItem") }}
        </div>
        <div
          class="text-title --c-prm font-weight-bold px-1 pt-4"
          v-if="notChange">
          {{ $t('common.nGuest') }}
          <!--{{this.$t('reservationAndUsageHistory.adult')}}-->
        </div>

        <div class="px-5">

          <!-- When booking changes START-->
          <v-container class="text-title" v-if="!notChange">
            <v-row class="pt-0">
              <v-col class="--c-prm font-weight-bold pb-0">
                {{ $t('reservationAndUsageHistory.adult') }}
              </v-col>
            </v-row>
            <v-row >
              <v-col class="pt-2 col-5">
                <v-select
                  class="select-align-center"
                  solo
                  hide-details
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  v-model="adultsCount"
                >
                </v-select>
              </v-col>
              <v-col class="text-title --c-medium-gray pt-2 pl-0 d-flex font-weight-medium flex-column justify-end">
                {{ $t('reservationAndUsageHistory.name') }}
              </v-col>
            </v-row>
            <v-row class="pt-0">
              <v-col class="--c-prm font-weight-bold pb-0">
                {{ $t('reservationAndUsageHistory.child') }}
              </v-col>
            </v-row>
            <v-row class="pt-0 --c-medium-gray font-weight-medium">
              <v-col class="pb-0">
                {{ $t('reservationAndUsageHistory.noBedSharing') }}
              </v-col>
              <v-col class="pb-0">
                {{ $t('reservationAndUsageHistory.thereIsCoSleeping') }}
              </v-col>
            </v-row>
            <v-row class="font-weight-medium">
              <v-col class="pt-2 col-5">
                <v-select
                  class="select-align-center"
                  solo
                  hide-details
                  :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  v-model="childrenCount"
                >
                </v-select>
              </v-col>
              <v-col class="--c-medium-gray pt-2 pl-0 d-flex col-1 flex-column justify-end">
                {{ $t('reservationAndUsageHistory.name') }}
              </v-col>
              <v-col class="pt-2 col-5">
                <v-select
                  class="select-align-center"
                  solo
                  hide-details
                  :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  v-model="bedShareCount"
                >
                </v-select>
              </v-col>
              <v-col class="--c-medium-gray pt-2 pl-0 d-flex col-1  flex-column justify-end">
                {{ $t('reservationAndUsageHistory.name') }}
              </v-col>
            </v-row>
          </v-container>
          <!-- When booking changes END -->

          <!--When entering booking information START-->
          <div class="--c-bg text-title" v-if="notChange">
            <v-container >
              <v-row>
                <v-col class="col-2 pa-0 my-2 vertical-space-between">
                  <div class="font-weight-bold">{{ $t('common.adult') }}</div>
                  <div class="mr-0 ml-auto">
                    <div class="ml-0 mr-auto">
                      <div>
                        <span class="text-max font-weight-regular">{{ adultsCount }}</span>
                        <span>{{ $t('common.firstName') }}</span>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-divider class="--border-prm my-4 mx-6" vertical></v-divider>
                <v-col class="text-center py-0 my-2">
                  <div class="font-weight-bold">{{ $t('common.children') }}</div>
                  <div class="d-flex">
                    <div class="ml-0 mr-auto">
                      <span class="text-normal">{{ $t('common.sleepTogether') }}</span>
                      <div>
                        <span class="text-max font-weight-regular">{{ childrenCount }}</span>
                        <span>{{ $t('common.firstName') }}</span>
                      </div>
                    </div>
                    <div class="ml-0 mr-auto">
                      <span class="text-normal">{{ $t('common.noSleepTogether') }}</span>
                      <div>
                        <span class="text-max font-weight-regular">{{ bedShareCount }}</span>
                        <span>{{ $t('common.firstName') }}</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
             </v-container>
          </div>
          <!--When entering booking information END -->

        </div>

        <div class="border-bold --border-prm px-7 mt-3" v-if="facility && facility.facilityHpUrl">
          <div class="text-normal text-center pt-5 pb-3 --c-prm">
            {{ $t('reservationAndUsageHistory.aboutCheckIn') }}
          </div>
          <div class="text-normal pb-4 --c-gg">
            {{ $t('booking.checkFacilityInfoDescription') }}
          </div>
          <div class="text-normal pb-3 --c-bg">
            <a :href="facility.facilityHpUrl" target="_blank">{{ $t('booking.facilityInfoPage') }}<IconOpen/></a>
          </div>
        </div>

        <div>
          <div id="anchor" />
          <GuestInfoInput
            v-for="(guest, index) in value"
            :key="index"
            :preCheckIn="preCheckIn"
            :guest="guest"
            @change="(newGuest) => changeGuest(index, newGuest)"
            :representative="guest.representative"
            :index="getIndexOf(guest, index)"
          />
        </div>
        <div class="text-center pa-4">
          <v-btn
            @click="togglePreCheckIn"
            rounded
            height="50"
            outlined
            class="bg-white --border-dark-smoke"
          >
            <span>{{ preCheckInLabel }}</span>
            <v-icon
              right
              class="--c-prm text-large"
            >
              {{ preCheckIn ? 'mdi-menu-up' : 'mdi-menu-down' }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuestInfoInput from './GuestInfoInput.vue'
import IconOpen from '@/components/icons/IconOpen'

export default {
  components: { GuestInfoInput, IconOpen },
  name: 'GuestInformation',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    notChange: Boolean,
    facility: Object
  },
  data () {
    return {
      preCheckIn: false
    }
  },
  computed: {
    preCheckInLabel () {
      return this.preCheckIn ? this.$t('buttons.enterPreCheckInInfoLater') : this.$t('buttons.enterPreCheckInInfoNow')
    },
    adults () {
      return this.value.filter(g => !g.child)
    },
    representative () {
      return this.adults.find(g => g.representative)
    },
    otherAdults () {
      return this.adults.filter(g => !g.representative)
    },
    children () {
      return this.value.filter(g => g.child && !g.bedShared)
    },
    bedShares () {
      return this.value.filter(g => g.child && g.bedShared)
    },
    adultsCount: {
      get () {
        return this.adults.length
      },
      set (newCount) {
        if (this.adultsCount > newCount) {
          // we must remove the adults from the last
          let counter = this.representative ? 1 : 0 // start from 1 because the representative must be kept
          const newValue = []
          this.value.forEach((guest) => {
            if (guest.child) newValue.push(guest)
            else if (guest.representative) {
              newValue.push(guest)
            } else if (newCount > counter) {
              newValue.push(guest)
              counter++
            }
          })
          this.$emit('input', newValue)
        } else {
          this.$emit('input', this.value.concat([...Array(newCount - this.adultsCount)].map(() => ({
            child: false,
            bedShared: false
          }))))
        }
      }
    },
    childrenCount: {
      get () {
        return this.children.length
      },
      set (newCount) {
        if (this.childrenCount > newCount) {
          // we must remove the children from the last
          let counter = 0
          const newValue = []
          this.value.forEach((guest) => {
            if (!guest.child) newValue.push(guest)
            else if (guest.bedShared) newValue.push(guest)
            else if (newCount > counter) {
              newValue.push(guest)
              counter++
            }
          })
          this.$emit('input', newValue)
        } else {
          this.$emit('input', this.value.concat([...Array(newCount - this.childrenCount)].map(() => ({
            child: true,
            bedShared: false
          }))))
        }
      }
    },
    bedShareCount: {
      get () {
        return this.bedShares.length
      },
      set (newCount) {
        if (this.bedShareCount > newCount) {
          // we must remove the bedShareCount from the last
          let counter = 0
          const newValue = []
          this.value.forEach((guest) => {
            if (!guest.child) newValue.push(guest)
            else if (!guest.bedShared) newValue.push(guest)
            else if (newCount > counter) {
              newValue.push(guest)
              counter++
            }
          })
          this.$emit('input', newValue)
        } else {
          this.$emit('input', this.value.concat([...Array(newCount - this.bedShareCount)].map(() => ({
            child: true,
            bedShared: true
          }))))
        }
      }
    }
  },
  methods: {
    togglePreCheckIn () {
      this.preCheckIn = !this.preCheckIn
      this.$nextTick(() => {
        document.getElementById('anchor').scrollIntoView()
      })
    },
    getIndexOf (current, index) {
      return this.value
        .filter((g, ind) =>
          ind < index &&
          g.child === current.child &&
          g.bedShared === current.bedShared
        ).length + 1
    },
    changeGuest (index, newGuest) {
      const copied = this.value.slice()
      copied.splice(index, 1, newGuest)
      this.$emit('input', copied)
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-space-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    width: 100%;
  }
}

.guest-form-header{
  height: 55px;
}
</style>

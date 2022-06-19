<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <v-img
      src="@/assets/images/tokyu-vacations-bg-2.jpg"
      lazy-src="@/assets/images/lazy-img.png"
      position="center right"
      alt="tokyu_vacations"
    >
      <div class="form-container px-10 pb-15 --c-white">
        <div class="d-flex justify-center align-center py-8">
          <IconDoorOpen
            width="36.64"
            height="36.58"
            color="var(--color__white)"
          />
          <h1 class="text-x-heading--c-white ml-4">
            {{ $t("menu.main.vacancySearch") }}
          </h1>
        </div>

        <!-- START Booking-list -->
        <div v-for="item in bookingList" :key="item.id" class="mb-8">
          <h3 class="line-through">
            {{ item.productTypeId | productNameEn }}
          </h3>
          <v-btn
            rounded
            block
            x-large
            height="77"
            @click="toNewBooking(item)"
            class="bg-white text-medium--c-black"
          >
            <v-icon class="mr-2" color="var(--color__primary)">
              mdi-magnify
            </v-icon>
            {{ item.productTypeId | newBookingName }}{{ $t("vacancy.bookWith") }}
          </v-btn>
        </div>
        <div v-for="item in mwBookingList" :key="item.id" class="mb-8">
          <!-- START My-Week -->
          <h3 class="line-through">MY WEEK</h3>
          <v-btn
            :key="item.id"
            rounded
            block
            x-large
            height="77"
            @click="toNewBooking(item)"
            class="bg-white text-title--c-black align-center justify-start mb-2"
          >
            <v-icon class="mr-2" color="var(--color__primary)">
              mdi-magnify
            </v-icon>
            <div class="justify-self-start">
              <div class="text-heading--c-prm">
                {{ $t("vacancy.dayPlanOrPreferentialRate") }}
              </div>
              <div class="text-medium--c-black">
                {{ $t("vacancy.bookAtMyWeek") }}
              </div>
            </div>
          </v-btn>
          <!-- END My-Week ---->
        </div>
        <!-- END Booking-list -->
      </div>
      <RoomAvailability
        :visible="isVisibleRoomAv"
        @close="isVisibleRoomAv = false"
        @confirm="newBookSearch"
      />
    </v-img>
    <Exchange
      :visible="isVisibleExchange"
      @commitWhole="isVisibleSearch = true"
      @close="isVisibleExchange = false"
    />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import IconDoorOpen from '@/components/icons/IconDoorOpen'
import RoomAvailability from '@/views/VacancySearch/components/RoomAvailability'
import Exchange from '@/views/VacancySearch/components/Exchange'
import { ProductTypeNameToId } from '@/constants/product'

export default {
  name: 'VacancySearch',
  components: {
    Breadcrumbs,
    IconDoorOpen,
    RoomAvailability,
    Exchange
  },
  async mounted () {
    await this.$doLoading(async () => {
      await this.$store.dispatch('loadContracts')
      await this.$store.dispatch('loadRemainingPoints')
    })
  },
  computed: {
    bookingList () {
      return this.$store.getters.getContractsForBooking.filter(
        c => c.productTypeId !== this.mwProductId
      )
    },
    mwProductId () {
      return ProductTypeNameToId.MW
    },
    mwBookingList () {
      return this.$store.getters.getContractsForBooking.filter(
        c => c.productTypeId === this.mwProductId
      )
    },
    canCheckInUntil () {
      return ''
    },
    canCheckOutUntil () {
      return ''
    }
  },
  data () {
    return {
      isVisibleRoomAv: false,
      isVisibleExchange: false,
      isVisibleSearch: false,
      myWeekList: [
        {
          title: this.$t('vacancy.dayPlanOrPreferentialRate'),
          option: this.$t('vacancy.bookAtMyWeek')
        }
      ]
    }
  },
  methods: {
    newBookSearch ({ checkInDate, checkOutDate }) {
      this.$store.commit('setCheckInDate', checkInDate)
      this.$store.commit('setCheckOutDate', checkOutDate)
      this.$router.push({ name: 'vacancy-search-facilities' })
    },
    search () {
      this.$router.push('/home/vacancy-search/reservation?type=1')
    },
    toNewBooking (contract) {
      this.$store.commit('setContractIdForNewBooking', contract.id)
      this.$store.commit('setDateRestriction', {
        canCheckInUntil: contract.canCheckInUntil,
        canCheckOutUntil: contract.canCheckOutUntil
      })
      this.isVisibleRoomAv = true
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep.v-image {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: var(--color__primary);
    opacity: 0.6;
  }

  .v-responsive__content {
    position: relative;
    z-index: 2;
  }

  .v-btn {
    border-radius: 39px !important;
    border: 1px solid var(--color__light-gray);
    box-shadow: 0 3px 6px rgba(var(--color__black), 0.435) !important;
  }

  .line-through {
    margin-bottom: 8px;
    text-align: center;
    font-weight: var(--font-weight__medium);
    position: relative;

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      width: 25%;
      background-color: var(--color__white);
    }

    &::after {
      left: 0;
    }

    &::before {
      right: 0;
    }
  }
}
</style>

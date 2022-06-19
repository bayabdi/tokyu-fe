<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container">
      <div class="bg-white pb-3 px-3" :class="{ 'pt-6': !remainingPoint.isPointBasedProduct }">
        <v-row class="ma-0" v-if="remainingPoint.isPointBasedProduct">
          <v-col class="text-medium --w-regular --c-dark pt-6">
            <span>{{ $t("common.remainingPoint") }}:</span>
          </v-col>
          <v-col class="text-x-large --c-prm --w-bold">
            {{ remainingPoint.remainingPoint }}
            <span class="text-medium --c-black">{{ unitJa }}</span>
          </v-col>
        </v-row>
        <div class="px-3">
          <v-row class="ma-0 border-bold --border-prm --border-r-2">
            <v-col cols="4" class="text-title bg-silver">
              <span>{{ $t('common.searchCriteria') }}</span>
            </v-col>
            <v-col class="pl-5">
              <ul>
                <li class="text-title--c-prm--w-bold">
                  {{ checkInDate | jaShortDate }}-{{ checkOutDate | jaShortDate }}
                </li>
                <li class="text-title--c-prm--w-bold">
                  {{ selectedFacilities }}
                </li>
                <li class="text-title--c-prm--w-bold">
                  {{ numberOfAdults + numberOfChildren + numberOfBedShare }}{{ $t('common.peopleUse') }}
                </li>
              </ul>
              <v-btn
                class="mt-6 bg-white border-medium --border-prm"
                @click="isVisibleSearchModal = true"
                rounded
              >
                <IconSearch />
                <span class="ml-2 --w-bold">{{ $t('buttons.changeTheCondition') }}</span>
              </v-btn>
            </v-col>
          </v-row>
          <div class="triangle-down"></div>
        </div>
      </div>
      <div class="bg-primary pa-4 pb-16">
        <h4 class="text-medium --c-white mb-4 font-weight-regular">
          {{ $t('common.searchResult') }}
          <span class="text-heading --w-bold">{{ numberSearchResult }}</span>
          {{ $t('common.facility') }}
        </h4>
        <label class="text-default --c-white">
          <IconBar class="mr-2 vertical-align-middle" />
          <span>{{ $t('common.reordering') }}</span>
        </label>
        <v-btn
          class="bg-primary border-medium --border-white --c-white ml-4"
          @click="reversed = !reversed"
        >
          {{ reversed ? $t('filter.increaseByPoints') : $t('filter.decreaseByPoints') }}
        </v-btn>
        <VacancyItem
          v-for="f in availableFacilities"
          :key="f.id"
          :address="f.address1"
          :imageUrl="f.mainImageUrl"
          :facilityHpUrl="f.facilityHpUrl"
          :name="f.name"
          :tags="f.tags"
          :priceFrom="f.priceFrom"
          :unit="unit"
          @click="detail(f.id)"
        />
      </div>
    </div>
    <SearchModal
      :visible="isVisibleSearchModal"
      @close="isVisibleSearchModal = false"
      @search="search"
    />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import IconSearch from '@/components/icons/IconSearch'
import IconBar from '@/components/icons/IconBar'
import VacancyItem from '@/components/VacancyItem'
import SearchModal from '@/views/VacancySearch/components/SearchModal'
import mixin from './searchVacancyMixin'

export default {
  name: 'Reservation',
  mixins: [mixin],
  components: {
    Breadcrumbs,
    IconSearch,
    IconBar,
    VacancyItem,
    SearchModal
  },
  async mounted () {
    await this.search()
  },
  data () {
    return {
      isVisibleSearchModal: false,
      reversed: false
    }
  },
  computed: {
    availableFacilities () {
      return this.$store.getters.getAvailableFacilities(this.reversed)
    },
    unit () {
      return this.$store.getters.newBookingAccommodationPriceUnit()
    },
    unitJa () {
      return this.$store.getters.newBookingAccommodationPriceUnit({ pointsToJapan: true })
    },
    remainingPoint () {
      return this.$store.getters.remainingPointsForBooking
    },
    selectedFacilities () {
      if (!this.facilities || this.facilities.length === 0) {
        return this.$t('booking.allFacilities')
      } else {
        return this.facilities.map(f => f.shortName).join(', ')
      }
    },
    numberSearchResult () {
      return this.availableFacilities.length
    }
  },
  methods: {
    detail (id) {
      this.$router.push(`/home/vacancy-search/reservation/details/${id}`)
    },
    async search () {
      this.isVisibleSearchModal = false
      await this.$doLoading(() => this.$store.dispatch('searchVacancy'))
    }
  }
}
</script>

<style lang="scss" scoped>
.triangle-down {
  width: 0;
  height: 0;
  margin: 0 auto;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid var(--color__primary);
}
</style>

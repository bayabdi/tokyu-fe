<template>
  <div class="form-container pb-15 px-5">
    <div class="text-heading font-weight-bold --c-prm text-center pt-10 pb-8">
      {{ $t('menu.main.exchangePoints') }}
    </div>
    <label class="text-sub-title--c-dark-gray font-weight-medium">
      {{ $t('giftTicket.selectThePointsToUse') }}
    </label>

    <v-radio-group v-model="selectedItemIndex" hide-details>
      <div
        v-for="(point, i) in $store.getters.remainingPoints"
        :key="i"
        class="rounded-10 border-medium --border-prm py-6 px-8 mb-4"
      >
        <label>
          <v-radio
            :value="i"
            class="font-weight-bold"
            :label="point.name"
            :ripple="false"
          />
          <div class="text-medium text-right">
            <span class="--c-dark"> {{ $t('common.remainingPoints') }} </span>
            <span class="text-max--c-prm font-weight-bold ml-1">
              {{ point.pointRemains | toThousands }}
            </span>
            <span class="--c-prm ml-n1">
              {{
                Math.abs(point.pointRemains) > 1
                  ? $t('unit.points')
                  : $t('unit.point')
              }}
            </span>
          </div>
        </label>
      </div>
    </v-radio-group>

    <!-- Select-button -->
    <v-btn
      @click="showProducts"
      x-large
      rounded
      block
      class="bg-primary text-heading--c-white mt-10"
      :disabled="!selectedItemIndex"
    >
      {{ $t('buttons.selectATicket') }}
    </v-btn>
    <!-- ------------- -->

    <!-- Return-button -->
    <v-btn
      @click="$router.go(-1)"
      x-large
      rounded
      block
      class="bg-silver text-heading--c-prm font-weight-bold mt-4"
    >
      {{ $t('buttons.return') }}
    </v-btn>
    <!-- ------------- -->
  </div>
</template>

<script>
export default {
  name: 'GiftTicket',
  async mounted () {
    await this.$doLoading(() => this.$store.dispatch('loadRemainingPoints'))
  },
  data () {
    return {
      selectedItemIndex: null
    }
  },
  methods: {
    showProducts () {
      this.$store.commit('setPointExchangeContractId',
        this.$store.getters.remainingPoints[this.selectedItemIndex].contractId)
      this.$router.push('/home/gift-ticket/exchange-points')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-radio {
    label {
      font-size: var(--font-size__heading);
      font-weight: var(--font-weight__bold) !important;
      color: var(--color__dark);
    }
  }
}
</style>

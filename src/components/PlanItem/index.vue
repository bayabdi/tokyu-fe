<template>
  <v-card class="mt-4 pa-5 d-flex text-left rounded-lg" elevation="0" @click="$emit('click')">
    <div>
      <h3 class="text-title --c-prm --w-bold">{{ name }}</h3>
      <p class="description pt-4 text-medium --c-x-dark">{{ description }}</p>
    </div>
    <v-divider vertical class="--border-prm mx-7"></v-divider>
    <div class="vertical-child-center col-3 pa-0">
      <h3 class="text-x-heading --w-bold --c-prm">
        {{ point | toThousands }}<span class="text-normal">{{ unit }}</span>
      </h3>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PlanItem',
  props: {
    plan: Object
  },
  data () {
    return {
      priceNoPlan: null
    }
  },
  async mounted () {
    const { totalPrice } = await this.$store.dispatch('calculateAccommodationPrice', { noPlan: true })
    this.priceNoPlan = totalPrice
  },
  computed: {
    name () { return this.plan?.title ?? 'プランを利用しない' },
    description () { return this.plan?.description ?? '' },
    point () {
      if (this.plan) {
        return this.plan?.prices.reduce((sum, price) => sum + (price.accommodationPrice ?? 0) +
            (price.accommodationPriceSp ?? 0) +
            (price.accommodationPriceFp ?? 0), 0)
      } else {
        return this.priceNoPlan
      }
    },
    unit () {
      return this.$store.getters.newBookingAccommodationPriceUnit()
    }
  }
}
</script>

<style lang="scss" scoped>
  .description {
      max-width: 220px;
  }
</style>

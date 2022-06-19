<template>
  <v-dialog v-model="isVisible" width="378" content-class="bg-white">
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="pl-4 pr-2 pt-13">
      <v-container class="pb-6">
        <v-row>
          <v-col class="text-medium font-weight-bold --c-medium-gray">
            {{ $t('reservationAndUsageHistory.rentalListing') }}
          </v-col>
          <v-col class="text-medium font-weight-bold --c-medium-gray">
            {{ $t('common.quantity') }}
          </v-col>
        </v-row>
        <v-row v-for="item in items" :key="item.id">
          <v-col align-self="center">
            <div class="text-medium --c-bg d-flex flex-column">
              {{ item.rentalItemDef.name }}
              <span>
                {{ item.rentalItemDef.rentalPeriod | rentalPeriod }}
                {{ item.rentalItemDef.priceWithSalesTax | jpy }}
              </span>
            </div>
          </v-col>
          <v-col class="pl-0">
            <div>
              <Counter
                v-model="quantities[item.id]"
                :max="item.maxQuantity"
                :disabled="item.maxQuantity === 0"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center">
        <v-btn
          rounded
          x-large
          min-width="200"
          class="text-medium bg-primary --c-white mb-13"
          @click="select"
        >
          {{ $t('buttons.decision') }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Counter from '../Counter'

export default {
  name: 'ModalRentalListing',
  components: {
    Counter
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    facilityId: Number,
    checkInDate: String,
    checkOutDate: String,
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      quantities: {}
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler () {
        await this.reload()
      }
    },
    checkInDate: {
      async handler () {
        await this.reload()
      }
    },
    checkOutDate: {
      async handler () {
        await this.reload()
      }
    },
    value: {
      immediate: true,
      async handler (newVal) {
        await this.reload()
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.rentalItemsForBooking
    },
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    async reload () {
      await this.$doLoading(async () => {
        await this.$store.dispatch('loadRentalItemsForBooking', {
          facilityId: this.facilityId,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate
        })
      })
      this.quantities = this.value.reduce((result, v) => {
        result[v.rentalItemId] = v.quantity
        return result
      }, {})
    },
    select () {
      const rentalItems = []
      for (const item of this.items) {
        if (this.quantities[item.id]) {
          rentalItems.push({
            ...item,
            quantity: this.quantities[item.id],
            rentalItemId: item.id
          })
        }
      }
      this.$emit('select', rentalItems)
    }
  }
}
</script>

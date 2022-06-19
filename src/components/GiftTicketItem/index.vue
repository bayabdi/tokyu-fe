<template>
  <div class="border-medium --border-prm mb-4">
    <div class="d-flex justify-center align-center bg-silver pa-2">
      <label class="text-medium--c-prm mr-4">
        {{ $t("common.numberOfPointsRequired") }}
      </label>
      <span class="text-x-heading--c-prm font-weight-bold">
        {{ pointsRequired + "pt/" + $t("unit.ticket") }}
      </span>
    </div>

    <div class="bg-white pa-4">
      <h5 class="text-title--c-dark-gray">{{ name }}</h5>
      <h4 class="text-normal--c-prm mt-1">{{ place }}</h4>
      <div class="my-4 border-medium-b --border-light-gray"/>
      <div
        class="d-flex align-center"
        :class="{ 'justify-center': isSaleItem }"
      >
        <div class="flex-shrink-0 mb-n2">
          <IconTicket color="var(--color__primary)" />
        </div>
        <span class="text-huge--c-prm font-weight-bold mx-2">
          {{ formatCurrency(totalTickets) }}
          <label class="text-medium--c-prm font-weight-medium">
            {{ totalTickets > 1 ? $t("unit.tickets") : $t("unit.ticket") }}
          </label>
        </span>
        <v-btn
          @click="$emit('openDialog')"
          v-if="!isSaleItem"
          rounded
          width="152"
          height="39"
          class="width-x-small bg-primary --c-white flex-shrink-0 ml-auto"
        >
          {{ $t("buttons.enterNumberOfTickets") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import IconTicket from '@/components/icons/IconTicket'
import { formatCurrency } from '@/utils/format'

export default {
  name: 'GiftTicketItem',
  components: {
    IconTicket
  },
  props: {
    isSaleItem: {
      type: Boolean,
      default: false
    },

    pointsRequired: Number,
    name: String,
    place: String,
    totalTickets: {
      type: Number,
      default: 0
    }
  },
  methods: {
    formatCurrency
  }
}
</script>

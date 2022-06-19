<template>
  <div
    class="gift-ticket-usage mb-3 text-medium"
    :class="{ '--primary': status }"
  >
    <div class="gift-ticket-usage__header px-3 py-2">
      {{
        status
          ? $t('giftTicket.ticketIssuerConfirmed')
          : $t('giftTicket.alreadyApplied')
      }}
    </div>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex justify-center py-4 px-2 bg-white">
        <span class="flex-shrink-0"> {{ date }} </span>
        <v-divider class="mx-3" vertical/>
        <div>
          {{ name }}
          <p v-if="status" class="text-normal--c-prm font-weight-bold">
            {{ $t('giftTicket.itWillBeSent') }}
          </p>
        </div>
      </div>
      <div
        class="bg-silver --c-prm font-weight-bold align-self-stretch d-flex align-center"
      >
        {{
          formatCurrency(quantity) +
          (Math.abs(quantity) > 1 ? $t('unit.tickets') : $t('unit.ticket'))
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency } from '@/utils/format'

export default {
  name: 'GiftTicketUsageHistoryItem',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    date: String,
    name: String,
    quantity: {
      type: Number,
      default: 0
    }
  },
  methods: {
    formatCurrency
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/modules/variables-scss' as v;

::v-deep {
  .v-divider {
    border-color: var(--color__dark-gray) !important;
  }
}

.gift-ticket-usage {
  * {
    color: var(--color__dark-gray);
  }

  .d-flex > .bg-white {
    width: calc(100% - 80px)
  }

  .bg-silver {
    width: 80px;
    flex-shrink: 0;
    padding: 16px;
  }

  border: 2px solid var(--color__turquoise);

  &__header {
    background-color: var(--color__turquoise);
    color: var(--color__primary);
  }

  &.--primary {
    .bg-silver {
      padding: 28px 16px;
    }

    border: 2px solid var(--color__primary);

    .gift-ticket-usage__header {
      background-color: var(--color__primary);
      color: var(--color__white);
    }
  }
}
</style>

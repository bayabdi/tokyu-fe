<template>
  <div>
    <h3 class="text-title text-center --w-bold --c-prm mb-5">{{$t('common.otherExpense')}}</h3>
    <div class="text-left text-medium">
      <ul v-if="otherExpenses.length">
        <li v-for="expense in otherExpenses" :key="expense.subject">
          {{ expense.subject }} {{ expense.price | toThousands }}{{ $t('booking.needToPay') }}
        </li>
      </ul>
      <span v-else>
        {{ $t('booking.noOtherCosts') }}
      </span>
    </div>
  </div>
</template>

<script>
import { summarizePricesByDate } from '@/utils/prices'

export default {
  name: 'OtherFeeDisclaimer',
  props: {
    pricesByDays: Array
  },
  computed: {
    otherExpenses () {
      return summarizePricesByDate(this.pricesByDays)
    }
  }
}
</script>

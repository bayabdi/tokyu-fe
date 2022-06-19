<template>
  <div class="form-container px-5 pb-15">
    <div class="d-flex justify-center align-center py-5">
      <IconTicket color="var(--color__primary)" width="65.25" height="65.27"/>
      <h1 class="text-heading--c-prm ml-2">
        {{ $t('menu.main.items.pointExchangeUsageHistory') }}
      </h1>
    </div>

    <GiftTicketUsageHistoryItem
      v-for="item in giftTicketList"
      :key="item.id"
      :name="item.pointExchangeProduct.name"
      :date="dateFormat(item.createdAt)"
      :quantity="item.quantity"
      :status="item.confirmedAt !== null"
    />
  </div>
</template>

<script>
import IconTicket from '@/components/icons/IconTicket'
import GiftTicketUsageHistoryItem from '@/components/GiftTicketUsageHistoryItem'

export default {
  name: 'GiftTicketUsageHistory',
  components: {
    IconTicket,
    GiftTicketUsageHistoryItem
  },
  mounted () {
    this.$store.dispatch('myPointExchangeList', {
      apollo: this.$apollo
    })
  },
  computed: {
    giftTicketList () {
      return this.$store.state.pointExchange.history
    }
  },
  methods: {
    dateFormat (date) {
      return date.slice(5, 7) + '月' + date.slice(8, 10) + '日'
    }
  }
}
</script>

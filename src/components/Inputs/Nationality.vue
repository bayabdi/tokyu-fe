<template>
  <v-select
    :items="items"
    :value="value"
    solo
    item-value="value"
    item-text="text"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'Nationality',
  props: {
    value: String
  },
  computed: {
    items () {
      return [
        { text: this.$t('common.japanNationalities'), value: this.$t('common.japan') },
        { text: this.$t('common.otherNationalities'), value: this.$t('common.other') }
      ]
    }
  }
}
</script>

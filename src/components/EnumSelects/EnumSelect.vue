<template>
  <v-select
    :items="items"
    :value="value"
    :rules="rules"
    item-text="name"
    :item-value="selectName ? 'name' : 'id'"
    solo
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'EnumSelect',
  props: {
    value: [String, Number],
    enumName: String,
    selectName: Boolean,
    required: Boolean
  },
  async mounted () {
    await this.$store.dispatch(`${this.enumName}LoadEnum`)
    this.loading = false
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    items () {
      return this.$store.state.enums[this.enumName] ?? []
    },
    rules () {
      const rules = []
      if (this.required) rules.push(v => !!v || this.$t('rules.isRequired'))

      return rules
    }
  }
}
</script>

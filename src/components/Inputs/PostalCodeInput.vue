<template>
  <v-text-field
    ref="input"
    type="tel"
    :id="id"
    :value="formatted"
    @input="input"
    solo
    :rules="rules"
    v-bind="$attrs"
    :maxLength="8"
    placeholder="123-1234"
    x-large
  />
</template>

<script>
import {
  checkPostalCode
} from '@/utils/validate'

export default {
  name: 'PostalCodeInput',
  props: {
    value: String,
    required: Boolean,
    id: {
      type: String,
      required: false
    }
  },
  computed: {
    lengthRule () {
      return v => checkPostalCode(v) || this.$t('rules.invalid')
    },
    rules () {
      const rules = []
      if (this.required) rules.push(v => !!v || this.$t('rules.isRequired'))

      rules.push(this.lengthRule)
      return rules
    },
    formatted () {
      const emitValue = this.getEmitValue(this.value)

      if (emitValue && emitValue.length >= 3) {
        return emitValue.slice(0, 3) + '-' + emitValue.slice(3)
      } else {
        return emitValue
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    getEmitValue (value) {
      if (!value) return value

      return value.replace(/[^0-9]/g, '')
    },
    input (v) {
      if (v && typeof v === 'string') {
        this.$emit('input', this.getEmitValue(v))
      } else {
        this.$emit('input', v)
      }
    },
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

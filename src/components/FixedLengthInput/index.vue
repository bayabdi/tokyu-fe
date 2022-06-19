<template>
  <v-text-field
    :id="id"
    ref="input"
    :value="value"
    @input="input"
    solo
    :rules="[lengthRule]"
    v-bind="$attrs"
    :maxLength="realMaxLength"
  />
</template>

<script>
export default {
  name: 'FixedLengthInput',
  props: {
    id: {
      type: String,
      required: false
    },
    value: String,
    fixedLength: Number,
    maxLength: Number,
    minLength: Number,
    nextInput: Object
  },
  computed: {
    lengthRange () {
      if (this.fixedLength) return [this.fixedLength, this.fixedLength]
      return [this.minLength ?? 0, this.maxLength ?? 99999999]
    },
    realMaxLength () {
      return this.lengthRange[1]
    },
    realMinLength () {
      return this.lengthRange[0]
    },
    lengthRule () {
      return v => {
        if (typeof v !== 'string') return false
        return !(v.length < this.realMinLength || v.length > this.realMaxLength)
      }
    }
  },
  methods: {
    input (v) {
      if (v && typeof v === 'string') {
        if (v.length > this.realMaxLength) {
          v = v.substring(0, this.realMaxLength)
        }

        if (v.length === this.realMaxLength && this.nextInput) {
          // focus the next input
          this.$nextTick(() => {
            typeof this.nextInput.focus === 'function' && this.nextInput.focus()
            typeof this.nextInput.$el?.focus === 'function' && this.nextInput.$el.focus()
          })
        }
      }
      this.$emit('input', v)
    },
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

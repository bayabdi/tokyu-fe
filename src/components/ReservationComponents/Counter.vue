<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column justify-center col-5 pa-0">
        <v-text-field
          solo
          height="3"
          hide-details
          :value="value"
          @input="emitInput"
          :disabled="disabled"
        />
      </v-col>
      <v-col class="d-flex flex-column justify-center col-3 py-0">
        <v-btn
          fab
          small
          @click="incrementCounter"
          :disabled="disabled"
          outlined
          color="--border-medium-smoke"
        >
          <v-icon color="--c-prm">
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex flex-column justify-center col-3 py-0 mx-auto">
        <v-btn
          fab
          small
          @click="decrementCounter"
          class="--border-medium-smoke"
          :disabled="disabled"
          outlined
        >
          <v-icon color="--c-prm">
            mdi-minus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: 'Counter'
    }
  },
  methods: {
    emitInput (v) {
      v = Number(v)
      if (v < this.min) {
        v = this.min
      } else if (v > this.max) {
        v = this.max
      }

      this.$emit('input', v)
    },
    incrementCounter () {
      this.emitInput(this.value + 1)
    },
    decrementCounter () {
      this.emitInput(this.value - 1)
    }
  }
}
</script>

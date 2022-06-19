<template>
  <v-dialog v-model="isVisible" width="378" content-class="bg-white text-center">
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="pb-4 pt-13 text-title text-center --c-bg font-weight-bold">
      {{ $t('booking.selectYourDates') }}
    </div>
    <v-radio-group class="px-15 pb-7" v-model="selectedDate">
      <v-radio
        v-for="item in items"
        :key="item.id"
        class="pb-7"
        :value="item"
        :label="$options.filters.jaShortDate(item)"
      ></v-radio>
    </v-radio-group>
    <slot />
    <v-btn
      rounded
      width="262"
      height="57"
      class="bg-primary --c-white font-weight-bold"
      @click="confirm"
      :disabled="!canConfirm"
    >
      {{ $t('buttons.decision') }}
    </v-btn>

    <div class="pa-5"></div>
  </v-dialog>
</template>

<script>
export default {
  name: 'DatedModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      selectedDate: null
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    canConfirm () {
      return !!this.selectedDate
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.selectedDate = v
      }
    }
  },
  methods: {
    confirm () {
      this.$emit('input', this.selectedDate)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/modules/variables-scss' as v;

::v-deep{
  .v-radio{
    label{
      font-size: var(--font-size__title);
      font-weight: var(--font-weight__medium) !important;
      color: var(--color__medium-gray);
    }
  }
}
</style>

<template>
  <v-dialog
    v-model="isVisible"
    max-width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="px-6">
      <h2 class="mt-n7 mb-5 text-heading --c-prm">{{ $t('text.facility.select') }}</h2>
      <p class="text-medium --w-bold --c-light-gray">{{ $t('text.facility.pleaseSelect') }}</p>
      <v-row class="ma-0">
        <v-col cols="6" v-for="facility in facilities" :key="facility.id">
          <v-checkbox
            v-model="selectedFacilities"
            :value="facility.id"
            :label="facility.shortName"
            color="primary"
            class="normal-label"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        @click="confirm"
        elevation="2"
        large
        rounded
        class="my-10 text-medium --w-bold"
      >{{ $t('buttons.completeSelection') }}</v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'FacilitySelect',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  async mounted () {
    await this.$doLoading(async () => {
      this.facilities = await this.$store.dispatch('getFacilityListForBooking')
    })
  },
  watch: {
    value (newValue) {
      this.selectedFacilities = newValue.map(f => f.id)
    }
  },
  data () {
    return {
      facilities: [],
      selectedFacilities: ['']
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
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm', this.selectedFacilities.map(id => this.facilities.find(f => f.id === id)).filter(t => !!t))
    }
  }
}
</script>

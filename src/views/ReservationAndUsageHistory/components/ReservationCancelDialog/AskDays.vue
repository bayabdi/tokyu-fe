<template>
  <div class="pb-4">
    <h2 class="text-medium --c-medium-gray text-left font-weight-bold pt-3 pb-3 ">
      {{ $t("text.selectCancelDays") }}
    </h2>
    <div class="px-10 text-center pb-10 d-flex">
      <v-select
        class="col-10 ml-0 mr-3"
        :items="items"
        solo
        full-width
        hide-details="true"
        v-model="numberOfDays"
      ></v-select>
      <div
        class="col-2 font-weight-bold text-title text-left d-flex flex-column justify-end --c-prm pa-0"
      >
        {{ $t('common.day') }}
      </div>
    </div>

    <v-btn
      @click="confirm"
      :disabled="!numberOfDays"
      rounded
      height="57"
      width="100%"
      max-width="262"
      class="text-medium font-weight-bold mb-3 bg-primary --c-white"
    >
      {{ $t("text.cancelSomeDates") }}
    </v-btn>
    <v-btn
      rounded
      @click="$listeners.back"
      height="57"
      width="100%"
      max-width="262"
      class="text-medium font-weight-bold mb-3 bg-primary --c-white"
    >
      {{ $t("buttons.return") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    maxDays: Number
  },
  data () {
    return {
      numberOfDays: null
    }
  },
  computed: {
    items () {
      return [...Array(this.maxDays)].map((_, ind) => ind + 1)
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm', { numberOfDays: this.numberOfDays })
    }
  }
}
</script>

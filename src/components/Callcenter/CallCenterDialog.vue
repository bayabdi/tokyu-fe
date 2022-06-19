<template>
  <v-dialog :value="callCenterDialog" width="378">
    <div class="d-flex justify-space-between">
      <div class="d-flex justify-center align-self-end align-center mb-n5 w-100">
        <IconPhone color="var(--color__primary)" width="65.25" height="65.27" />
        <h3 class="text-heading--c-prm ml-2">
          {{ $t('booking.callCenter') }}
        </h3>
      </div>
      <button
        @click.stop="close"
        class="btn-close bg-primary flex-shrink-0"
      >
        <div class="btn-close__icon" />
      </button>
    </div>

    <div class="px-8 py-13">
      <v-btn @click="makeCall" rounded color="primary" block>
        {{ telNumber }}
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
import IconPhone from '@/components/icons/IconPhone'
export default {
  name: 'CallCenterDialog',
  data () {
    return {
      telNumber: process.env.VUE_APP_CALL_CENTER_TEL_NUMBER
    }
  },
  components: {
    IconPhone
  },
  computed: {
    callCenterDialog () {
      return this.$store.state.common.callcenterDialog
    }
  },
  methods: {
    makeCall () {
      window.open(`tel:${this.telNumber}`)
    },
    close () {
      return this.$store.commit('showCallCenterDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-dialog {
    background-color: var(--color__white) !important;
  }
}
</style>

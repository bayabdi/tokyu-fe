<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="px-6">
      <h2 class="mt-n5 mb-5 text-heading --c-prm">{{ title }}</h2>
      <p class="text-left ml-6 text-sub-title --w-bold --c-light-gray mb-7">
        {{ text }}
      </p>
    </div>
    <div class="px-12">
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-10 --c-prm"
      >
        {{ $t('buttons.returnToTop') }}
      </v-btn>
    </div>
  </CommonModal>
</template>

<script>
// TODO later https://kujira-system.slack.com/archives/D02EV36G0A0/p1642571256006300
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'ReservationDivisionComplete',
  components: {
    CommonModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    text: {
      type: String
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
  }
}
</script>

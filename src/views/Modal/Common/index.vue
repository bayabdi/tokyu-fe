<template>
  <v-dialog
    content-class="bg-white text-center"
    width="378"
    v-model="isVisible"
    :persistent="isPersistent"
  >
    <div class="text-right" v-if="hasCloseButton">
      <button @click.stop="close()" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="py-4 px-6">
      <slot :close="close"></slot>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'CommonModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    hasCloseButton: {
      type: Boolean,
      default: true
    },
    isPersistent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

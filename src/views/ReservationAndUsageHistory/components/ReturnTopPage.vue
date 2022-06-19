<template>
  <v-dialog
    v-model="isVisible"
    width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <slot/>
    <v-btn
      rounded
      width="262"
      height="57"
      class="bg-silver --c-prm font-weight-bold"
      @click="goToTopPage"
    >
      TOPページへ戻る
    </v-btn>

    <div class="pa-5" />
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmationOfUsage',
  props: {
    visible: {
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
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    goToTopPage () {
      this.$router.push('/')
      this.$emit('close')
    }
  }
}
</script>

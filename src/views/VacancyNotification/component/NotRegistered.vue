<template>
  <v-dialog v-model="isVisible" width="378">
    <button
      @click.stop="$emit('close')"
      class="float-right btn-close bg-primary flex-shrink-0"
    >
      <div class="btn-close__icon" />
    </button>

    <p class="mt-15 text-center --c-prm text-title --w-bold">
      {{ $t("text.notRegistered.title") }}
    </p>
    <p class="pa-5 text-medium --w-medium --c-medium-gray">
      {{ $t("text.notRegistered.text") }}
    </p>
    <div class="px-10">
      <v-btn
        @click="$emit('close')"
        block
        rounded
        class="bg-primary --c-white text-medium --w-bold mb-10 mt-3 py-5"
      >{{ $t("menu.main.vacancySearch") }}</v-btn
      >
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'NotRegistered',
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

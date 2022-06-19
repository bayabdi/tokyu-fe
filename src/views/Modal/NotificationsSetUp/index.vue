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
      <h2 class="mt-1 mb-6 text-heading --c-prm">
        {{ $t("booking.youHaveSetUpNotification") }}
      </h2>
      <div class="px-6 mb-12">
        <v-btn
          color="primary"
          class="text-medium --w-bold mb-3"
          @click="
            $emit('commit');
            $emit('close');
          "
          block
          elevation="2"
          large
          rounded
        >
          {{ $t("buttons.return") }}
        </v-btn>
        <v-btn
          class="text-medium --w-bold --c-prm"
          block
          elevation="2"
          large
          rounded
          to="/home/vacancy-notification"
        >
          {{ $t("booking.viewVacancyNoticeList") }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'NotificationsSetUpModal',
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

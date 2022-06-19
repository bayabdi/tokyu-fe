<template>
<v-dialog v-model="isVisible" max-width="378" content-class="bg-white text-left">
    <div class="text-right">
        <button @click.stop="$emit('close')" class="btn-close bg-primary">
            <div class="btn-close__icon" />
        </button>
    </div>
    <div class="px-6 pb-16">
        <h1 class="text-m-heading --c-prm">{{title}}</h1>
        <v-btn class="text-medium --w-bold mt-6" color="primary" elevation="2" block rounded x-large>{{backBtn.text}}</v-btn>
        <v-btn class="text-medium --w-bold mt-3" color="primary" elevation="2" block rounded x-large>{{viewBtn.text}}</v-btn>
    </div>
</v-dialog>
</template>

<script>
export default {
  name: 'ReservationCancellationComplete',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: this.$t('common.exchangedReservations'),
      backBtn: {
        text: this.$t('buttons.backToTop')
      },
      viewBtn: {
        text: this.$t('buttons.viewTheListOfReceipts')
      }
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

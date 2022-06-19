<template>
  <v-dialog
    v-model="isVisible"
    width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="close()" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="px-6 py-4">
      <h4 class="mb-5 text-title --c-prm">
        {{ $t('booking.fullyBooked') }}<br>
        {{ $t('booking.willYouNotifyWhenAvailable') }}
      </h4>
      <v-divider class="my-4"/>
      <div>
        <div class="text-heading font-weight-bold">
          {{ checkInDate | jaShortDate }} - {{ checkOutDate | jaShortDate }}
        </div>
        <div class="text-x-heading --c-prm">
          {{ facilityInfo.name }}
        </div>
        <div class="text-title">
          {{ roomType.name }}
        </div>
      </div>
      <v-divider class="my-4"/>
      <v-btn
        rounded
        height="57"
        class="bg-primary text-heading --c-white w-100"
        @click="confirm"
      >
        {{ $t('booking.setUpNotification') }}
      </v-btn>
      <NotificationsSetUpModal
        :visible="isSuccessful"
        @close="isSuccessful = false"
      />
      <p class="pt-4">
        {{ $t('booking.noteRoomAvailability') }}
        {{ $t('booking.forMoreInfo') }}
        <a class="text-decoration-underline --c-prm" :href="faqUrl" target="_blank">{{ $t('booking.faqPage') }}</a>
        {{ $t('booking.findOutMore') }}
      </p>
    </div>
  </v-dialog>
</template>

<script>
import NotificationsSetUpModal from '@/views/Modal/NotificationsSetUp'

export default {
  name: 'AddWaitListModal',
  components: { NotificationsSetUpModal },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    checkInDate: String,
    checkOutDate: String,
    facilityInfo: Object,
    roomType: Object
  },
  data () {
    return {
      faqUrl: process.env.VUE_APP_FAQ_URL,
      isSuccessful: false
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) this.close()
      }
    }
  },
  methods: {
    async confirm () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('createCancelWaitList', {
            roomTypeId: this.roomType.id,
            checkInDate: this.checkInDate,
            checkOutDate: this.checkOutDate
          })
        })

        this.isSuccessful = true
        this.close()
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div :class="topLevel ? 'bg-white' : ''">
    <div
      class="text-heading font-weight-bold pt-3 --c-prm"
      :class="topLevel ? 'text-center --c-white bg-primary' : ''"
    >
      {{ label }}
    </div>
    <div class="mt-3" :class="topLevel ? 'px-4' : ''">
      <template v-if="!nameFixed">
        <FormLabel :label="$t('reservationAndUsageHistory.guestName')" required />
        <v-text-field
          class="mt-2"
          hide-details
          :rules="[rules.required]"
          v-model="localGuest.name"
          solo
        />
      </template>
      <template v-else>
        <div class="mb-2">
          <span class="text-title --w-bold">{{ localGuest.name || $t('common.nominationNotSet') }}</span>
        </div>
        <v-divider></v-divider>
      </template>
      <template v-if="preCheckIn">
        <FormLabel :label="$t('common.address')" />
        <v-combobox
          class="mt-2"
          hide-details
          v-model="localGuest.address1"
          solo
        />
        <FormLabel :label="$t('common.profession')" />
        <v-text-field
          class="mt-2"
          hide-details
          v-model="localGuest.occupation"
          solo
        />
        <FormLabel :label="$t('common.age')" />
        <div class="d-flex align-end">
          <div style="width: 150px;">
            <v-text-field
              class="mt-2"
              type="number"
              hide-details
              :value="localGuest.age"
              @input="updateAge"
              solo
            />
          </div>
          <div>{{ $t('common.ageL') }}</div>
        </div>
        <FormLabel :label="$t('common.sex')" />
        <GenderRadio :value="localGuest.sex" />
        <FormLabel :label="$t('common.phone')" />
        <v-text-field
          class="mt-2"
          type="tel"
          hide-details
          v-model="localGuest.tel"
          solo
        />
        <FormLabel :label="$t('common.email')" />
        <v-text-field
          class="mt-2"
          type="email"
          hide-details
          v-model="localGuest.email"
          solo
        />
        <FormLabel :label="$t('common.countryOfCitizenship')" />
        <Nationality v-model="localGuest.nationality" />

        <!--     todo it seems this is not working (uploading file)   -->
        <div class="pb-3" v-show="showPassportFields">
          <div class="text-center my-3">
            <v-btn
              height="50"
              color="primary"
              rounded
              @click="uploadPassportPhoto"
            >
              {{ $t('buttons.uploadPassportPhoto') }}
            </v-btn>
            <input
              v-show="false"
              type="file"
              ref="passportPhotoFile"
              accept="image/*"
              capture="camera"
              @change="passportPhotoChange"
            />
          </div>
          <FormLabel :label="$t('common.passportNumber')" :disabled="!showPassportFields" />
          <v-text-field
            :disabled="!showPassportFields"
            class="mt-2"
            type="text"
            hide-details
            v-model="localGuest.passportNumber"
            solo
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FormLabel from '../Inputs/FormLabel.vue'
import GenderRadio from '../Inputs/GenderRadio.vue'
import Nationality from '../Inputs/Nationality.vue'
import { uploadPassportFile } from '@/api/file'

export default {
  components: {
    FormLabel,
    GenderRadio,
    Nationality
  },
  name: 'GuestInfoInput',
  props: {
    guest: Object,
    representative: Boolean,
    index: Number,
    preCheckIn: Boolean,
    nameFixed: Boolean,
    topLevel: Boolean,
    bookingId: {
      type: Number,
      required: false
    },
    bookingCode: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      localGuest: {},
      rules: {
        required: value => !!value || this.$t('rules.isRequired')
      },
      passportFileUrl: null
    }
  },
  watch: {
    guest: {
      immediate: true,
      handler (newGuest) {
        if (newGuest) {
          this.localGuest = newGuest
        }
      }
    },
    localGuest: {
      deep: true,
      handler () {
        this.emitChange()
      }
    }
  },
  computed: {
    name () {
      return ''
    },
    label () {
      if (this.representative) return this.$t('reservationAndUsageHistory.accommodationRepresentative')
      if (!this.guest.child) return `${this.$t('common.adult')}${this.index}`
      if (this.guest.bedShared) return `${this.$t('common.child')} (${this.$t('booking.withSleepingAccommodation')}) ${this.index}`
      return `${this.$t('common.child')} (${this.$t('booking.withNoSleepingTogether')}) ${this.index}`
    },
    showPassportFields () {
      return this.localGuest.nationality === this.$t('common.other')
    }
  },
  methods: {
    uploadPassportPhoto () {
      this.$refs.passportPhotoFile.click()
    },
    async passportPhotoChange (event) {
      console.log(event.target)
      if (event.target.files && event.target.files.length) {
        await this.$doLoading(async () => {
          await this.$showGqlError(async () => {
            const { key, fileUrl } = await uploadPassportFile(event.target.files[0], {
              bookingId: this.bookingId,
              code: this.bookingCode
            })
            this.passportFileUrl = fileUrl
            this.localGuest.passportPhoto = key
          })
        })
      }
    },
    emitChange () {
      this.$emit('change', this.localGuest)
    },
    updateAge (age) {
      this.localGuest.age = Number(age)
    }
  }
}
</script>

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
    <div class="px-8">
      <h2 class="mt-n7 mb-5 text-heading --c-prm">{{ $t('common.numberPeople') }}</h2>
      <h3 class="text-left text-title --c-prm --w-bold">{{ $t('common.adult') }}</h3>
      <v-col cols="6" class="pa-0 mt-2">
        <v-row class="ma-0">
          <v-col cols="7" class="pa-0">
            <v-select
              v-model="adults"
              :items="items"
              solo
              hide-details
            ></v-select>
          </v-col>
          <v-col
            cols="3"
            class="pa-0 text-left pl-2 text-sub-title --w-medium --c-light-gray"
            align-self="end"
          >
            <span>{{ $t('common.firstName') }}</span>
          </v-col>
        </v-row>
      </v-col>
      <h3 class="text-left text-title --c-prm --w-bold mt-5">
        {{ $t('common.child') }}
      </h3>
      <v-row class="ma-0">
        <v-col cols="6" class="pa-0 mt-2">
          <v-row class="ma-0">
            <v-col cols="7" class="pa-0">
              <h3 class="text-left text-sub-title --w-medium --c-light-gray">
                {{ $t('common.sleepTogether') }}
              </h3>
              <v-select
                v-model="children"
                :items="items"
                solo
                hide-details
              ></v-select>
            </v-col>
            <v-col
              cols="3"
              class="pa-0 text-left pl-2 text-sub-title --w-medium --c-light-gray"
              align-self="end"
            >
              <span>{{ $t('common.firstName') }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="pa-0 mt-2">
          <v-row class="ma-0">
            <v-col cols="7" class="pa-0">
              <h3 class="text-left text-sub-title --w-medium --c-light-gray">
                {{ $t('common.noSleepTogether') }}
              </h3>
              <v-select
                v-model="bedShare"
                :items="items"
                solo
                hide-details
              ></v-select>
            </v-col>
            <v-col
              cols="3"
              class="pa-0 text-left pl-2 text-sub-title --w-medium --c-light-gray"
              align-self="end"
            >
              <span>{{ $t('common.firstName') }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div>
        <v-btn
          color="primary"
          class="text-heading --w-bold my-8 px-12"
          @click="$emit('close')"
          elevation="2"
          large
          rounded
        >
          {{ $t('buttons.decision') }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'NumberGuest',
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
    },
    items () {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    adults: {
      get () {
        return this.$store.state.newBooking.numberOfAdults
      },
      set (v) {
        this.$store.commit('setSearchNumberOfAdults', v)
      }
    },
    children: {
      get () {
        return this.$store.state.newBooking.numberOfChildren
      },
      set (v) {
        this.$store.commit('setSearchNumberOfChildren', v)
      }
    },
    bedShare: {
      get () {
        return this.$store.state.newBooking.numberOfBedShare
      },
      set (v) {
        this.$store.commit('setSearchNumberOfBedShare', v)
      }
    }
  }
}
</script>

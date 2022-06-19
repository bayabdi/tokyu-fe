<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="px-6">
      <div class="mt-n5 mb-5 text-heading --w-bold --c-prm">
        {{ $t("buttons.partialCancellation") }}
      </div>
      <div class="text-title --c-medium-gray--w-bold mb-6">
        {{ $t("common.pleaseSelectTheDateYouWantToCancel") }}
      </div>
      <v-radio-group v-model="cancelChoice">
        <div v-for="choice in cancelChoices" :key="choice.id">
          <v-row class="border-medium --border-r-2 --border-smoke ma-0 mb-2">
            <v-col cols="2" class="text-center bg-smoke --border-rl-2 pt-15">
              <v-radio :value="choice.id" />
            </v-col>
            <v-col>
              <v-row>
                <v-col
                  cols="4"
                  class="text-medium --c-x-dark --w-regular pa-0 pl-3 pt-2"
                >
                  {{ $t("common.reservationTime") }}
                </v-col>
                <v-col class="text-title text-right --c-prm --w-bold pb-0">
                  {{ choice.reservationTime }}
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="8"
                  class="text-medium --c-x-dark --w-regular pa-0 pl-3 pt-2"
                >
                  {{ $t("common.cancellationPolicy") }}
                </v-col>
                <v-col class="text-title text-right --c-prm --w-bold pb-0">
                  {{ choice.cancellationPolicy }}
                </v-col>
              </v-row>
              <v-row class="pb-3">
                <v-col
                  cols="8"
                  class="text-medium --c-x-dark --w-regular pa-0 pl-3 pt-2"
                >
                  {{ $t("common.cancelPointName", { pointName: pointName }) }}
                </v-col>
                <v-col class="text-title text-right --c-prm --w-bold pb-0">
                  {{ choice.cancelPointName }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-radio-group>
      <div class="text-title --c-prm --w-bold">
        {{ $t("text.partialCancellationText") }}
      </div>
      <div class="text-left text-medium--c-x-dark mt-11">
        {{ $t("common.totalCancellationPointName", { pointName: pointName }) }}
      </div>
      <div class="text-left text-max --c-prm--w-bold">
        {{ totalCancellation.value }}
        <span class="text-large">{{ $t("unit.point") }}</span>
      </div>
      <v-divider class="mb-12 --border-light-gray" />
      <div class="text-left text-medium--c-x-dark mt-11">
        {{ $t("common.restitutionPointName", { pointName: pointName }) }}
      </div>
      <div class="text-left text-max --c-prm--w-bold">
        {{ restitution.value }}
        <span class="text-large">{{ $t("unit.point") }}</span>
      </div>
      <v-divider class="mb-12 --border-light-gray" />
      <label class="text-left">
        {{ $t("common.pleaseEnterYourLoginPassword") }}
      </label>
      <v-text-field class="mt-1 mb-6" solo hide-details="true"></v-text-field>
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-3"
        color="primary"
      >
        {{ $t("menu.main.items.cancelReservation") }}
      </v-btn>
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-10 --c-prm"
      >
        {{ $t("buttons.return") }}
      </v-btn>
    </div>
  </CommonModal>
</template>

<script>
// TODO later https://kujira-system.slack.com/archives/D02EV36G0A0/p1642571256006300
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'PartialCancellation',
  components: {
    CommonModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    pointName: String
  },
  data () {
    return {
      cancelChoice: 1,
      cancelChoices: [{
        id: 0,
        reservationTime: '2022/11/3（金)',
        cancellationPolicy: '100%',
        cancelPointName: '000pt'
      }, {
        id: 1,
        reservationTime: '2022/11/3（金)',
        cancellationPolicy: '100%',
        cancelPointName: '000pt'
      }, {
        id: 2,
        reservationTime: '2022/11/3（金)',
        cancellationPolicy: '100%',
        cancelPointName: '000pt'
      }, {
        id: 3,
        reservationTime: '2022/11/3（金)',
        cancellationPolicy: '100%',
        cancelPointName: '000pt'
      }],
      totalCancellation: {
        value: 200
      },
      restitution: {
        value: 200
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

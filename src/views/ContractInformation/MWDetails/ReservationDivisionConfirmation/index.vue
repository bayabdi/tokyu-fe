<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="px-6">
      <div class="mt-n5 mb-5 text-heading --c-prm --w-bold">
        {{ $t("buttons.reserveDiv") }}
      </div>
      <v-row class="ma-0">
        <v-col cols="2" class="pt-6 pb-1">
          <IconCalendar />
        </v-col>
        <v-col class="text-left py-1">
          <div class="text-medium --c-light-gray--w-regular">
            {{ $t("common.dateOfDivision") }}
          </div>
          <div class="text-sub-title--c-prm--w-bold">{{ dateOfVision }}</div>
        </v-col>
      </v-row>
      <v-divider class="mb-5 --border-light-gray" />
    </div>
    <div v-for="item in items" :key="item.id">
      <v-divider v-if="item.id > 0" />
      <div class="px-6">
        <v-row class="ma-0">
          <v-col class="text-sub-title --c-prm--w-bold text-left px-0">
            {{ $t("common.checkinDate") }}
          </v-col>
          <v-col class="text-title --c-light-gray --w-regular text-left px-0">
            {{ item.checkInDate }}
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="ma-0">
          <v-col class="text-sub-title --c-prm--w-bold text-left px-0">
            {{ $t("common.finalDate") }}
          </v-col>
          <v-col class="text-title --c-light-gray --w-regular text-left px-0">
            {{ item.finalDate }}
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="ma-0">
          <v-col class="text-sub-title --c-prm--w-bold text-left px-0">
            {{ $t("common.numberOfNight") }}
          </v-col>
          <v-col class="text-title --c-light-gray --w-regular text-left px-0">
            {{ item.numberOfNight }}
            {{ suffix.numberOfNight }}
          </v-col>
        </v-row>
        <v-divider />
        <div class="text-medium --c-light-gray text-left mt-4 mb-2">
          {{ $t("text.reserveDivCon.selectLabel") }}
        </div>
        <v-select :items="[]" outlined></v-select>
      </div>
    </div>
    <div class="px-12">
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-3"
        color="primary"
        @click="$emit('commit')"
      >{{ $t("buttons.split") }}</v-btn
      >
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-10 --c-prm"
      >{{ $t("buttons.return") }}</v-btn
      >
    </div>
  </CommonModal>
</template>

<script>
// TODO later https://kujira-system.slack.com/archives/D02EV36G0A0/p1642571256006300
import CommonModal from '@/views/Modal/Common'
import IconCalendar from '@/components/icons/IconCalendar'

export default {
  name: 'ReservationDivisionConfomation',
  components: {
    IconCalendar,
    CommonModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      suffix: {
        numberOfNight: '泊'
      },
      dateOfVision: '2022/00/00,2022/00/00',
      items: [{
        id: 0,
        checkInDate: '2022/11/13 (火)',
        finalDate: '2022/11/15 (木)',
        numberOfNight: '2',
        selectId: null
      },
      {
        id: 1,
        checkInDate: '2022/11/13 (火)',
        finalDate: '2022/11/15 (木)',
        numberOfNight: '2',
        selectId: null
      },
      {
        id: 2,
        checkInDate: '2022/11/13 (火)',
        finalDate: '2022/11/15 (木)',
        numberOfNight: '2',
        selectId: null
      }
      ]
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

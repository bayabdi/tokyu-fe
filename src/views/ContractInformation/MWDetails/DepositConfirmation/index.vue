<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="px-6">
      <div class="mt-n5 mb-5 text-heading --w-bold --c-prm">{{ $t('buttons.deposit') }}</div>
      <div class="text-left text-sub-title --w-bold --c-light-gray mb-6">
        {{ $t('text.depositCon.subtitle') }}
      </div>
      <v-row class="ma-0">
        <v-col class="text-medium --c-light-gray --w-regular text-left px-0">{{ $t('common.depositMWYear') }}</v-col>
        <v-col class="text-huge --c-prm --w-bold px-0 py-0">{{ year }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="ma-0">
        <v-col class="text-medium --c-light-gray --w-regular text-left px-0">{{ $t('common.formerFacilities') }}</v-col>
        <v-col class="text-huge --c-prm --w-bold px-0 py-0">{{ fac }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="ma-0">
        <v-col class="text-medium --c-light-gray --w-regular text-left px-0">{{ $t('common.formerRank') }}</v-col>
        <v-col class="text-huge --c-prm --w-bold px-0 py-0">{{ formerRank }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="ma-0">
        <v-col class="text-medium --c-light-gray --w-regular text-left px-0">{{ $t('common.formerWeekNumber') }}</v-col>
        <v-col class="text-huge --c-prm --w-bold px-0 py-0">{{ formerWeekNumber }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="ma-0">
        <v-col class="text-medium --c-light-gray --w-regular text-left px-0">{{ $t('common.scope') }}</v-col>
        <v-col class="text-huge --c-prm --w-bold px-0 py-0">{{ scope }}</v-col>
      </v-row>
      <v-divider class="mb-8" />
      <v-btn
        block
        elevation="1"
        rounded
        @click="$emit('commit')"
        class="text-medium--w-bold py-6 mb-3"
        color="primary"
      >
        {{ $t('buttons.makeDeposit') }}
      </v-btn>
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-10 --c-prm"
      >
        {{ $t('buttons.return') }}
      </v-btn>
    </div>
  </CommonModal>
</template>

<script>
// TODO later https://kujira-system.slack.com/archives/D02EV36G0A0/p1642571256006300
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'DepositeConfirmation',
  components: {
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
      year: 2021,
      fac: '京都',
      formerRank: 'A',
      formerWeekNumber: 12,
      scope: '全体'
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

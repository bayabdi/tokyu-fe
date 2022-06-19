<template>
<v-dialog v-model="isVisible" max-width="378" content-class="bg-white text-left">
    <div class="text-right">
        <button @click.stop="$emit('close')" class="btn-close bg-primary">
            <div class="btn-close__icon" />
        </button>
    </div>
    <div class="px-6">
        <p class="my-6 text-heading --c-prm --w-bold">{{text.make}}</p>

        <div class="border-medium --border-r-2 --border-light-gray">
            <p class="bg-primary text-center text-heading --c-white py-3 --w-bold">{{label.requester}}</p>
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.fiscalYear}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{request.fiscalYear}}</v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.facility}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{request.facility}}</v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.rank}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{request.rank}}</v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.weekSpecialN}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{request.weekSpecialN}}</v-col>
            </v-row>
        </div>

        <div class="text-center indicator">
            <IconDownIndicate />
        </div>

        <div class="border-medium --border-r-2 --border-light-gray">
            <p class="bg-primary text-center text-heading --c-white py-3 --w-bold">{{label.replacement}}</p>
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.fiscalYear}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{replacement.fiscalYear}}</v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.facility}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{replacement.facility}}</v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.rank}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{replacement.rank}}</v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-0">
                <v-col class="text-medium --c-x-dark --w-regular">{{label.weekSpecialN}}</v-col>
                <v-col class="text-title --c-prm --w-bold">{{replacement.weekSpecialN}}</v-col>
            </v-row>
        </div>

        <p class="text-medium --c-light-gray --w-bold mt-7">{{text.apply}}</p>

        <v-row class="ma-0 mt-3">
            <v-col class="px-0 text-medium --w-bold --c-prm">{{label.exchangeFee}}</v-col>
            <v-col class="pa-0 text-huge text-right --w-bold --c-prm">{{exchangeFee}}<span class="text-medium">{{label.yen}}</span></v-col>
        </v-row>
        <v-divider />
        <p class="mt-10 text-medium --c-x-dark --w-regular">{{text.enter}}</p>
        <v-text-field class="border-bold mt-2 px-2 --border-r-2 --border-smoke"/>
        <div class="px-5 mt-6 mb-11">
            <v-btn class="text-medium --w-bold" @click="$emit('commit'), $emit('close')" color="primary" elevation="2" block rounded x-large>{{exchangeBtn.text}}</v-btn>
            <v-btn class="text-medium mt-3 --w-bold --c-prm" elevation="2" block rounded x-large>{{returnBtn.text}}</v-btn>
        </div>
    </div>
</v-dialog>
</template>

<script>
import IconDownIndicate from '@/components/icons/IconDownIndicate'

export default {
  name: 'ReservationCancellation',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IconDownIndicate
  },
  data () {
    return {
      text: {
        make: this.$t('text.reservationCancellation.make'),
        apply: this.$t('text.reservationCancellation.apply'),
        enter: this.$t('text.reservationCancellation.enter')
      },
      label: {
        requester: this.$t('common.requester'),
        replacement: this.$t('common.afterReplacment'),
        fiscalYear: this.$t('common.fiscalYear'),
        facility: this.$t('common.facility'),
        rank: this.$t('common.rank'),
        weekSpecialN: this.$t('common.weeklySpecialNumber'),
        exchangeFee: this.$t('common.exchangeFee'),
        yen: this.$t('reservationAndUsageHistory.yen')
      },
      exchangeFee: 5500,
      request: {
        fiscalYear: 2022,
        facility: '京都',
        rank: 'A',
        weekSpecialN: 12
      },
      replacement: {
        fiscalYear: 2022,
        facility: '軽井沢',
        rank: 'B',
        weekSpecialN: 28
      },
      exchangeBtn: {
        text: this.$t('buttons.reserveAndExchange')
      },
      returnBtn: {
        text: this.$t('buttons.return')
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

<style lang="scss" scoped>
.indicator {
    margin-top: -1px;
}
</style>

<template>
  <CommonModal
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <div class="px-6">
      <div class="mt-n5 mb-5 text-heading --w-bold --c-prm">{{ $t('buttons.reserveDiv') }}</div>
      <div class="text-title --c-medium-gray--w-bold mb-6">{{ $t('text.reserveDiv.select') }}</div>
      <v-radio-group v-model="choiceId">
        <div v-for="choice in choices" :key="choice.id">
          <v-row class="border-medium --border-r-2 --border-smoke ma-0 mb-2">
            <v-col cols="2" class="text-center bg-smoke --border-rl-2 pt-15">
              <v-radio :value="choice.id" />
            </v-col>
            <v-col>
              <v-row>
                <v-col cols="4" class="text-medium --c-prm --w-bold pa-0 pl-3 pt-2">
                  {{ choice.year }}{{ $t('common.year') }}
                </v-col>
              </v-row>
              <v-row class="mb-5 mr-0">
                <v-col
                  cols="3"
                  class="text-normal --c-x-dark --w-regular pa-0 pl-3 pt-2"
                >
                  {{ $t('common.state') }}
                </v-col>
                <v-col
                  class="text-normal text-left --c-prm --w-bold pb-0 pt-2 pl-0 pr-1"
                >
                  <div>{{ $t('common.firstPart') }}:{{ choice.state.firstPart }}</div>
                  <div>
                    {{ $t('common.secondPart') }}:{{ choice.state.secondPart.value }}
                    <span class="ml-2">
                      {{ choice.state.secondPart.year }}
                      {{ $t('common.year') }}
                      {{ choice.state.secondPart.week }}
                      {{ $t('common.week') }}
                    </span>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mb-2" />
              <v-row class="pb-3">
                <v-col cols="4" class="text-normal">{{ $t('common.deadlineForAcc') }}</v-col>
                <v-col class="text-medium --c-prm --w-bold pl-0 pb-0">{{ choice.deadLine }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-radio-group>
      <div class="text-medium --c-light-gray --w-bold">{{ $t('text.reserveDiv.selectRange') }}</div>
      <div class="text-medium my-3 --c-prm --w-bold">{{ $t('text.underMyWeek') }}</div>

      <v-btn
        block
        elevation="1"
        rounded
        @click="$emit('commit')"
        class="text-medium--w-bold py-6 mb-3"
        color="primary"
      >
        {{ $t('buttons.divideWholeReservation') }}
      </v-btn>
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-3"
        color="primary"
      >
        {{ $t('buttons.divideFirstHalfReservation') }}
      </v-btn>
      <v-btn
        block
        elevation="1"
        rounded
        class="text-medium--w-bold py-6 mb-3"
        color="primary"
      >
        {{ $t('buttons.divideSecondHalfReservation') }}
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
  name: 'ReservationDivision',
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
      choiceId: 1,
      choices: [{
        id: 0,
        year: 2022,
        state: {
          firstPart: 'デポジット',
          secondPart: {
            value: '軽井沢',
            year: 2023,
            week: 20
          }
        },
        deadLine: '2022/00/00'
      }, {
        id: 1,
        year: 2022,
        state: {
          firstPart: 'デポジット',
          secondPart: {
            value: '軽井沢',
            year: 2023,
            week: 20
          }
        },
        deadLine: '2022/00/00'

      }, {
        id: 2,
        year: 2022,
        state: {
          firstPart: 'デポジット',
          secondPart: {
            value: '軽井沢',
            year: 2023,
            week: 20
          }
        },
        deadLine: '2022/00/00'

      }, {
        id: 3,
        year: 2022,
        state: {
          firstPart: 'デポジット',
          secondPart: {
            value: '軽井沢',
            year: 2023,
            week: 20
          }
        },
        deadLine: '2022/00/00'
      }]
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

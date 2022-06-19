<template>
<v-dialog v-model="isVisible" max-width="378" content-class="bg-white text-center">
    <div class="text-right">
        <button @click.stop="$emit('close')" class="btn-close bg-primary">
            <div class="btn-close__icon" />
        </button>
    </div>
    <div class="px-6 pb-12">
        <h1 class="text-heading --c-prm">{{title}}</h1>
        <p class="text-subtitle text-left mt-4 --w-bold --c-medium-gray">{{label.selectExchange}}</p>
        <v-radio-group v-model="choiceId">
            <div v-for="choice in choices" :key="choice.id">
                <v-row class="border-medium --border-r-2 --border-smoke ma-0 mb-2">
                    <v-col cols="2" class="text-center bg-smoke --border-rl-2 pt-15">
                        <v-radio :value="choice.id" />
                    </v-col>
                    <v-col>
                        <p class="text-subtitle --w-bold --c-prm">{{choice.year}}{{label.year}}</p>
                        <v-row class="mt-0">
                            <v-col cols="3" class="pr-0 text-small --c-x-dark --w-regular">{{label.state}}</v-col>
                            <v-col cols="9" class="pr-0">
                                <p class="text-normal --c-prm --w-bold">{{label.firstPart}}:{{choice.firstPart}}</p>
                                <p class="text-normal --c-prm --w-bold">{{label.secondPart}}:{{choice.secondPart.text}}<span class="ml-2">{{choice.secondPart.date}}}</span></p>
                            </v-col>
                        </v-row>
                        <v-divider class="--border-light-gray mt-4 mb-2" />
                        <v-row>
                            <v-col class="pr-0 text-small --c-x-dark --w-regular">{{label.deadLine}}</v-col>
                            <v-col class="text-medium --c-prm --w-bold">{{choice.deadLine}}</v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-radio-group>
        <p class="text-subtitle --w-bold --c-medium-gray">{{label.selectRange}}</p>
        <p class="text-subtitle --w-bold --c-prm">{{label.underSelection}}</p>
        <div class="px-6">
            <v-btn block color="primary" @click="$emit('commitWhole'); $emit('close')" class="text-medium --w-bold mt-3" elevation="2" large rounded>{{wholeBtn.text}}</v-btn>
            <v-btn block color="primary" class="text-medium --w-bold mt-2" elevation="2" large rounded>{{firstBtn.text}}</v-btn>
            <v-btn block color="primary" class="text-medium --w-bold mt-2" elevation="2" large rounded>{{lateBtn.text}}</v-btn>
            <v-btn block class="text-medium --c-prm --w-bold mt-2" elevation="2" large rounded>{{returnBtn.text}}</v-btn>
        </div>
    </div>
</v-dialog>
</template>

<script>
export default {
  name: 'Complete',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      title: this.$t('common.bookExchange'),
      label: {
        selectExchange: this.$t('text.exchange.select'),
        year: this.$t('common.year'),
        state: this.$t('common.state'),
        firstPart: this.$t('common.firstPart'),
        secondPart: this.$t('common.secondPart'),
        deadLine: this.$t('common.deadlineForAcc'),
        selectRange: this.$t('text.exchange.selectRange'),
        underSelection: this.$t('text.exchange.underSelection')
      },
      choiceId: 1,
      choices: [{
        id: 0,
        year: 2022,
        firstPart: 'デポジット',
        secondPart: {
          text: '軽井沢',
          date: '2023年20週'
        },
        deadLine: '2022/00/00'

      }, {
        id: 1,
        year: 2022,
        firstPart: 'デポジット',
        secondPart: {
          text: '軽井沢',
          date: '2023年20週'
        },
        deadLine: '2022/00/00'

      }, {
        id: 2,
        year: 2022,
        firstPart: 'デポジット',
        secondPart: {
          text: '軽井沢',
          date: '2023年20週'
        },
        deadLine: '2022/00/00'
      }, {
        id: 3,
        year: 2022,
        firstPart: 'デポジット',
        secondPart: {
          text: '軽井沢',
          date: '2023年20週'
        },
        deadLine: '2022/00/00'
      }],
      wholeBtn: {
        text: this.$t('buttons.whole')
      },
      firstBtn: {
        text: this.$t('buttons.firstPart')
      },
      lateBtn: {
        text: this.$t('buttons.latePart')
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

<template>
<v-dialog v-model="isVisible" max-width="378" content-class="bg-white text-center">
    <div class="text-right">
        <button @click.stop="$emit('close')" class="btn-close bg-primary">
            <div class="btn-close__icon" />
        </button>
    </div>
    <div class="px-6 pb-12">
        <p class="text-medium --c-light-gray">{{label.numberPointRemain}}</p>
        <p class="text-max --w-bold --c-prm">{{point}}<span class="text-heading">{{label.point}}</span></p>
        <v-divider class="--border-light-gray"/>
        <v-row class="ma-0">
            <v-col class="text-left text-medium --c-light-gray">{{label.requiredPoint}}</v-col>
            <v-col class="text-left text-huge --c-prm --w-bold pt-0">{{requiredPoint}}<span class="text-medium">{{label.point}}</span></v-col>
        </v-row>
        <v-divider class="--border-light-gray"/>
        <v-row class="ma-0">
            <v-col class="text-left text-medium --c-light-gray">{{label.missingPoint}}</v-col>
            <v-col class="text-left text-huge --c-prm --w-bold pt-0">{{missingPoint}}<span class="text-medium">{{label.point}}</span></v-col>
        </v-row>
        <v-divider class="--border-light-gray"/>
        <v-btn color="primary" class="mt-6 text-medium --w-bold mb-3" @click="$emit('commit'), $emit('close')" block elevation="2" large rounded>{{frontBtn.text}}</v-btn>
        <v-btn color="primary" class="text-medium --w-bold mb-3" @click="$emit('commit'), $emit('close')" block elevation="2" large rounded>{{addBtn.text}}</v-btn>
        <v-btn class="text-medium --w-bold --c-prm" block elevation="2" large rounded>{{returnBtn.text}}</v-btn>
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
      label: {
        numberPointRemain: this.$t('common.numberOfPointsRemainingForThisYear'),
        point: this.$t('unit.point'),
        requiredPoint: this.$t('common.numberOfPointsRequired'),
        missingPoint: this.$t('common.missingPoint')
      },
      point: 180,
      requiredPoint: 200,
      missingPoint: 20,
      frontBtn: {
        text: this.$t('buttons.front')
      },
      addBtn: {
        text: this.$t('buttons.addPointName')
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

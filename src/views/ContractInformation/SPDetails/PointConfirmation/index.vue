<template>
  <CommonModal
    v-if="point != null"
    :visible="isVisible"
    :is-persistent="true"
    @close="$emit('close')"
  >
    <v-form ref="form">
      <div class="px-0 pt-3 pb-9">
        <div class="text-heading--c-prm--w-bold">
          {{ productTypeId | productNameJa }}
          <span class="text-medium--c-light-gray--w-regular">{{
              $t('common.the')
            }}</span>
        </div>
        <v-row class="ma-0">
          <v-col class="px-0 pb-0 text-huge--c-prm--w-bold">
            {{ point.points }}
            <span class="text-medium--w-regular ml-n2">{{ $t("unit.points") }}</span>
          </v-col>
          <v-col class="px-0 pb-0 text-huge--c-prm--w-bold">
            {{ confirmFrom }}
            <span class="text-medium--c-light-gray--w-regular ml-n2">{{
                $t("common.do")
              }}</span>
          </v-col>
        </v-row>
        <div class="text-large--c-prm--w-bold">
          <span class="text-medium--c-light-gray">
            {{ confirmFrom }}{{ $t("common.fee") }}
          </span>
          {{ price }}
          <span class="text-medium">{{ $t('common.beCharged') }}</span>
        </div>
      </div>
      <div class="px-6">
        <div class="--w-light--c-light-gray">{{ $t('common.pleaseEnterYourLoginPassword') }}</div>
        <v-text-field
          :rules="rules.password"
          @keydown.space.prevent
          v-model="point.password"
          type="password"
          class="mt-1 mb-8"
          solo
          hide-details="true"
        ></v-text-field>
      </div>
      <div class="px-5">
        <v-btn
          block
          elevation="1"
          @click="commit()"
          rounded
          class="text-medium--w-bold py-6 mb-2"
          color="primary"
        >
          {{ $t('common.xxThePointName', { pointName: pointName, XX: confirmFrom }) }}
        </v-btn>
        <v-btn block elevation="1" @click="$emit('close')" rounded class="text-medium--w-bold--c-prm py-6">
          {{ $t('buttons.return') }}
        </v-btn>
      </div>
    </v-form>
  </CommonModal>
</template>

<script>
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'PointConfirmation',
  components: {
    CommonModal
  },
  props: {
    point: Object,
    confirmFrom: String,
    productTypeId: Number,
    pointName: String,
    price: Number,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rules: {
        password: [
          v => !!v || this.$t('rules.isRequired')
        ]
      }
    }
  },
  methods: {
    commit () {
      if (this.$refs.form.validate()) {
        this.$emit('commit')
        this.$emit('close')
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

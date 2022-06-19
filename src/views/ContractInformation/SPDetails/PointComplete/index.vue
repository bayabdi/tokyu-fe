<template>
  <CommonModal
    v-if="point != null"
    v-model="isVisible"
    max-width="378"
    content-class="bg-white pb-6"
  >
    <div class="px-14 pt-3 pb-9">
      <p class="text-heading--c-prm--w-bold">
        {{ $t("common.schellingPoint") }}
        <span class="text-medium--c-light-gray--w-regular">{{ $t("common.the") }}</span>
      </p>
      <v-row class="ma-0">
        <v-col class="px-0 pb-0 text-huge--c-prm--w-bold">
          {{ point.points }}
          <span class="text-medium--w-regular ml-n2">{{ $t("unit.points") }}</span>
        </v-col>
        <v-col class="px-0 pb-0 text-huge--c-prm--w-bold">
          {{ productType }}
          <span class="text-medium--c-light-gray--w-regular ml-n2">{{ $t("common.do") }}</span>
        </v-col>
      </v-row>
    </div>
    <div class="px-12">
      <router-link to="/home">
        <v-btn
          block
          elevation="1"
          rounded
          class="text-medium--w-bold py-6 mb-2"
          color="primary"
        >
          {{ $t("buttons.backToTop") }}
        </v-btn>
      </router-link>
      <a v-if="pdfUrl.length > 0" :href="pdfUrl">
        <v-btn
          block
          elevation="1"
          rounded
          class="text-medium--w-bold py-6"
          color="primary"
        >
          {{ $t("buttons.showReceipts") }}
        </v-btn>
      </a>
    </div>
  </CommonModal>
</template>

<script>
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'PointComplete',
  components: {
    CommonModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    point: Object,
    pdfUrl: String,
    productType: String
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

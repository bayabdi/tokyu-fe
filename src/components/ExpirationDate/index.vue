<template>
  <div class="bg-white --border-r-1 mt-6 pb-6">
    <div
      v-if="withHead"
      class="bg-primary text-center py-3 --c-white --border-ru-1 text-heading--w-bold"
    >
      {{ $t("common.expiryDate", { pointName: productType }) }}
    </div>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{
          $t("common.startDeadLine")
        }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular">{{
          startOfTerm.replaceAll("-", "/")
        }}</v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{
          $t("common.endOfTerm")
        }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular">{{
          endOfTerm.replaceAll("-", "/")
        }}</v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{
          $t("common.remainingPointName", { pointName: productType })
        }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular"
      >{{ remainingPointName }}{{ $t("unit.point") }}</v-col
      >
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <div v-if="withButtons" class="mx-6 mt-10">
      <v-btn
        color="primary"
        @click="clickAdd()"
        block
        class="mt-4 py-7 text-heading --w-bold"
        elevation="2"
        rounded
      >{{ addBtn.text }}</v-btn
      >
    </div>
    <div v-if="withButtons" class="mx-6">
      <v-btn
        color="primary"
        @click="$emit('clickCarryOver')"
        block
        class="mt-4 py-7 text-heading --w-bold"
        elevation="2"
        rounded
      >{{
          $t("buttons.carryOverBtn", { pointName: productType })
          }}</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpirationDate',
  props: {
    withHead: Boolean,
    withButtons: Boolean,
    startOfTerm: String,
    endOfTerm: String,
    remainingPointName: Number,
    productType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      addBtn: {
        text: this.withHead ? this.$t('buttons.addPointName', { pointName: this.productType }) : this.$t('buttons.front', { pointName: this.productType })
      }
    }
  },
  methods: {
    clickAdd: function () {
      if (this.withHead) { this.$emit('clickAddHead') } else { this.$emit('clickAdd') }
    }
  }
}
</script>

<template>
  <div v-if="contract != null" class="py-12 px-8">
    <v-row>
      <v-col cols="4">
        <div class="text-sub-title--c-prm--w-bold">{{ $t("common.contract") }}</div>
      </v-col>
      <v-col>
        <div class="text-title--c-medium-gray--w-bold">
          {{ contract.productType.name }}
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="4">
        <div class="text-sub-title--c-prm--w-bold">
          {{ $t("common.contractNumber") }}
        </div>
      </v-col>
      <v-col>
        <div class="text-title--c-medium-gray--w-regular">
          {{ contract.contractNumber }}
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="4">
        <div class="text-sub-title--c-prm--w-bold">
          {{ $t("common.contractYears") }}
        </div>
      </v-col>
      <v-col>
        <div class="text-title--c-medium-gray--w-regular">
          {{ contract.years }}{{ $t("common.year") }}
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row v-if="withRightFac">
      <v-col cols="4">
        <div class="text-sub-title--c-prm--w-bold">
          {{ $t("common.rightsFacilities") }}
        </div>
      </v-col>
      <v-col>
        <div class="text-title--c-medium-gray--w-regular">
          {{ contract.rightFac }}
        </div>
      </v-col>
    </v-row>
    <v-divider v-if="withRightFac" class="my-4"></v-divider>
    <v-row v-if="withRightWeek">
      <v-col cols="4">
        <div class="text-sub-title--c-prm--w-bold">
          {{ $t("common.rightWeek") }}
        </div>
      </v-col>
      <v-col>
        <div class="text-title--c-medium-gray--w-regular">
          {{ contract.rightWeek }}{{ $t("common.week") }}
        </div>
      </v-col>
    </v-row>
    <v-divider v-if="withRightWeek" class="my-4"></v-divider>
    <v-row>
      <v-col cols="4">
        <div class="text-sub-title--c-prm--w-bold">
          {{ $t("common.contractExpirationDate") }}
        </div>
      </v-col>
      <v-col>
        <div class="text-title--c-medium-gray--w-regular">
          {{ contract.endDate | jaLongDate }}
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
  </div>
</template>

<script>
export default {
  name: 'ContractDetail',
  props: {
    withRightFac: {
      type: Boolean,
      default: false
    },
    withRightWeek: {
      type: Boolean,
      default: false
    },
    contract: Object
  }
}
</script>

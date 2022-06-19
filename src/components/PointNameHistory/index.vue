<template>
  <div class="bg-white --border-r-1 mt-6 pb-6">
    <p
      v-if="withHead"
      class="bg-primary text-center py-3 --c-white --border-ru-1 text-heading--w-bold"
    >
      {{ $t("common.pointNameHistory", { pointName: productType }) }}
    </p>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">
        {{ $t("common.dateAndTime") }}
      </v-col>
      <v-col class="text-title--c-medium-gray--w-regular">
        {{ time.split("T")[0].replaceAll("-", "/") }}
        {{
          time
            .split("T")[1]
            .split(".")[0]
            .slice(0, -3)
        }}
      </v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">
        {{ $t("common.startDeadLine") }}
      </v-col>
      <v-col class="text-title--c-medium-gray--w-regular">
        {{ startOfTerm.replaceAll("-", "/") }}
      </v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">
        {{ $t("common.endOfTerm") }}
      </v-col>
      <v-col class="text-title--c-medium-gray--w-regular">
        {{ endOfTerm.replaceAll("-", "/") }}
      </v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">
        {{ $t("common.remainingPointName", { pointName: productType }) }}
      </v-col>
      <v-col class="text-title--c-medium-gray--w-regular">
        {{ remainingPointName }} {{ $t("unit.point") }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PointNameHistory',
  props: {
    withHead: Boolean,
    time: String,
    startOfTerm: String,
    endOfTerm: String,
    remainingPointName: Number,
    productType: String
  }
}
</script>

<template>
  <div class="bg-white mt-7 pt-4 px-4 pb-4" v-show="contracts.length > 0">
    <div class="text-subtitle--c-prm--w-bold text-center mb-4">
      {{ $t("common.primeWeek") }}
    </div>
    <div v-for="contract in contracts" :key="contract.id" class="pb-7">
      <v-divider></v-divider>
      <div class="text-center mt-4 text-medium--c-medium-gray--w-regular">
        {{ $t("common.yearOfStartOfRightUse") }}
        <span class="ml-4 text-huge--c-prm--w-bold">
          <template v-if="contract.startDate">
            {{ contract.startDate.split("-")[0] }}
            {{ $t("common.year") }}
          </template>
          <template v-else>
            -
          </template>
        </span>
      </div>
      <v-row class="mt-7 mx-0">
        <v-col class="pa-0 pr-1">
          <div class="text-center text-medium--c-gray">
            {{ $t("common.rightsFacilities") }}
          </div>
          <div class="text-center text-large--c-prm--w-medium mt-4">
            {{ contract.mwPwRoomType.facility.name }}
          </div>
        </v-col>
        <v-divider class="--border-light-gray" vertical></v-divider>
        <v-col class="pa-0 px-2">
          <div class="text-medium--c-gray text-center">
            {{ $t("common.weeklySpecialNumber") }}
          </div>
          <div class="text-center text-max--c-prm--w-bold">
            {{ contract.mwPwWeekNumber }}
            <span class="text-large--c-prm--w-medium">{{ $t('common.week') }}</span>
          </div>
        </v-col>
        <v-divider vertical class="--border-light-gray"></v-divider>
        <v-col class="pa-0 pl-1">
          <div class="text-center text-medium--c-gray">
            {{ $t("common.roomType") }}
          </div>
          <div class="text-center text-large--c-prm--w-medium mt-4">
            {{ contract.mwPwRoomType.name }}
          </div>
        </v-col>
      </v-row>
      <div v-if="canSeeDetail" class="text-center mt-8">
        <router-link :to="'/home/contract-information/details/' + contract.id">
          <v-btn color="primary" elevation="2" large rounded>
            {{ $t("common.viewDetails") }}
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrimeWeek',
  props: ['contracts', 'canSeeDetail']
}
</script>

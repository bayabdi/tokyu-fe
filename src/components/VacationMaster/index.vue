<template>
  <div class="bg-white mt-7 pt-4 pb-4 px-4" v-show="contracts.length > 0">
    <div class="text-subtitle--c-prm--w-bold text-center mb-4">
      {{ $t("common.vacationMaster") }}
    </div>
    <div v-for="contract in contracts" :key="contract.id" class="pb-7">
      <v-divider></v-divider>
      <div class="text-center mt-4 text-medium--c-medium-gray--w-regular">
        {{ $t("common.yearOfStartOfRightUse") }}
        <span class="ml-4 text-huge--c-prm--w-bold">
          <template v-if="contract.startDate">
            {{ contract.startDate.split("-")[0] }}
            {{ $t('common.year') }}
          </template>
          <template v-else>
            -
          </template>
        </span>
      </div>

      <v-row class="mt-7">
        <v-col class="text-center">
          <div class="text-medium--c-medium-gray">
            {{ $t("common.rightsFacilities") }}
          </div>
          <div class="text-x-huge--c-prm--w-bold mt-2">
            <template v-if="contract.vmRoomType">
              {{ contract.vmRoomType.facility.name }}
            </template>
            <template v-else>
              -
            </template>
          </div>
        </v-col>
        <v-divider class="--border-light-gray" vertical></v-divider>
        <v-col class="text-center">
          <div class="text-medium--c-medium-gray">{{ $t("common.roomType") }}</div>
          <div class="text-x-huge--c-prm--w-bold mt-2">
            <template v-if="contract.vmRoomType">
              {{ contract.vmRoomType.name }}
            </template>
            <template v-else>
              -
            </template>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-7">
        <v-col class="text-center">
          <div class="text-medium--c-medium-gray">
            {{ $t("common.dateOfCommencementOfRightLodging") }}
          </div>
          <div class="text-large--c-prm--w-bold mt-2">
            {{ (contract.vmStayRightDate.startDate) | jaShortDateWithDow }}
          </div>
        </v-col>
        <v-col cols="2" class="pt-16">
          <v-divider class="border-bold--border-prm"></v-divider>
        </v-col>
        <v-col class="text-center">
          <div class="text-medium--c-medium-gray">
            {{ $t("common.endDateOfRightLodging") }}
          </div>
          <div class="text-large--c-prm--w-bold mt-2">
            {{ (contract.vmStayRightDate.endDate) | jaShortDateWithDow }}
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
  name: 'VacationMaster',
  props: ['contracts', 'canSeeDetail']
}
</script>

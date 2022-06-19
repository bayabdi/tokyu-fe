<template>
  <div class="bg-white mt-7 pt-4 pb-7 px-4" v-show="contracts.length > 0">
    <div class="text-subtitle--c-prm--w-bold text-center">
      {{ $t("common.myWeek") }}
    </div>

    <div v-for="contract in contracts" :key="contract.id">
      <v-divider class="mt-4"></v-divider>
      <v-row class="mt-1">
        <v-col cols="5" class="text-center pt-6">
          <div class="text-medium--c-medium-gray">
            {{ $t("common.contractYear") }}
          </div>
        </v-col>
        <v-col>
          <span class="ml-4 text-huge--c-prm--w-bold">
            <template v-if="contract.startDate">
              {{ contract.startDate.split("-")[0] }}
              {{ $t('common.year') }}
            </template>
            <template v-else>
              -
            </template>
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col class="text-center">
          <div class="text-medium--c-medium-gray--w-medium">
            {{ $t("common.rightsFacilities") }}
          </div>
          <div class="text-huge--c-prm--w-bold">
            {{ contract.mwPwRoomType.facility.name }}
          </div>
        </v-col>
        <v-col class="pt-10">
          <div class="text-huge--c-prm--w-bold">
            {{ contract.mwPwWeekNumber }}
            <span>{{ $t('common.week') }}</span>
          </div>
        </v-col>
      </v-row>
      <div v-if="canSeeDetail" class="text-center mt-8">
        <router-link :to="'/home/contract-information/Details/' + contract.id">
          <v-btn color="primary" elevation="2" large rounded>{{ $t('common.viewDetails') }}</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MyWeek',
  props: ['contracts', 'canSeeDetail']
}
</script>

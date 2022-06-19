<template>
  <div class="bg-white --border-r-1 mt-4 pb-6">
    <div
      class="bg-primary text-center py-3 --c-white --border-ru-1 text-heading--w-bold"
    >
      {{ checkinDate }}
    </div>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{ $t('common.reservationId') }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular">
        {{ reservationId }}
      </v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{ $t('common.facility') }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular">{{ facility }}</v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{ $t('common.checkinDate') }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular">{{ checkinDate }}</v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row class="px-6 py-4">
      <v-col class="text-medium--c-prm--w-bold">{{ $t('common.finalDate') }}</v-col>
      <v-col class="text-title--c-medium-gray--w-regular">{{ finalDate }}</v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <div class="mx-6">
      <a :href="'/home/usage-history/reservation-details/' + reservationId">
        <v-btn
          color="primary"
          block
          class="mt-4 py-6 text-heading --w-bold"
          elevation="2"
          rounded
        >
          {{ $t('buttons.reservationDetails') }}
        </v-btn>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VacationCard',
  props: {
    reservationId: Number,
    facility: String,
    checkinDate: String,
    finalDate: String
  }
}
</script>

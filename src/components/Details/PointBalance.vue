<template>
  <div class="pa-4 rounded p-relative bg-white">
    <v-container class="mb-2">
      <v-row>
        <v-col class="text-title --c-prm font-weight-bold pa-0">
          {{ $t('booking.pointsBalance') }}
        </v-col>
        <v-col class="text-title pa-0 text-right">
          {{ point | toThousands }}{{ $t('common.points') }}
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mb-4" color="#707070"></v-divider>
    <div class="--c-bg">{{ $t('booking.useAtCheckOut') }}</div>
  </div>
</template>

<script>
export default {
  name: 'PointBalance',
  props: {
    point: {
      String
    }
  }
}
</script>

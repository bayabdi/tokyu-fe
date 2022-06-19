<template>
  <div :class="{ 'bg-white rounded': !notWhiteBg }">
    <div class="pa-4 p-relative">
      <v-container>
        <v-row>
          <v-col class="text-title --c-prm font-weight-bold pa-0">
            {{ left }}
          </v-col>

          <v-col class="pa-0 " :class="aClass">
            {{ right }}
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-divider v-if="divider" class="mx-4 bg-medium-smoke"></v-divider>
  </div>
</template>

<script>
export default {
  name: 'ReservationDetailItem',
  props: {
    right: [Number, String],
    left: String,
    aClass: {
      String,
      default: ''
    },
    divider: {
      Boolean,
      default: false
    },
    notWhiteBg: {
      Boolean,
      default: false
    },
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>

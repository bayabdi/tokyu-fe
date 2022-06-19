<template>
  <div>
    <div class="bg-silver px-2 py-3">
      <v-row class="ma-0">
        <v-col
          v-for="rt in roomTypes"
          :key="rt.id"
          cols="4"
          class="border-bold --border-silver vertical-child-center"
          :class="getClass(rt)"
          @click="select(rt)"
        >
          <h4 class="--w-medium text-medium">{{ rt.name }}</h4>
        </v-col>
      </v-row>
    </div>
    <div class="triangle-down"/>
  </div>
</template>

<script>
export default {
  name: 'RoomTypeSelect',
  props: {
    roomTypes: Array,
    value: Number
  },
  methods: {
    getClass (roomType) {
      if (roomType.id === this.value) {
        return '--c-white bg-primary'
      } else if (roomType.priceAndAvailability.some(v => v.roomsAvailable > 0)) {
        return '--c-prm bg-white'
      } else {
        return '--c-smoke bg-white cursor-point'
      }
    },
    select (roomType) {
      this.$emit('input', roomType.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.triangle-down {
  width: 0;
  height: 0;
  margin: 0 auto;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid var(--color__silver);
}
</style>

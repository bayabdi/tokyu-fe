<template>
  <div>
    <v-divider></v-divider>
    <div class="bg-white py-5 px-4 d-flex">
      <div class="text-center">
        <h3
          class="item-circle bg-light-smoke text-heading --c-white ml-4 --w-regular"
          :class="{ 'bg-primary': stage === 1 }"
        >
          1
        </h3>
        <h4 class="mt-2 text-default --c-black --w-regular" :class="{ '--c-prm': stage === 1 }">
          {{ $t('text.stage.planSelection') }}
        </h4>
      </div>
      <v-divider class="mt-4" />
      <div class="text-center">
        <h3
          class="item-circle bg-light-smoke text-heading --c-white ml-3 --w-regular"
          :class="{ 'bg-primary': stage === 2 }"
        >
          2
        </h3>
        <h4 class="mt-2 text-default --c-black --w-regular" :class="{ '--c-prm': stage === 2 }">
          {{ $t('text.stage.reservationConfirmation') }}
        </h4>
      </div>
      <v-divider class="mt-4" />
      <div class="text-center">
        <h3
          class="item-circle bg-light-smoke text-heading --c-white ml-3 --w-regular"
          :class="{ 'bg-primary': stage === 3 }"
        >
          3
        </h3>
        <h4 class="mt-2 text-default --c-black --w-regular" :class="{ '--c-prm': stage === 3 }">
          {{ $t('text.stage.dataEntry') }}
        </h4>
      </div>
      <v-divider class="mt-4" />
      <div class="text-center">
        <h3
          class="item-circle bg-light-smoke text-heading --c-white ml-1 --w-regular"
          :class="{ 'bg-primary': stage === 4 }"
        >
          4
        </h3>
        <h4 class="mt-2 text-default --c-black --w-regular" :class="{ '--c-prm': stage === 4 }">
          {{ $t('text.stage.decision') }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stage',
  props: {
    stage: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.item-circle {
    width: 33px;
    height: 33px;
    border-radius: 50%;
}
</style>

<template>
  <div class="ma-6">
    <v-btn
      block
      outlined
      rounded
      @click="$emit('click')"
      class="bg-white py-6 text-heading --c-dark-red --w-bold"
    >{{ $t("buttons.partialCancellation") }}</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'CancellationButton'
}
</script>

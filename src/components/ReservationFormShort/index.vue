<template>
  <div class="bg-primary pt-6 pb-16 px-5 reservation-form-short">
    <h1 class="--c-white text-large">{{ $t("title.reservation") }}</h1>
    <v-select
      label="9月21日 - 9月23日"
      solo
      hide-details
      :height="70"
      class="mt-5"
    >
      <template v-slot:prepend-inner>
        <IconSelectDate :width="35" :height="35" class="mx-3" />
      </template>
    </v-select>
    <v-select
      label="禁煙ルーム"
      solo
      hide-details
      :height="70"
      class="my-4"
    >
      <template v-slot:prepend-inner>
        <IconFurniture :width="35" :height="35" class="mx-3" />
      </template>
    </v-select>
    <v-btn
      class="mt-5 py-6 --c-prm text-heading"
      @click="$emit('commit')"
      block
      rounded
    >
      {{ $t("buttons.reserveAndExchange") }}
    </v-btn>
  </div>
</template>

<script>
import IconSelectDate from '@/components/icons/IconSelectDate'
import IconFurniture from '@/components/icons/IconFurniture'

export default {
  components: {
    IconSelectDate,
    IconFurniture
  }
}
</script>

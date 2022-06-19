<template>
  <label class="d-flex align-center">
    {{ name }}
    <v-chip
      v-if="required"
      label
      small
      color="var(--color__pink)"
      class="text-small--c-white mx-2"
    >
      {{ $t("rules.required") }}
    </v-chip>

    <slot />
  </label>
</template>

<script>
export default {
  name: 'RequiredLabel',
  props: {
    name: String,
    required: {
      type: Boolean,
      default: true
    }
  }
}
</script>

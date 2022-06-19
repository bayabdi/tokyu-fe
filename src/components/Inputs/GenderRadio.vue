<template>
  <v-radio-group :value="value" v-on="$listeners" row class="mt-1" :rules="rules">
    <v-radio
      value="Male"
      :label="$t('common.male')"
      :ripple="false"
      class="mr-8"
    />
    <v-radio
      value="Female"
      :label="$t('common.female')"
      :ripple="false"
      class="mr-8"
    />
    <v-radio
      value="Other"
      :label="$t('common.other')"
      :ripple="false"
      class="text-medium-gray"
    />
  </v-radio-group>
</template>

<script>
export default {
  props: {
    value: String,
    rules: Array
  }
}
</script>

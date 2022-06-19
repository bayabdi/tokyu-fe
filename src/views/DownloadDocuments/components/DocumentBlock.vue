<template>
  <v-container class="bg-white mb-2">
    <v-row>
      <v-col class="text-medium --c-prm font-weight-bold  py-6">
        <slot/>
      </v-col>
      <v-col class="text-regular text-right pa-4">
        <a :href="url" target="_blank">
          <v-btn
            rounded
            height="44"
            class="mr-1 bg-primary ml-auto --c-white text-medium"
          >
            {{ $t('downloadDocuments.download') }}
          </v-btn>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DocumentBlock',
  props: {
    url: {
      String
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-btn {
    letter-spacing: 0 !important;
  }
}
</style>

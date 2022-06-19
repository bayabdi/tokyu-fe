<template>
  <div class="pa-4 bg-white rounded p-relative">
    <router-link
      :to="link"
      class="text-medium--c-prm font-weight-bold line--1 mb-3"
    >
      {{ title }}
    </router-link>

    <div class="d-flex">
      <router-link :to="link">
        <v-img
          :src="urlImg"
          width="73"
          height="73"
          max-width="73"
          lazy-src="@/assets/images/lazy-img.png"
          class="mr-3"
          alt="tokyu_vacations_news"
        ></v-img>
      </router-link>
      <p class="text-medium line--3 mr-8 mr-md-8 mr-lg-12 mt-n1">{{ description }}</p>
    </div>

    <v-btn :to="link" class="bg-primary hover-secondary rounded-ll">
      <v-icon class="--c-white">mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  props: {
    id: [Number, String],
    title: String,
    urlImg: String,
    description: String,
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 30px !important;
    height: 35px !important;
    border-radius: 5px 0 0 5px !important;
    min-width: auto !important;
  }
  a {
    .v-image:hover {
      opacity: 0.8;
    }
    &.text-medium--c-prm:hover {
      color: var(--color__secondary) !important;
    }
  }
}
</style>

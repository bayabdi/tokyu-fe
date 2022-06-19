<template>
  <footer class="bg-white">
    <div class="px-10 mb-7 mt-10">
      <a href="https://www.tokyu-vacations.com">
        <v-btn
          x-large
          rounded
          outlined
          class="btn-to-web mx-auto"
        >
          <Logo :width="140" :height="34"/>
          <span class="align-self-end text-small ml-3">{{ $t("buttons.officialWebsite") }}</span>
        </v-btn>
      </a>
    </div>
    <div class="d-flex align-center justify-center flex-wrap mb-10 px-5">
      <img
        class="mr-3 mb-2"
        src="@/assets/images/tokyu-sharing.png"
        alt="tokyu_corporation"
      />
      <img
        class="mb-2"
        src="@/assets/images/tokyu-railways.png"
        alt="tokyu_railways"
      />
    </div>
    <div class="bg-tertiary text-center text-small--c-white py-11 p-relative">
      <ButtonScrollTop />
      Copyright © Tokyu Corporation All Right Reserved
    </div>
  </footer>
</template>

<script>
import ButtonScrollTop from '@/components/ButtonScrollTop'
import Logo from '@/components/icons/Logo'

export default {
  name: 'AuthLayoutFooter',
  components: {
    ButtonScrollTop,
    Logo
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .btn-to-web {
    border-color: var(--color__primary) !important;
    background-color: var(--color__white) !important;
    display: flex;
    img {
      width: 140px;
    }
  }
  img.mb-2 {
    &:first-child {
      width: 180px;
    }
    &:last-child {
      width: 130px;
    }
  }
}
</style>

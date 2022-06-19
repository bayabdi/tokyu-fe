<template>
  <header>
    <v-img
      class="bg-header"
      position="bottom"
      src="@/assets/images/tokyu-vacations-bg.jpg"
      lazy-src="@/assets/images/lazy-img.png"
      alt="tokyu_vacations"
    >
      <div class="bg-header__content logo">
        <router-link to="/">
          <Logo />
        </router-link>
        <h2 class="text-title--c-white font-helvetica">Vacation会員ページ</h2>
      </div>
    </v-img>
  </header>
</template>

<script>
import Logo from '@/components/icons/Logo'

export default {
  name: 'AuthLayoutHeader',
  props: {
    className: String
  },
  components: { Logo }
}
</script>

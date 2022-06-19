<template>
  <header
    :class="{ '--scroll': isScrollHeader, 'header-home': isHomePage }"
    v-scroll="handleScrollHeader"
  >
    <div class="t-toolbar" :class="{ '--disable': isShowMenu }">
      <div
        class="t-toolbar__left align-self-stretch d-flex align-center"
        :class="{ '--border': $route.meta.whiteBackground }"
      >
        <router-link to="/home" class="t-toolbar__logo">
          <Logo :width="170" :height="41" />
          <span class="--c-gray t-toolbar__logo__postfix">{{ $t("title.membersOnlySite") }}</span>
        </router-link>
      </div>
      <div
        v-if="isHomePage"
        class="t-toolbar__greeting --c-white mt-auto mb-0 d-md-none pl-4 font-weight-bold"
      >
        <router-link to="/">
          <Logo />
        </router-link>
      </div>

      <v-btn
        color="var(--color__black)"
        class="ml-auto"
        @click.stop="isShowMenu = !isShowMenu"
      >
        <v-icon large color="var(--color__white)">mdi-menu</v-icon>
      </v-btn>
    </div>

    <nav v-show="isShowMenu" class="move-in-left" @scroll="handleScrollNav">
      <div class="text-right mb-0 mb-md-15 close-nav">
        <button
          @click.stop="isShowMenu = false"
          class="btn-close"
          :class="{ ' --scroll': isScrollNav }"
        >
          <div class="btn-close__icon" />
        </button>
      </div>
      <AppLayoutMenuList isHeader @close="isShowMenu = false" />
    </nav>
  </header>
</template>

<script>
import AppLayoutMenuList from './AppLayoutMenuList'
import Logo from '@/components/icons/Logo'
export default {
  name: 'AppLayoutHeader',
  components: {
    AppLayoutMenuList,
    Logo
  },
  computed: {
    userName () {
      return this.$store.state.user.name
    }
  },
  methods: {
    handleScrollNav (e) {
      if (typeof window === 'undefined') return
      const top = e.target.scrollTop || 0
      this.isScrollNav = top > 20
    },
    handleScrollHeader (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || 0
      this.isScrollHeader = top > 20
    }
  },
  watch: {
    // Check URL to show alert (Urgent-information) at HomePage only
    $route (to, from) {
      this.isHomePage = this.$route.path === '/home'
    }
  },
  data () {
    return {
      faq: process.env.VUE_APP_FAQ_URL,
      isShowMenu: false,
      isScrollNav: false,
      isScrollHeader: false,
      isHomePage: this.$route.path === '/home'
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/modules/variables-scss' as v;

header {
  overflow: hidden;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--color__white);
  .t-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.4s;
    &.--disable {
      opacity: 0;
    }
    &__left {
      padding-left: 20px;
      width: calc(100% - var(--height__header));
      &.--border {
        border-bottom: solid 1px var(--color__dark-smoke);
        border-left: solid 1px var(--color__dark-smoke);
      }
    }
    &__logo {
      display: inline-flex;

      svg {
        width: 145px;
        margin-top: 8px;
        margin-right: 8px;
      }

      &__postfix {
        margin-top: 22px;
      }
    }
  }
  &.header-home {
    background-color: transparent;
    .t-toolbar__left {
      display: none !important;
    }
  }
  &.--scroll {
    background-color: var(--color__white) !important;
    box-shadow: 0 15px 10px -20px var(--color__primary);
    .t-toolbar__left {
      display: flex !important;
      &.--border {
        border-bottom: solid 1px transparent;
        border-left: solid 1px transparent;
      }
    }
    .t-toolbar__greeting {
      display: none !important;
    }
  }
  nav {
    position: fixed;
    overflow-y: auto;
    overscroll-behavior: contain;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(v.$color__primary, 0.95);
    .close-nav {
      position: sticky;
      top: 0;
      z-index: 3;
      .btn-close {
        padding: 20px;
        width: 70px;
        height: 70px;
        &.--scroll {
          background-color: var(--color__primary);
        }
      }
    }
  }
}
::v-deep {
  .t-toolbar {
    .v-btn {
      width: var(--height__header) !important;
      height: var(--height__header) !important;
      border-radius: 0 !important;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .v-divider {
    border-color: var(--color__white) !important;
    border-style: dotted !important;
  }
}
</style>

<template>
  <header
    class="pt-2"
    :class="{ '--scroll': isScrollHeader }"
    v-scroll="handleScrollHeader"
  >
    <div class="t-toolbar">
      <div
        class="t-toolbar__left align-self-stretch align-center"
        :class="{ '--border': $route.meta.whiteBackground }"
      >
        <router-link to="/home">
          <Logo />
        </router-link>
        <span class="--c-gray">{{ $t("title.membersOnlySite") }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/icons/Logo'

export default {
  name: 'NoAuthLayoutHeader',
  props: {
    className: String
  },
  components: {
    Logo
  },
  data () {
    return {
      isScrollHeader: false,
      handleScrollHeader: false
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
    img {
      width: 145px;
      margin-right: 12px;
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

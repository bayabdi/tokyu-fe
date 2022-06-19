<template>
  <div class="t-breadcrumbs">
    <router-link to="/home">{{ $t("title.main") }}</router-link> >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs'
}
</script>

<style lang="scss" scoped>
.t-breadcrumbs {
  padding: 13px;
  * {
    color: var(--color__black) !important;
  }
  background-color: var(--color__smoke) !important;
  a:hover {
    color: var(--color__primary) !important;
  }
}
</style>

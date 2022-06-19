<template>
  <div class="company-info" :class="className">
    <div class="d-flex">
      <v-img
        contain
        max-width="142px"
        min-width="142px"
        src="@/assets/images/tokyu-vacations-logo.png"
        lazy-src="@/assets/images/tokyu-vacations-logo.png"
        alt="logo"
        class="d-inline"
      />
      <h3 class="font-weight-regular ml-2"> {{ $t('statement.companyAddress') }} </h3>
    </div>
    <div class="text-x-small">
      {{ $t("statement.companyNameText") }}
      <br />
      {{ $t("statement.addressText") }}
      <br />
      <span class="mr-12">TEL. 0267-62-1093</span>
      <span>FAX. 0267-41-1097</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfo',
  props: {
    className: String
  }
}
</script>

<style lang="scss" scoped>
.company-info {
  width: var(--width__company-info);
  flex-shrink: 0;
}
.text-x-small {
  line-height: 2;
}
h3 {
  font-size: var(--font-size__m-huge);
  margin-top: -7px;
}
</style>

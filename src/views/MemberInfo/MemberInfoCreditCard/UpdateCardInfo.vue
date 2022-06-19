<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/member-info">
        {{ $t("menu.main.membershipInformation") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-15">
      <div class="text-heading--c-prm text-center py-6">
        {{ $t("memberInfo.changeCreditCardInfo") }}
      </div>
      <card-form />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import CardForm from './CardForm.vue'

export default {
  name: 'UpdateCardInfo',
  components: {
    Breadcrumbs, CardForm
  }
}
</script>

<template>
  <div>
    <div class="pa-4 rounded-lg bg-white mb-7 mx-10">
      <h3 class="--c-dark-red font-weight-medium">
        {{ $t("authPage.needsCreditCard") }}
      </h3>
    </div>
    <div class="form-container px-5 pb-15">
      <card-form new-card />
    </div>
  </div>
</template>

<script>
import CardForm from './CardForm.vue'

export default {
  name: 'NewCardRegister',
  components: {
    CardForm
  }
}
</script>

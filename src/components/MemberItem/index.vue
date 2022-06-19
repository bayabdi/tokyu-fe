<template>
  <div class="rounded px-5 pt-4 pb-3 bg-white mb-3 text-center">
    <div class="d-flex align-center">
      <label class="text-medium--c-prm text-left font-weight-bold flex-shrink-0">
        {{ $t("common.memberName") }}
      </label>
      <span class="text-title--c-medium-gray font-weight-bold ml-7">{{ name }}</span>
    </div>
    <v-divider class="bg-smoke mt-4 mb-2" />
    <div class="d-flex align-center">
      <label class="text-medium--c-prm text-left font-weight-bold flex-shrink-0">
        {{ $t("title.login") }} <br /> {{ $t('common.emailAddress') }}
      </label>
      <span class="text-small--c-medium-gray text-left ml-7">{{ email }}</span>
    </div>

    <v-btn v-if="!disableChange"
      width="262"
      :to="`/home/member-info/member/${id}/`"
      x-large rounded class="bg-primary --c-white mb-3 mt-6">
      {{
        isDeputy
          ? $t("buttons.editDeputyMemberDetails")
          : $t("buttons.editFamilyMemberDetails")
      }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MemberItem',
  props: {
    id: [String, Number],
    name: String,
    email: String,
    disableChange: Boolean,
    isDeputy: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  div.d-flex {
    label {
      width: 112px;
    }
    > span {
      word-break: break-all;
    }
  }
</style>

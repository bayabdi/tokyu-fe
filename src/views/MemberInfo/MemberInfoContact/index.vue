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
      <div class="text-heading --w-bold --c-prm text-center py-6">
        {{ $t("memberInfo.changeContactInformation") }}
      </div>

      <v-form ref="form" lazy-validation class="bg-white rounded px-5 py-7">
        <!-- START Postal-code -->
        <label for="postalCode">{{ $t("common.postalCode") }}</label>
        <postal-code-input id="postalCode"  v-model="mainContact.postalCode" class="mt-3"/>
        <!-- END Postal-code -->

        <!-- State/Province -->
        <label for="prefecture">{{ $t("common.province") }}</label>
        <v-text-field
          id="prefecture"
          :rules="rules.text"
          v-model="mainContact.prefecture"
          x-large
          solo
          type="text"
          class="mt-2"
        />
        <!-- -------------- -->

        <!-- City/District-->
        <label for="locality">{{ $t("common.district") }}</label>
        <v-text-field
          id="locality"
          :rules="rules.text"
          v-model="mainContact.locality"
          x-large
          solo
          type="text"
          class="mt-2"
        />
        <!-- ------------- -->

        <label for="address1">{{ $t("common.street") }}</label>
        <v-text-field
          for="address1"
          :rules="rules.text"
          v-model="mainContact.address1"
          x-large
          solo
          type="text"
          class="mt-2"
        />

        <!-- Building/Apartment name, etc. -->
        <label for="address2">{{ $t("common.buildingName") }}</label>
        <v-text-field
          id="address2"
          v-model="mainContact.address2"
          x-large
          solo
          type="text"
          class="mt-2"
        />
        <!-- ----------------------------- -->

        <label for="phoneNumber">{{ $t("common.phoneNumber") }}</label>
        <v-text-field
          id="phoneNumber"
          :rules="rules.phoneNumber"
          v-model="mainContact.mobile"
          placeholder="000-123-1234"
          x-large
          solo
          type="text"
          class="mt-2"
        />

        <label for="email">{{ $t("common.emailAddress") }}</label>
        <v-text-field
          id="email"
          :rules="rules.email"
          v-model="mainContact.email"
          x-large
          solo
          type="email"
          class="mt-2"
        />
        <div class="--w-medium text-normal">
          {{ $t("memberInfo.description") }}
        </div>
      </v-form>

      <v-btn
        @click="submitForm"
        x-large
        rounded
        block
        class="bg-primary text-heading--c-white mt-6"
      >
        {{ $t("buttons.save") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import PostalCodeInput from '@/components/Inputs/PostalCodeInput.vue'
import {
  checkPhoneNumber,
  checkEmail,
  checkPostalCode
} from '@/utils/validate'

export default {
  name: 'MemberInfoContact',
  components: {
    Breadcrumbs,
    PostalCodeInput
  },
  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateMyMainContact', {
          apollo: this.$apollo,
          postalCode: this.mainContact.postalCode,
          mobile: this.mainContact.mobile,
          email: this.mainContact.email,
          prefecture: this.mainContact.prefecture,
          locality: this.mainContact.locality,
          address1: this.mainContact.address1,
          address2: this.mainContact.address2
        })
          .then(data => {
            window.location = '/home/member-info'
          })
      }
    }
  },
  computed: {
    mainContact () {
      return this.$store.state.memberInfo.mainContact
    }
  },
  mounted () {
    this.$store.dispatch('getMainContact', {
      apollo: this.$apollo
    })
  },
  data () {
    return {
      rules: {
        text: [
          v => !!v || this.$t('rules.isRequired'),
          v => v?.trim().length < 70 || this.$t('rules.invalid')
        ],
        postalCode: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkPostalCode(v) || this.$t('rules.invalid')
        ],
        phoneNumber: [
          v => !!v || this.$t('rules.isRequired'),
          v =>
            checkPhoneNumber(v) || this.$t('rules.invalid')
        ],
        email: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkEmail(v) || this.$t('rules.invalid')
        ]
      }
    }
  }
}
</script>

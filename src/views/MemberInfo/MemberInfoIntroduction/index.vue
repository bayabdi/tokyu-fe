<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/member-info">
        {{ $t("menu.main.membershipInformation") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>

    <div class="form-container pb-15 px-8 pt-7">
      <template v-if="!isSending">
        <p class="text-title--c-dark">
          {{ $t("memberInfo.introductionTextList.line1") }}
        </p>
        <p class="text-title--c-dark my-5">
          {{ $t("memberInfo.introductionTextList.line2") }}
        </p>
        <p class="text-title--c-dark">
          {{ $t("memberInfo.introductionTextList.line3") }}
        </p>

        <h2 class="mt-14 mb-10 text-heading--c-prm">
          {{ $t("memberInfo.enterFriendInfo") }}
        </h2>
        <!-- START Sending-form -->
        <v-form ref="form" lazy-validation>
          <label for="name"> {{ $t("common.name") }} </label>
          <v-text-field
            id="name"
            :rules="rules.text"
            v-model="name"
            x-large
            solo
            type="text"
            class="mt-2"
          />

          <label for="hiragana"> {{ $t("common.hiragana") }} </label>
          <v-text-field
            id="hiragana"
            :rules="rules.text"
            v-model="hiragana"
            x-large
            solo
            type="text"
            class="mt-2"
          />

          <label for="phoneNumber">{{ $t("common.phoneNumber") }}</label>
          <v-text-field
            id="phoneNumber"
            :rules="rules.phoneNumber"
            v-model="phoneNumber"
            placeholder="000-123-1234"
            x-large
            solo
            type="tel"
            class="mt-2"
          />
        </v-form>
        <!-- END Sending-form -->

        <!-- Sending-button -->
        <div class="text-center">
          <v-btn
            @click="submitForm"
            x-large
            rounded
            block
            class="bg-primary text-heading --c-white mt-3"
          >
            {{ $t("buttons.sending") }}
          </v-btn>
        </div>
        <!-- --------------- -->
      </template>

      <!-- ====== If form has been sent ====== -->
      <template v-else>
        <h3 class="text-title--c-prm pb-5">
          {{ $t("memberInfo.thankYouForIntro") }}
        </h3>
        <p class="text-title--c-dark">
          {{ $t("memberInfo.thanhYouForIntroDescription") }}
        </p>
        <div class="text-center">
          <v-btn
            @click="isSending = false"
            x-large
            rounded
            block
            class="bg-white text-heading--c-prm mt-5"
          >
            {{ $t("buttons.return") }}
          </v-btn>
        </div>
      </template>
      <!-- =================================== -->
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  checkPhoneNumber
} from '@/utils/validate'

export default {
  name: 'MemberInfoIntroduction',
  components: {
    Breadcrumbs
  },
  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('sendReferenceFutureClient', {
          apollo: this.$apollo,
          name: this.name,
          kana: this.hiragana,
          tel: this.phoneNumber
        }).then(res => {
          setTimeout(() => {
            this.isSending = true
          }, 2000)
        })
      }
    }
  },
  data () {
    return {
      name: null,
      hiragana: null,
      phoneNumber: null,

      isSending: false,
      rules: {
        text: [
          v => !!v || this.$t('rules.isRequired'),
          v => v?.trim().length < 25 || this.$t('rules.invalid')
        ],
        phoneNumber: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkPhoneNumber(v) || this.$t('rules.invalid')
        ]
      }
    }
  }
}
</script>

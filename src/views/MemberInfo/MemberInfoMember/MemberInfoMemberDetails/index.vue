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
      <!--================ START Login-information ================-->
      <div class="text-heading --w-bold --c-prm text-center pt-6 pb-3">
        {{ $t("memberInfo.changeDeputyMemberLoginInfo") }}
      </div>
      <v-form
        ref="loginInfoForm"
        lazy-validation
        class="bg-white rounded px-5 py-7"
      >
        <!-- START Email -->
        <RequiredLabel for="email" :name="$t('common.emailAddress')" />
        <v-text-field
          id="email"
          :rules="rules.email"
          v-model="loginEmail"
          x-large
          solo
          type="email"
          class="mt-3"
          autocomplete="new-password"
        />
        <!-- END Email -->

        <!-- START Password -->
        <RequiredLabel for="password" :name="$t('common.password')" />
        <v-text-field
          id="password"
          :rules="rules.password"
          @keydown.space.prevent
          solo
          type="password"
          v-model="password"
          class="mt-3"
          autocomplete="new-password"
        />
        <!-- End Password -->

        <div class="text-center">
          <!-- START Save-login-info Button -->
          <v-btn
            @click="saveLoginInfoForm"
            x-large
            rounded
            width="270"
            class="bg-primary text-medium--c-white mt-1 mx-auto"
          >
            {{ $t("buttons.save") }}
          </v-btn>
          <!-- END Save-login-info Button -->
        </div>
      </v-form>
      <!--================ END Login-information ================-->

      <!--================ START Member-information ================-->
      <div class="text-heading --w-bold --c-prm text-center pt-6 pb-3">
        {{ $t("memberInfo.changeDeputyMemberInfo") }}
      </div>
      <v-form
        ref="memberInfoForm"
        lazy-validation
        class="bg-white rounded px-5 py-7"
      >
        <!-- START Name -->
        <RequiredLabel :name="$t('common.yourName')" />
        <div class="d-flex mt-3">
          <v-text-field
            :rules="rules.name"
            v-model="surname"
            :placeholder="$t('common.surname')"
            x-large
            solo
            type="text"
            class="mr-2"
          />
          <v-text-field
            :rules="rules.name"
            v-model="firstName"
            :placeholder="$t('common.firstName')"
            x-large
            solo
            type="text"
            class="ml-2"
          />
        </div>
        <!-- END Name -->

        <!-- START Katakana-name -->
        <RequiredLabel :name="$t('common.katakana')" />
        <div class="d-flex mt-3">
          <v-text-field
            :rules="rules.name"
            v-model="surnameKana"
            :placeholder="$t('common.sei')"
            x-large
            solo
            type="text"
            class="mr-2"
          />
          <v-text-field
            :rules="rules.name"
            v-model="firstNameKana"
            :placeholder="$t('common.mei')"
            x-large
            solo
            type="text"
            class="ml-2"
          />
        </div>
        <!-- END Katakana-name -->

        <!-- START Date-of-birth -->
        <RequiredLabel :name="$t('common.dateOfBirth')">
          <span class="--c-red"> {{ $t("rules.childrenAge") }} </span>
        </RequiredLabel>
        <div class="d-flex mt-3">
          <v-select
            :items="yearList"
            :rules="rules.isRequired"
            v-model="yearOfBirth"
            solo
            class="year-select"
          />
          <label class="mt-9 mx-2"> {{ $t("common.year") }} </label>
          <v-select
            :items="monthList"
            :rules="rules.isRequired"
            v-model="monthOfBirth"
            solo
          />
          <label class="mt-9 mx-2"> {{ $t("common.month") }} </label>
          <v-select
            :items="dayList"
            :rules="rules.isRequired"
            v-model="dayOfBirth"
            solo
          />
          <label class="mt-9 mx-2"> {{ $t("common.day") }} </label>
        </div>
        <!-- END Date-of-birth -->

        <!-- START Relationship -->
        <RequiredLabel :name="$t('common.relationship')" />
        <enum-select
          v-model="relationship"
          enum-name="relationships"
          class="mt-3"
          required
        />
        <!-- END Relationship -->

        <!-- START Gender -->
        <label> {{ $t("common.gender") }} </label>
        <v-radio-group v-model="gender"
            :rules="rules.isRequired" row class="mt-1">
          <v-radio
            value="Male"
            :label="$t('common.male')"
            :ripple="false"
            class="mr-8"
          />
          <v-radio
            value="Female"
            :label="$t('common.female')"
            :ripple="false"
            class="mr-8"
          />
          <v-radio
            value="Other"
            :label="$t('common.other')"
            :ripple="false"
            class="text-medium-gray"
          />
        </v-radio-group>
        <!-- END Gender -->

        <!-- Checbox -> Use the same address as a regular member -->
        <v-checkbox
          v-model="isUsingSameAddress"
          :label="$t('memberInfo.useSameAddressAsMember')"
          :ripple="false"
          hide-details
          class="mt-0 mb-12"
        />

        <template v-if="!isUsingSameAddress">
          <!-- START Postal-code -->
          <RequiredLabel :name="$t('common.postalCode')" />
          <label class="--c-medium-gray d-inline-block mt-1">
            {{ $t("rules.hyphenInHalfWidthNumbersNotice") }}
          </label>
          <div class="d-flex">
            <postal-code-input v-model="postalCode" class="mt-3"/>
            <v-btn rounded large class="bg-primary --c-white ml-5 mr-10 mt-5">
              {{ $t("buttons.findAnAddress") }}
            </v-btn>
          </div>
          <!-- END Postal-code -->

          <!-- START State/prefecture -->
          <RequiredLabel :name="$t('common.province')" />
          <enum-select
            v-model="prefecture"
            enum-name="prefectures"
            select-name
            class="mt-3"
            required
          />
          <!-- END State/prefecture -->

          <!-- START City/locality -->
          <RequiredLabel :name="$t('common.district')" />
          <v-text-field
            :rules="rules.text"
            v-model="locality"
            x-large
            solo
            type="text"
            class="mt-3"
          />
          <!-- END City/locality -->

          <!-- START address1 -->
          <RequiredLabel :name="$t('common.street')" />
          <v-text-field
            :rules="rules.text"
            v-model="address1"
            x-large
            solo
            type="text"
            class="mt-3"
          />
          <!-- END address1 -->

          <!-- START Building/Apartment name, etc. -->
          <RequiredLabel :required="false" :name="$t('common.buildingName')" />
          <v-text-field
            :rules="rules.optionalText"
            v-model="address2"
            x-large
            solo
            type="text"
            class="mt-2"
          />
          <!-- START Building/Apartment name, etc. -->
        </template>

        <!-- START Phone-number -->
        <RequiredLabel :name="$t('common.phoneNumber')" />
        <label class="--c-medium-gray d-inline-block mt-1">
          {{ $t("rules.hyphenInHalfWidthNumbersNotice") }}
        </label>
        <v-text-field
          :rules="rules.phoneNumber"
          v-model="tel"
          placeholder="000-123-1234"
          x-large
          solo
          type="text"
          class="mt-3"
        />
        <!-- END Phone-number -->

        <!-- START Email-address -->
        <RequiredLabel :name="$t('common.emailAddress')" />
        <v-text-field
          :rules="rules.email"
          v-model="email"
          x-large
          solo
          type="email"
          class="mt-2"
        />
        <!-- END Email-address -->

        <div class="text-center">
          <!-- START Save-member-info Button -->
          <v-btn
            @click="saveMemberInfoForm"
            x-large
            rounded
            width="270"
            class="bg-primary text-medium--c-white mt-5 mx-auto"
          >
            {{ $t("buttons.save") }}
          </v-btn>
          <!-- END Save-member-info Button -->

          <!-- START Delete-this-member Button -->
          <v-btn
            @click="deleteThisMember"
            :disabled="isNew"
            x-large
            rounded
            width="270"
            class="bg-dark-red text-medium--c-white my-9 mx-auto"
          >
            {{ $t("buttons.deleteThisMember") }}
          </v-btn>
          <!-- END Delete-this-member Button -->
        </div>
      </v-form>
      <!--================ START Member-information ================-->
    </div>
  </div>
</template>

<script>
import {
  checkPassword,
  checkEmail,
  checkPhoneNumber
} from '@/utils/validate'
import { getYearListOfAge, getDaysInMonth } from '@/utils/get-date'
import Breadcrumbs from '@/components/Breadcrumbs'
import RequiredLabel from '@/components/RequiredLabel'
import EnumSelect from '@/components/EnumSelects/EnumSelect.vue'
import { splitName } from '@/utils/string'
import PostalCodeInput from '@/components/Inputs/PostalCodeInput.vue'

export default {
  name: 'MemberInfoMemberDetail',
  components: {
    Breadcrumbs,
    RequiredLabel,
    EnumSelect,
    PostalCodeInput
  },
  async mounted () {
    await this.$store.dispatch('getMainContact', { apollo: this.$apollo })
    if (!this.isNew) {
      await this.$doLoading(async () => {
        const member = await this.$store.dispatch('mySubMember', parseInt(this.id, 10))
        this.subMemberTypeId = member.subMemberTypeId
        this.loginEmail = member.memberUser?.email
        const kanji = splitName(member.name)
        this.surname = kanji.surname
        this.firstName = kanji.firstName
        const kana = splitName(member.nameKana)
        this.surnameKana = kana.surname
        this.firstNameKana = kana.firstName
        const bDaySplit = member.birthday?.split('-') ?? []
        this.yearOfBirth = parseInt(bDaySplit[0])
        this.monthOfBirth = parseInt(bDaySplit[1])
        this.dayOfBirth = parseInt(bDaySplit[2])
        this.relationship = member.relationshipId
        this.gender = member.sex
        this.postalCode = member.postalCode
        this.prefecture = member.prefecture
        this.locality = member.locality
        this.address1 = member.address1
        this.address2 = member.address2
        this.tel = member.tel
        this.email = member.email
      })
    }
  },
  computed: {
    yearList () {
      return getYearListOfAge(18)
    },
    dayList () {
      if (!this.yearOfBirth || !this.monthOfBirth) return [...Array(31)].map((_, i) => i)

      const daysInMonth = new Date(this.yearOfBirth, this.monthOfBirth, 0).getDate()
      const dayList = getDaysInMonth(daysInMonth)
      if (this.dayOfBirth && !dayList.includes(this.dayOfBirth)) {
        this.dayOfBirth = null
      }
      return dayList
    },
    monthList () {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    name () {
      return `${this.surname || ''} ${this.firstName}`
    },
    nameKana () {
      return `${this.surnameKana || ''} ${this.firstNameKana || ''}`
    },
    birthday () {
      return `${this.yearOfBirth}-${String(this.monthOfBirth).padStart(2, '0')}-${String(this.dayOfBirth).padStart(2, '0')}`
    },
    baseInfo () {
      let vars = {
        name: this.name,
        nameKana: this.nameKana,
        birthday: this.birthday,
        relationshipId: this.relationship,
        sex: this.gender,
        email: this.email,
        tel: this.tel,
        postalCode: this.postalCode,
        prefecture: this.prefecture,
        locality: this.locality,
        address1: this.address1,
        address2: this.address2
      }

      if (this.isUsingSameAddress) {
        vars = {
          ...vars,
          postalCode: this.$store.state.memberInfo.mainContact.postalCode,
          prefecture: this.$store.state.memberInfo.mainContact.prefecture,
          locality: this.$store.state.memberInfo.mainContact.locality,
          address1: this.$store.state.memberInfo.mainContact.address1,
          address2: this.$store.state.memberInfo.mainContact.address2
        }
      }
      return vars
    },
    loginInfo () {
      return {
        email: this.loginEmail,
        password: this.password
      }
    }
  },
  methods: {
    // Form-submit ---------
    async saveLoginInfoForm () {
      if (this.$refs.loginInfoForm.validate()) {
        await this.$doLoading(async () => {
          try {
            if (this.isNew) {
              await this.$showGqlError(
                await this.$store.dispatch('createMySubMemberInfo', {
                  subMemberTypeId: this.subMemberTypeId,
                  memberUser: this.loginInfo
                })
              )
            } else {
              await this.$showGqlError(
                await this.$store.dispatch('updateMySubMemberInfo', {
                  subMemberTypeId: this.subMemberTypeId,
                  id: this.id,
                  memberUser: this.loginInfo
                })
              )
            }

            await this.$router.push('/home/member-info/member')
          } catch (e) {}
        })
      }
    },
    async saveMemberInfoForm () {
      if (this.$refs.memberInfoForm.validate()) {
        await this.$doLoading(async () => {
          try {
            if (this.isNew) {
              await this.$showGqlError(
                await this.$store.dispatch('createMySubMemberInfo', {
                  subMemberTypeId: this.subMemberTypeId,
                  baseInfo: this.baseInfo
                })
              )
            } else {
              await this.$showGqlError(
                await this.$store.dispatch('updateMySubMemberInfo', {
                  subMemberTypeId: this.subMemberTypeId,
                  id: this.id,
                  baseInfo: this.baseInfo
                })
              )
            }

            await this.$router.push('/home/member-info/member')
          } catch (e) {}
        })
      }
    },
    async deleteThisMember () {
      await this.$doLoading(async () => {
        await this.$showGqlError(
          await this.$store.dispatch('deleteMySubMember', this.id)
        )
        await this.$router.push('/home/member-info/member')
      })
    }
  },
  data () {
    return {
      id: Number(this.$route.params.id),
      isNew: !Number(this.$route.params.id),
      subMemberTypeId: 2,
      loginEmail: null,
      password: null,
      email: null,
      surname: null,
      firstName: null,
      surnameKana: null,
      firstNameKana: null,
      yearOfBirth: null,
      monthOfBirth: null,
      dayOfBirth: null,
      relationship: null,
      gender: null,
      isUsingSameAddress: false,
      postalCode: null,
      prefecture: null,
      locality: null,
      address1: null,
      address2: null,
      tel: null,

      rules: {
        isRequired: [v => !!v || this.$t('rules.isRequired')],
        text: [
          v => v?.trim().length < 70 || this.$t('rules.invalid'),
          v => !!v || this.$t('rules.isRequired')
        ],
        optionalText: [
          v => !v || v?.trim().length < 70 || this.$t('rules.invalid')
        ],
        email: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkEmail(v) || this.$t('rules.invalid')
        ],
        password: [
          v => !!v || this.$t('rules.isRequired'),
          v => checkPassword(v) || this.$t('rules.passwordRules')
        ],
        name: [
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

<style lang="scss" scoped>
::v-deep {
  .year-select {
    min-width: 93px !important;
  }
  .v-input--checkbox {
    i {
      font-size: var(--font-size__huge);
    }
    label {
      font-weight: var(--font-weight__bold) !important;
      color: var(--color__dark);
    }
  }
  .v-radio {
    label {
      font-weight: var(--font-weight__medium) !important;
      color: var(--color__medium-gray) !important;
    }
  }
}
</style>

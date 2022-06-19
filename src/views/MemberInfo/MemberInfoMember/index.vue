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
      <!-- START Deputy-member -->
      <template v-if="hasViceMember">
        <div class="text-heading --w-bold --c-prm text-center pt-6 pb-3">
          {{ $t("memberInfo.deputyMember") }}
        </div>
        <div v-for="item in viceMembers" :key="item.id">
          <MemberItem
            :id="item.id"
            :isDeputy="true"
            :name="item.name"
            :email="item.memberUser && item.memberUser.email"
            disable-change
          />
        </div>
      </template>
      <!-- END Deputy-member -->

      <!--========== START Family-members ==========-->
      <div class="text-heading --w-bold --c-prm text-center pt-6 pb-3">
        {{ $t("memberInfo.familyMember") }}
      </div>
      <div v-for="item in familyMembers" :key="item.id">
        <MemberItem
          :id="item.id"
          :name="item.name"
          :email="item.memberUser && item.memberUser.email"
        />
      </div>

      <!-- Button-add-family-member -->
      <v-btn
        x-large
        :to="`/home/member-info/member/new/`"
        rounded
        block
        class="bg-primary --c-white mt-5"
      >
        <v-icon class="mr-3">mdi-plus</v-icon>
        {{ $t("buttons.addFamilyMembers") }}
      </v-btn>
      <!--========== END Family-members ============-->
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import MemberItem from '@/components/MemberItem'

export default {
  name: 'MemberInfoMember',
  components: {
    Breadcrumbs,
    MemberItem
  },
  mounted () {
    this.$doLoading(() => this.$store.dispatch('mySubMemberList', {
      apollo: this.$apollo
    }))
  },
  computed: {
    mySubMemberList () {
      return this.$store.state.memberInfo.mySubMemberList
    },
    viceMembers () {
      return this.mySubMemberList.filter(m => m.subMemberTypeId === 1)
    },
    hasViceMember () {
      return !!this.viceMembers.length
    },
    familyMembers () {
      return this.mySubMemberList.filter(m => m.subMemberTypeId === 2)
    }
  }
}
</script>

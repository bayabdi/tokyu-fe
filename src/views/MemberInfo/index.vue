<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-13">
      <h2 class="--c-prm text-center pt-6 pb-3">
        {{ $route.meta.title }}
      </h2>
      <!-- START Member-card -->
      <v-img
        src="@/assets/images/credit-card.jpg"
        max-width="355"
        max-height="232"
        class="mx-auto py-4 rounded-13 px-6"
      >
        <div class="--c-light-gray"> TOKYU VACATIONS Member </div>
        <div class="text-huge --c-white --w-light d-flex pos-absolute top-30 flex-column">
          {{ memberCard.name }}
          <span class="text-title --c-d-yellow">
            No.{{ memberCard.memberId }}
          </span>
        </div>
      </v-img>
      <!-- END Member-card  -->

      <div class="text-center">
        <v-btn
          to="/login/forgot-password"
          x-large
          rounded
          class="bg-primary text-title--c-white my-7 w-100"
        >
          {{ $t("menu.main.items.changePassword") }}
        </v-btn>
      </div>

      <!-- START Vacations-points -->
      <div
        v-if="$isMainUser() || $isSubUser()"
        class="rounded text-center pt-8 pb-7 px-5 bg-white"
      >
        <div class="text-heading --w-bold--c-prm">
          {{ $t("memberInfo.vacationsPoints") }}
        </div>
        <v-divider class="bg-gray--light my-2" />
        <div class="--c-prm font-weight-bold">
          <span class="text-huge">{{ totalVacationsPoints | toThousands }}</span>
          <span class="text-medium">{{
              Math.abs(totalVacationsPoints) > 1
                ? $t("unit.points")
                : $t("unit.point")
            }}</span>
        </div>
      </div>
      <!-- END Vacations-points -->

      <div v-if="$isMainUser() || $isSubUser()">
        <!-- START Vacations-points-history -->
        <h2 class="--c-prm mt-7 mb-3 text-center">
          {{ $t("memberInfo.vacationsPointsHistory") }}
        </h2>
        <VacationsHistoryItem
          v-for="item in items"
          :key="item.id"
          :dateAndTime="
            item.createdAt.slice(0, 10) + ' ' + item.createdAt.slice(11, 16)
          "
          :pointName="item.changeReason"
          :points="item.pointChange"
        />

        <div class="text-center">
          <v-btn
            @click="loadList"
            rounded
            height="39"
            class="bg-white pl-7 pr-7"
          >
            {{ $t("reservationAndUsageHistory.seeMore") }}
          </v-btn>
        </div>
        <!-- END Vacations-points-history -->
      </div>

      <div class="rounded pa-5 mt-3 bg-white">
        <!-- START Contact -->
        <h2 class="--c-prm text-center">
          {{ $t("common.contactAddress") }}
        </h2>
        <v-divider class="bg-gray--light mt-2 mb-5" />
        <div class="text-title">
          <h4 class="--c-prm">{{ $t("common.telephone") }}</h4>
          {{ mainContact.mobile }}
          <h4 class="--c-prm mt-5">{{ $t("common.emailAddress") }}</h4>
          {{ mainContact.email }}
          <h4 class="--c-prm mt-5">{{ $t("common.sendingAddress") }}</h4>
          <span class="text-medium">{{ mainContact.address1 }}</span>
        </div>
        <div
          class="text-center"
          v-if="$isMainUser() || ($isSubUser() && $isCompanyUser())"
        >
          <v-btn
            to="/home/member-info/contact"
            x-large
            rounded
            class="bg-primary flex-wrap text-title--c-white mt-7 w-100"
          >
            {{ $t("memberInfo.changeContact") }}
          </v-btn>
        </div>
        <!-- END Contact -->

        <!-- START Membership-type -->
        <div v-if="$isMainUser() || $isSubUser()">
          <div class="text-heading --w-bold --c-prm text-center mt-15">
            {{ $t("memberInfo.membershipType") }}
          </div>
          <v-divider class="bg-gray--light mt-2 mb-6" />
          <div class="text-center">
            <v-btn
              to="/home/member-info/member"
              x-large
              rounded
              class="bg-primary text-title--c-white w-100"
            >
              {{ $t("memberInfo.changeMembersInfo") }}
            </v-btn>
          </div>
          <!-- END Membership-type -->

          <!-- START About-payment -->
          <div class="text-heading --w-bold --c-prm text-center mt-15">
            {{ $t("memberInfo.aboutPayment") }}
          </div>
          <v-divider class="bg-gray--light mt-2 mb-6" />
          <div class="text-center">
            <v-btn
              v-if="this.$isCompanyUser()"
              to="/home/member-info/payment-method"
              x-large
              rounded
              class="bg-primary text-title--c-white w-100"
            >
              {{ $t("memberInfo.confirmOrChangePaymentMethod") }}
            </v-btn>
            <v-btn
              to="/home/member-info/receipt-list"
              x-large
              rounded
              class="bg-primary text-title--c-white w-100 mt-3"
            >
              {{ $t("buttons.showReceipts") }}
            </v-btn>
          </div>
          <!-- END About-payment -->

          <!-- START Credit-card -->
          <div class="text-heading --w-bold --c-prm text-center mt-15">
            {{ $t("common.creditCard") }}
          </div>
          <v-divider class="bg-gray--light mt-2 mb-6" />
          <div class="text-center mb-7">
            <v-btn
              to="/home/member-info/credit-card"
              x-large
              rounded
              height="70"
              class="bg-primary d-flex --c-white w-100 rounded-40"
            >
              <div class="mx-5  text-pre-wrap w-60">
                {{ $t("memberInfo.changeRegisteredCreditCard") }}
              </div>
            </v-btn>
          </div>
        </div>
        <!-- END Credit-card -->
      </div>

      <!-- START Introduction -->
      <div
        v-if="$isMainUser() || $isSubUser()"
        class="rounded pa-5 my-6 bg-white text-center"
      >
        <h2 class="text-large--c-prm mb-5">{{ $t("common.introduction") }}</h2>
        <div class="text-left text-title mb-8">
          {{ $t("memberInfo.introduction") }}
        </div>
        <v-btn
          to="/home/member-info/introduction"
          x-large
          rounded
          class="bg-primary text-title--c-white w-100"
        >
          {{ $t("memberInfo.enterInfoFriendsOrCcquaintances") }}
        </v-btn>
      </div>
      <!-- END Introduction -->
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import VacationsHistoryItem from '@/components/VacationsHistoryItem'
import {
  paginationMixin
} from '@/mixins/pagination.mixin'

export default {
  name: 'MemberInfo',
  mixins: [paginationMixin],
  components: {
    Breadcrumbs,
    VacationsHistoryItem
  },
  computed: {
    memberCard () {
      return this.$store.state.memberInfo.memberCard
    },
    mainContact () {
      return this.$store.state.memberInfo.mainContact
    },
    totalVacationsPoints () {
      const current = this.items.find(i => i.current)
      if (!current) return null
      return current.pointsAfter
    }
  },
  methods: {
    async loadList () {
      await this.getPaginatedList((apollo, skip) => this.$store.dispatch('myTvpList', {
        apollo,
        skip,
        take: 3
      }))
    },
    async myClientInfo () {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          await this.$store.dispatch('myClientInfo', {
            apollo: this.$apollo
          })
        })
      })
    }
  },
  async mounted () {
    await this.myClientInfo()
    await this.loadList()
  }
}
</script>

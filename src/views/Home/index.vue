<template>
  <div class="bg-white">
    <div class="home__content">
      <!--================ Start Banner ================-->
      <v-img
        class="bg-header pb-0  pb-md-15 text-center"
        position="center bottom"
        src="@/assets/images/tokyu-vacations-bg-home.jpg"
        lazy-src="@/assets/images/lazy-img.png"
        alt="tokyu_vacations"
        style="margin-top: -73px"
      >
        <div class="bg-header__content --home px-15">
          <div class="d-none d-md-block font-weight-bold">
            <!--PC-->
            {{ $t("common.welcome") }}
            {{ userName }}{{ $t("common.userNamePostFix") }}
            <div class="mb-4">
              <router-link
                class="--white text-decoration-underline mr-2"
                to="/home/download-documents#userguide"
              >
                {{ $t("common.pleaseRead") }}
              </router-link>
              /
              <a class="--white text-decoration-underline ml-2" :href="faq">
                {{ $t("common.faqPage") }}
              </a>
            </div>
            <router-link to="/">
              <Logo :width="336" :height="79" />
            </router-link>
            <h2 class="font-helvetica">
              Vacation会員ページ
            </h2>

            <!--PC-->
          </div>
        </div>
        <div
          class="t-toolbar__greeting --c-white mb-8 d-md-none pl-4 font-weight-bold"
        >
          <div
            style="position:relative; top:-12px"
            class="pl-2 text-left text-title --c-white font-helvetica"
          >
            Vacation会員ページ
          </div>

          <div style="height: 100%" class="ml-2 mt-auto mb-auto text-left">
            <div style="height: 90px"></div>
            <div>
              {{ $t("common.welcome") }}
              {{ userName }}{{ $t("common.userNamePostFix") }}
              <div>
                <router-link
                  class="--c-white text-decoration-underline mr-2"
                  to="/home/download-documents#userguide"
                >
                  {{ $t("common.pleaseRead") }}
                </router-link>
                /
                <a
                  class="--c-white text-decoration-underline ml-2"
                  :href="faq"
                >{{ $t("common.faqPage") }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </v-img>
      <!--================ END Banner ================-->
      <v-main class="main-container bg-primary pa-2">
        <v-row justify="center">
          <v-col lg="10" xl="9" md="12">
            <section class="urgent-info mb-4 px-md-6 mb-md-6">
              <div
                v-for="(urgentInformationItem, i) in urgentInformation"
                :key="i"
                class="urgent-info__item py-2 px-3 mt-1 rounded text-left d-flex --c-white"
              >
                <h4 class="font-weight-medium">
                  {{ $t("homePage.urgentInformation") }}
                </h4>
                <v-divider vertical class="mx-3 bg-white">|</v-divider>
                <div class="font-weight-light">
                  {{ urgentInformationItem.title }} - {{ urgentInformationItem.body }}
                </div>
              </div>
            </section>
            <section class="vacation-panel py-md-10 px-md-14 rounded-10">
              <v-row justify="center">
                <v-col lg="6" cols="12" order="1" order-lg="1" class="vacation-panel__left-container">
                  <v-carousel
                    v-model="carousel"
                    :show-arrows="carouselItem.length > 1"
                    :hide-delimiters="carouselItem.length === 1"
                    height="auto"
                    class="carousel-custom rounded"
                  >
                    <v-carousel-item v-for="(item, index) in carouselItem" :key="index">
                      <div class="text-heading --c-prm">
                        {{ $t("homePage.latestReservation") }}
                      </div>
                      <v-divider class="mt-2" />
                      <div class="reservation-date">
                        <!-- Date From -->
                        <span class="text-heading font-weight-bold">
                            {{ new Date(item.checkInDate).getFullYear() }} /
                          </span>
                        <span>
                            {{
                            new Date(item.checkInDate).getMonth() + 1 +
                            '/' +
                            new Date(item.checkInDate).getDate()
                          }}
                          </span>
                        <span class="text-heading">
                            ({{ getDayText(new Date(item.checkInDate).getDay()) }})
                          </span>
                        <!-- --------- -->
                        <span class="text-heading">ー</span>
                        <!-- Date To -->
                        <span>{{ new Date(item.checkOutDate).getDate() }}</span>
                        <span class="text-heading">
                            ({{ getDayText(new Date(item.checkOutDate).getDay()) }})
                          </span>
                        <!-- ------- -->
                      </div>
                      <h3 class="text-medium--c-prm">
                        {{ item.room.roomType.facility.name }}
                      </h3>
                      <!-- START View-button -->
                      <v-btn
                        rounded
                        x-large
                        v-if="confirmationCheckMwDpFpSpPw(item)"
                        :to="'/home/usage-history/reservation-details/' + item.id"
                        class="bg-primary --c-white w-100 mt-3"
                      >
                        <template v-if="$vuetify.breakpoint.lgAndUp">
                            <span class="text-heading mr-2">
                              {{ $t("buttons.checkIn") }}
                            </span>
                          <span class="font-weight-light text-normal">
                              ({{ $t("buttons.showUserCertificate") }})
                            </span>
                        </template>
                        <template v-else>
                            <span class="text-heading">
                              {{ $t("buttons.showUserCertificate") }}
                            </span>
                        </template>
                      </v-btn>
                      <!-- END View-button -->

                      <!--===== If it is not available (notice) ======-->
                      <template v-if="confirmationCheck(item)">
                        <div class="text-medium --c-dark-red mt-5">
                          {{ $t("homePage.availableServiceNotice.line1") }} <br />
                          {{ $t("homePage.availableServiceNotice.line2") }}
                        </div>
                        <v-btn
                          :to="'home/usage-history/confirmation/' + item.id"
                          rounded
                          class="bg-red --c-white mt-3"
                        >
                          {{ $t("buttons.enterYourInfo") }}
                        </v-btn>
                      </template>
                      <!--===== -------------------------------- =====-->
                    </v-carousel-item>
                  </v-carousel>
                </v-col>
                <v-col lg="6" cols="12" order="3" order-lg="2" class="vacation-panel__right-container">
                  <v-row justify="center">
                    <v-col lg="11">
                      <div class="d-grid mx-auto mx-lg-0 mt-4 mt-lg-0 align-self-start" style="max-width: 385px;">
                        <div
                          v-for="item in menu"
                          :key="item.title"
                          :class="{ 'has-icon': item.icon }"
                          @click="handleClickMenu(item.link)"
                        >
                          <template v-if="item.icon">
                            <IconDoorOpen
                              color="var(--color__primary)"
                              v-if="item.icon === 'door'"
                            />
                            <IconBell color="var(--color__primary)" v-if="item.icon === 'bell'" />
                            <IconHistory
                              color="var(--color__primary)"
                              v-if="item.icon === 'history'"
                            />
                          </template>
                          <span v-html="item.title"></span>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" order="2" order-lg="3">
                  <div
                    v-for="(item, i) in notificationList"
                    :key="i"
                    class="py-2 px-4 rounded bg-orange mt-3 --c-white"
                  >
                    <div>
                      {{ item.text }}
                    </div>
                    <v-divider class="mt-3 my-2 bg-white" />
                    <div class="d-flex justify-center align-center">
                        <span class="mr-2">
                          {{ $t("common.expirationDate") }}
                        </span>
                      <span class="text-title font-weight-bold">
                          {{ item.expireDate }}
                        </span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </section>
          </v-col>
        </v-row>
      </v-main>
      <v-main class="news-container px-2 py-6 py-md-8">
        <v-row justify="center">
          <v-col lg="10" xl="9" md="12"><!-- News Section -->
            <section>
              <v-row>
                <v-col cols="12">
                  <div class="news-container--title text-large font-weight-bold  mb-md-5 text-center">
                    {{ $t("title.news") }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" md="6" v-for="item in newsList" :key="item.id">
                      <NewsItem
                        :id="item.id"
                        :title="item.title"
                        :urlImg="item.imageUrl"
                        :description="item.body"
                        :link="'/home/news/' + item.id"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/home/news"
                    rounded
                    class="hover-secondary bg-white text-medium font-weight-bold px-10"
                  >
                    {{ $t("buttons.viewMore") }}
                  </v-btn>
                </v-col>
              </v-row>
            </section>
          </v-col>
        </v-row>
      </v-main>
      <v-main class="bg-white py-6 py-md-8 px-2">
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              @click="userGuideList(0)"
              x-large
              class="bg-primary --c-white d-inline-flex --additional-links w-100 float-md-right"
            >
              <icon-booklet class="pr-2" />
              {{ $t("buttons.viewUsageGuide") }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              to="/"
              x-large
              @click="redirect('/home/download-documents/vacation-life-back-number')"
              class="bg-smoke --c-prm --additional-links w-100 float-md-left"
            >
              {{ $t("homePage.vacationLifeBackNumber") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-6">
          <v-col class="pb-8">
            <div class="d-flex align-center justify-center mb-md-n5">
              <div class="--c-prm text-medium border-medium py-4 px-5 mr-3">
                {{ $t("common.contactUs") }}
              </div>
              <div>
                <label class="font-weight-bold --c-gray">
                  {{ $t("homePage.callCenterDial") }}
                </label>
                <div>
                  <a href="tel:0120-618-109" class="--c-prm text-m-heading font-weight-bold">0120-618-109</a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-main>
    </div>

    <!-- ift ticket dialog -->
    <CommonModal
      :visible="isOpenGiftTicketDialog"
      @close="isOpenGiftTicketDialog = false"
    >
      <template>
        <div class="text-heading --c-prm" style="margin-top: -55px; padding-right: 31px;">
          <IconTicket color="var(--color__primary)" width="65.25" height="65.27" />
          <div style="transform: translateY(-27px);" class="d-inline-block ml-2">
            {{ $t("menu.main.exchangePoints") }}
          </div>
        </div>
        <v-main class="my-4 mx-3">
          <v-btn to="/home/gift-ticket" rounded outlined x-large height="60" class="w-100 mb-3">
            {{ $t("menu.main.items.orderTickets") }}
          </v-btn>
          <v-btn to="/home/gift-ticket/history" rounded outlined x-large height="60" class="w-100">
            {{ $t("menu.main.items.receptionStatusOrHistory") }}
          </v-btn>
        </v-main>
      </template>
    </CommonModal>

  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem'
import {
  getDayText
} from '@/utils/get-date'
import IconDoorOpen from '@/components/icons/IconDoorOpen'
import IconBell from '@/components/icons/IconBell'
import IconHistory from '@/components/icons/IconHistory'
import {
  confirmationCheck,
  confirmationCheckMwDpFpSpPw
} from '@/utils/check'
import IconBooklet from '@/components/icons/IconBooklet'
import Logo from '@/components/icons/Logo'
import CommonModal from '@/views/Modal/Common'
import IconTicket from '@/components/icons/IconTicket'

export default {
  name: 'Home',
  components: {
    CommonModal,
    IconBooklet,
    NewsItem,
    IconDoorOpen,
    IconBell,
    IconHistory,
    IconTicket,
    Logo
  },
  computed: {
    menu () {
      return this.menuList
    },
    userName () {
      return this.$store.state.user.name
    }
  },
  methods: {
    confirmationCheckMwDpFpSpPw,
    userGuideList (index) {
      this.$store.dispatch('getUserGuideList', {
        apollo: this.$apollo
      }).then(res => {
        window.open(res[index].url, '_blank')
      })
    },
    confirmationCheck,
    getDayText,
    handleClickMenu (link) {
      if (link) {
        this.$router.push(link)
      } else {
        this.isOpenGiftTicketDialog = true
      }
    },
    redirect (link) {
      this.$router.push(link)
    }
  },
  data () {
    return {
      faq: process.env.VUE_APP_FAQ_URL,
      isOpenGiftTicketDialog: false,
      urgentInformation: [],
      carousel: 0,
      menuList: [{
        icon: 'door',
        title: this.$t('menu.main.vacancySearch'),
        link: '/home/vacancy-search',
        hide: false
      },
      {
        icon: 'bell',
        title: this.$t('menu.main.vacancyNotification'),
        link: '/home/vacancy-notification',
        hide: false
      },
      {
        icon: 'history',
        title: this.$t('menu.main.reservationAndUsageHistory'),
        link: '/home/usage-history',
        hide: false
      },
      {
        icon: null,
        title: this.$t('menu.main.exchangePoints'),
        link: null,
        hide: true
      },
      {
        icon: null,
        title: this.$t('menu.main.membershipInformation'),
        link: '/home/member-info',
        hide: false
      },
      {
        title: this.$t('menu.main.contractInformation'),
        link: '/home/contract-information',
        hide: false
      },
      {
        icon: null,
        title: this.$t('homePage.pleaseBeSureToReadIt'),
        link: '/home/download-documents',
        hide: false
      },
      {
        icon: null,
        title: this.$t('common.faq'),
        link: process.env.VUE_APP_FAQ_URL,
        hide: false
      }
      ],
      carouselItem: [],
      newsList: [],
      notificationList: []
    }
  },
  async created () {
    await this.$doLoading(async () => {
      const myWebNotificationListResult = await this.$store.dispatch('myWebNotificationList', {
        apollo: this.$apollo,
        take: 4,
        skip: 0
      })
      this.newsList = myWebNotificationListResult.data.myWebNotificationList.items

      const myWebNotificationListUrgentResult = await this.$store.dispatch('myWebNotificationListUrgent', {
        apollo: this.$apollo,
        take: 1,
        skip: 0
      })
      this.urgentInformation = myWebNotificationListUrgentResult.data.myWebNotificationList.items

      const mostRecentBooking = await this.$store.dispatch('mostRecentBooking', {
        apollo: this.$apollo
      })

      this.carouselItem = mostRecentBooking.data.myBookingList.items.filter(x => !(x.cancelledAt))
      const myExpiringRights = await this.$store.dispatch('myExpiringRights', {
        apollo: this.$apollo
      })
      this.notificationList = myExpiringRights.data.myExpiringRights.rights
    })
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/modules/variables-scss' as v;

@media screen and (min-width: 960px) {
  .main-container {
    margin-top: -170px;
  }

  .vacation-panel {
    background-color: #ffffffb8;
  }

  .v-btn.--additional-links {
    max-width: 374px !important;
    //min-width: auto !important;
  }

  .news-container {
    background-color: var(--color__primary);

    &--title {
      color: var(--color__white);
    }
  }
}

@media screen and (max-width: 959px) {
  .news-container {
    background-color: var(--color__smoke);

    &--title {
      color: var(--color__primary);
    }
  }
}

@media screen and (min-width: 1264px) {
  .vacation-panel {
    &__left-container {
      margin-right: -12px;
      padding: 12px 0;
    }

    &__right-container {
      margin-right: -24px;
      margin-left: 24px;
    }
  }
}

.t-toolbar__greeting {
  display: none !important;
  height: 414px;
}

.reservation-date {
  span {
    &:nth-child(2) {
      font-size: var(--font-size__x-large);
      font-weight: var(--font-weight__bold);
    }

    &:nth-child(5) {
      font-size: var(--font-size__huge);
      font-weight: var(--font-weight__bold);
    }
  }
}

.d-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background-color: var(--color__white);
    font-weight: var(--font-weight__medium);
    padding: 0 10px;
    max-width: 116px;
    line-height: 1.3;
    transition: 0.2s;

    &:hover {
      opacity: 0.75;
    }

    &.has-icon {
      aspect-ratio: 1/1;
      height: auto;
      border-radius: 5px;
      font-size: var(--font-size__medium);
      font-weight: var(--font-weight__bold);
      box-shadow: 0 2px 4px rgba(v.$color__black, 0.6);
      justify-content: space-around;
      padding-top: 14px;
      margin-bottom: 5px;
    }

    &:not(.has-icon) {
      height: 50px;
      border-radius: 29px;
      font-size: var(--font-size__default);
      color: var(--color__primary);
    }
  }
}

::v-deep {
  .v-chip {
    width: 60px;
    padding: 5px !important;
    white-space: pre-wrap;

    &__content {
      font-size: var(--font-size__default);
    }
  }

  @media (min-width: v.$breakpoint__lg) {
    .home {
      &__notification {
        transform: translateX(55%);
        margin-top: 20px;
        width: 100%;
      }
    }
  }

  @media (max-width: v.$breakpoint__md - 1) {
    .t-toolbar__greeting {
      display: block !important;
    }
    .text-m-heading--c-prm {
      font-size: var(--font-size__m-large) !important;
      line-height: 1;
    }
    .v-chip {
      width: auto !important;
      padding: 10px 12px !important;

      &__content {
        font-size: var(--font-size__medium);
      }
    }
    .d-grid div:not(.has-icon) {
      background-color: transparent !important;
      color: var(--color__white);
      border: solid 1px var(--color__white);
    }
  }
  @media (max-width: v.$breakpoint__x-small - 1) {
    .d-grid {
      div {
        width: 108px;
      }
    }
    .has-icon {
      padding-bottom: 5px !important;

      svg {
        width: 40px !important;
      }
    }
    .t-container {
      max-width: 100%
    }
    .bg-header {
      .v-image__image {
        background-image: url('../../assets/images/tokyu-vacations-bg-home-mobile.jpg') !important;
      }

      &__content {
        float: bottom;

        h2 {
          text-shadow: 1px 1px 1px rgba(v.$color__black, .7);
        }
      }
    }
  }
}
</style>

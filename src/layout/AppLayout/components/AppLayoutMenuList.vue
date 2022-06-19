<template>
  <div>
    <v-list :class="isHeader ? '--header' : '--footer'">
      <v-row>
        <v-col
          cols="12"
          :md="isHeader ? '6' : '12'"
          :lg="isHeader ? '6' : '10'"
          class="pa-0 col-flex"
          :class="{ 'pr-md-15': isHeader }"
        >
          <div
            v-for="item in listMainMenu"
            :key="item.title"
            @click="handleLink(item)"
          >
            <v-list-group
              :append-icon="
                item.single ? 'mdi-chevron-right' : 'mdi-chevron-down'
              "
              :disabled="item.single"
              :class="{ 'no-translate': item.single }"
              :value="$vuetify.breakpoint.mdAndUp && !isHeader"
              no-action
            >
              <template v-if="item.icon && isHeader" v-slot:prependIcon>
                <IconDoorOpen
                  width="33.03"
                  height="43.641"
                  v-if="item.icon === 1"
                />
                <IconDocument
                  width="33.03"
                  height="43.641"
                  v-if="item.icon === 2"
                />
                <IconHistory
                  width="28.32"
                  height="43.641"
                  v-if="item.icon === 3"
                />
                <IconCardInfo height="43.641" v-if="item.icon === 4" />
                <IconTicket v-if="item.icon === 5" />
                <IconBell
                  width="28.29"
                  height="43.641"
                  v-if="item.icon === 6"
                />
              </template>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title" class="text-medium" />
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="child in item.items"
                :key="child.title"
                @click="$router.push(child.link, () => {}); $emit('close')"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
        </v-col>

        <v-col
          cols="12"
          :md="isHeader ? '6' : '12'"
          :lg="isHeader ? '6' : '2'"
          class="pa-0 mt-8 mt-md-0"
          :class="{ 'pl-md-15 mt-md-2': isHeader }"
        >
          <router-link
            v-for="item in listSubMenu"
            :key="item.title"
            :to="item.link"
            v-text="item.title"
            @click.native="$emit('close')"
            class="link-custom pl-6 pl-md-0"
          />
        </v-col>
      </v-row>
    </v-list>
  </div>
</template>

<script>
import IconDoorOpen from '@/components/icons/IconDoorOpen'
import IconDocument from '@/components/icons/IconDocument'
import IconHistory from '@/components/icons/IconHistory'
import IconCardInfo from '@/components/icons/IconCardInfo'
import IconTicket from '@/components/icons/IconTicket'
import IconBell from '@/components/icons/IconBell'

export default {
  name: 'AppLayoutMenuList',
  components: {
    IconDoorOpen,
    IconDocument,
    IconHistory,
    IconCardInfo,
    IconTicket,
    IconBell
  },
  props: {
    isHeader: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleLink (item) {
      if (item.single) {
        this.$router.push(item.link).catch(() => {})
        this.$emit('close')
      }
    }
  },
  data () {
    return {
      listMainMenu: [
        {
          icon: 1,
          title: this.$t('menu.main.vacancySearch'),
          single: true,
          link: '/home/vacancy-search',
          items: []
        },
        {
          icon: 2,
          title: this.$t('menu.main.contractDetails'),
          single: true,
          link: '/home/contract-information',
          items: []
        },
        {
          icon: 3,
          title: this.$t('menu.main.reservationAndUsageHistory'),
          single: true,
          link: '/home/usage-history',
          items: []
        },
        {
          icon: 4,
          title: this.$t('menu.main.membershipInformation'),
          single: true,
          link: '/home/member-info',
          items: []
        },
        {
          icon: 5,
          title: this.$t('menu.main.vacancyNotification'),
          single: true,
          link: '/home/vacancy-notification',
          items: []
        }
      ],
      listSubMenu: [
        {
          title: this.$t('menu.sub.newsFromTokyuVacations'),
          link: '/home/news'
        },
        {
          title: this.$t('menu.sub.downloadUserGuide'),
          link: '/home/download-documents#userguide'
        },
        {
          title: this.$t('menu.sub.vacationLifeBackIssues'),
          link: '/home/download-documents/vacation-life-back-number'
        },
        {
          title: this.$t('common.logout'),
          link: '/home/logout'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/modules/variables-scss' as v;

%bulletAfter {
  content: "";
  position: absolute;
  left: 0;
  width: 15px;
  height: 1px;
  background-color: var(--color__white);
}

@media (max-width: v.$breakpoint__md - 1) {
  ::v-deep .link-custom:after {
    // cannot use @extend %bulletAfter here, it would throw "You may not @extend selectors across media queries."
    content: "";
    position: absolute;
    left: 0;
    width: 15px;
    height: 1px;
    background-color: var(--color__white);
    top: 50%;
    transform: translateY(-50%);
  }
}
::v-deep {
  svg {
    margin: 0 auto !important;
    path {
      fill: var(--color__white) !important;
    }
  }
  .v-list-item__icon.v-list-group__header__prepend-icon {
    width: 45px !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  .link-custom {
    position: relative;
    line-height: 1.5;
    display: block;
    font-weight: var(--font-weight__light);
    margin-bottom: 8px;
    padding: 10px 0;
    &:hover {
      opacity: 1 !important;
    }
  }
  .no-translate {
    .v-icon {
      transform: none !important;
    }
  }
  .row {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    .v-list-item:not(.v-list-group__header) {
      &:hover {
        opacity: 0.6;
        cursor: pointer;
      }
      .v-list-item__content {
        position: relative;
        &:after {
          @extend %bulletAfter;
          top: 22px;
        }
      }
      .v-list-item__title {
        padding-left: 22px;
      }
    }
  }
  .v-list {
    background: none !important;
    .v-list-item__icon {
      position: relative;
      z-index: 2;
    }
    .v-list-item__title {
      &.text-medium {
        font-weight: var(--font-weight__bold) !important;
      }
      &:not(.text-medium) {
        font-weight: var(--font-weight__light) !important;
      }
    }
    * {
      color: var(--color__white) !important;
    }
    .v-list-group {
      border-bottom: solid 1px var(--color__primary);
      &__header {
        .v-icon {
          font-size: 30px;
        }
      }
    }
    &.--header {
      padding: 8px 30px 70px 30px;
      .v-list-group {
        border-bottom: solid 1px rgba(v.$color__secondary, 0.4);
      }
    }
    &.--footer {
      .v-list-item {
        padding-left: 16px !important;
        &__title {
          font-size: var(--font-size_regular) !important;
        }
      }
      .text-medium {
        font-size: var(--font-size__medium) !important;
      }
      @media (min-width: v.$breakpoint__lg) {
        .col-flex {
          padding-right: 20px !important;
        }
      }
    }
    @media (max-width: v.$breakpoint__md - 1) {
      .v-list-item::before {
        opacity: 0 !important;
      }
      .v-list-group__header {
        &::before {
          background: transparent !important;
        }
        padding-top: 10px;
      }
      &.--footer {
        .v-list-item--active {
          &::after {
            background: var(--color__primary);
            width: 60px;
            position: absolute;
            right: 0;
            bottom: 0;
            border-radius: 5px 5px 0 0;
            height: calc(100% - 12px);
            z-index: 1;
          }
        }
        .v-list-group__items {
          background-color: var(--color__primary) !important;
        }
        .v-list-group__header {
          .v-list-item__content {
            padding: 15px 0 20px 0;
          }
        }
      }
    }
    @media (min-width: v.$breakpoint__md) {
      &.--header {
        .v-list-item:hover {
          opacity: 1 !important;
        }
        .link-custom {
          padding-left: 24px !important;
          &:hover {
            opacity: 0.7 !important;
          }
        }
      }
      &.--footer {
        .link-custom {
          opacity: 0.9;
        }
        .v-list-group {
          border-bottom: none;
          &:not(.no-translate) {
            .v-list-group__header {
              pointer-events: none;
            }
          }
          &__items {
            .v-list-item {
              opacity: 0.9 !important;
              &:hover {
                opacity: 1 !important;
              }
            }
          }
        }
        .v-list-item {
          &__icon {
            display: none !important;
          }
        }
        .row {
          max-width: 100%;
          .col-flex {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
        }
        .v-list-item:not(.v-list-group__header) {
          .v-list-item__content {
            &:after {
              width: 4px;
              height: 4px;
              top: 19px;
              border-radius: 50%;
            }
            .v-list-item__title {
              padding-left: 12px;
              font-size: var(--font-size__normal);
            }
          }
        }
      }
    }
  }
}
</style>

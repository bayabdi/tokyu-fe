import AppLayout from '@/layout/AppLayout'
import { i18n } from '@/plugins/i18n'
import { requireAuthMeta } from '@/router/modules/ensure-authenticated'

const appRouter = {
  path: '/home',
  component: AppLayout,
  meta: requireAuthMeta(),
  children: [
    {
      path: '',
      name: 'home',
      meta: { title: i18n.t('title.main') },
      component: () => import('@/views/Home')
    },
    {
      path: 'logout',
      name: 'logout',
      meta: { title: i18n.t('common.logout') },
      component: () => import('@/views/Logout')
    },
    {
      path: 'member-info',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          meta: { title: i18n.t('menu.main.membershipInformation') },
          component: () => import('@/views/MemberInfo')
        },
        {
          path: 'contact',
          meta: { title: i18n.t('memberInfo.changeContact') },
          component: () => import('@/views/MemberInfo/MemberInfoContact')
        },
        {
          path: 'credit-card',
          meta: { title: i18n.t('title.changeCreditCardInfo'), noCard: true },
          component: () => import('@/views/MemberInfo/MemberInfoCreditCard/UpdateCardInfo')
        },
        {
          path: 'receipt-list',
          meta: { title: i18n.t('title.receiptList') },
          component: () => import('@/views/MemberInfo/MemberInfoReceiptList')
        },
        {
          path: 'payment-method',
          meta: { title: i18n.t('title.changePaymentInfo') },
          component: () => import('@/views/MemberInfo/MemberInfoPaymentMethod')
        },
        {
          path: 'member',
          component: { render: c => c('router-view') },
          children: [
            {
              path: '',
              meta: { title: i18n.t('title.changeMembersInfo') },
              component: () => import('@/views/MemberInfo/MemberInfoMember')
            },
            {
              path: ':id',
              meta: { title: i18n.t('title.changeMembersInfo') },
              component: () => import('@/views/MemberInfo/MemberInfoMember/MemberInfoMemberDetails')
            }
          ]
        },
        {
          path: 'introduction',
          meta: { title: i18n.t('common.introduction') },
          component: () => import('@/views/MemberInfo/MemberInfoIntroduction')
        }
      ]
    },
    {
      path: 'vacancy-notification',
      name: 'vacancy-notification',
      meta: { title: i18n.t('menu.main.vacancyNotification') },
      component: () => import('@/views/VacancyNotification')
    },
    {
      path: 'vacancy-search',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          name: 'vacancy-search',
          meta: { title: i18n.t('menu.main.vacancySearch') },
          component: () => import('@/views/VacancySearch')
        },
        {
          path: 'reservation',
          component: { render: c => c('router-view') },
          children: [
            {
              path: '',
              name: 'vacancy-search-facilities',
              meta: { title: i18n.t('menu.main.vacancySearch') },
              component: () => import('@/views/VacancySearch/Reservation')
            },
            {
              path: 'details/:id',
              meta: { title: i18n.t('title.reservationDetails') },
              component: () => import('@/views/VacancySearch/Reservation/Details')
            },
            {
              path: 'selectplan',
              meta: { title: i18n.t('title.selectPlan') },
              component: () => import('@/views/VacancySearch/Reservation/SelectPlan')
            },
            {
              path: 'confirmation',
              name: 'reserve-confirmation',
              meta: { title: i18n.t('title.reservationConfirmation') },
              component: () => import('@/views/VacancySearch/Reservation/Confirmation')
            },
            {
              path: 'enter-information',
              name: 'reserve-enter-information',
              meta: { title: i18n.t('title.reservationConfirmation'), keepTemporaryBooking: true },
              component: () => import('@/views/VacancySearch/Reservation/EnterInformation')
            },
            {
              path: 'final-confirmation',
              name: 'reserve-final-confirmation',
              meta: { title: i18n.t('title.reservationConfirmation'), keepTemporaryBooking: true },
              component: () => import('@/views/VacancySearch/Reservation/FinalConfirmation')
            },
            {
              path: 'complete',
              name: 'reserve-complete',
              meta: { title: i18n.t('title.reservationComplete') },
              component: () => import('@/views/VacancySearch/Reservation/Complete')
            }
          ]
        }
      ]
    },
    {
      path: 'gift-ticket',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          meta: { title: i18n.t('menu.main.giftTicket'), whiteBackground: true },
          component: () => import('@/views/GiftTicket')
        },
        {
          path: 'history',
          meta: { title: i18n.t('menu.main.items.giftTicketUsageHistory'), whiteBackground: true },
          component: () => import('@/views/GiftTicket/GiftTicketUsageHistory')
        },
        {
          path: 'exchange-points',
          meta: { title: i18n.t('menu.main.exchangePoints'), whiteBackground: true },
          component: () => import('@/views/GiftTicket/GiftTicketExchangePoints')
        },
        {
          path: 'order',
          meta: { title: i18n.t('menu.main.items.orderTickets'), whiteBackground: true },
          component: () => import('@/views/GiftTicket/GiftTicketOrder')
        }
      ]
    },
    {
      path: 'contract-information',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          meta: { title: i18n.t('title.listOfContracts') },
          component: () => import('@/views/ContractInformation')
        },
        {
          path: 'details/:id',
          name: 'contract-detail',
          meta: { title: i18n.t('title.contractInformationDetails') },
          component: () => import('@/views/ContractInformation/Details')
        }
      ]
    },
    {
      path: 'news',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          meta: { title: i18n.t('news.notification') },
          component: () => import('@/views/News')
        },
        {
          path: ':id',
          meta: { title: i18n.t('news.notification') },
          component: () => import('@/views/News/NewsDetails')
        }
      ]
    },
    {
      path: 'usage-history',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          name: 'usage-history',
          meta: { title: i18n.t('reservationAndUsageHistory.reservationAndUsageHistory') },
          component: () => import('@/views/ReservationAndUsageHistory')
        },
        {
          path: 'reservation-details/:id',
          component: { render: c => c('router-view') },
          children: [
            {
              path: '',
              name: 'reservation-detail',
              meta: { title: i18n.t('reservationAndUsageHistory.reservationDetails') },
              component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails')
            },
            {
              path: 'pre-check-in-info',
              name: 'pre-check-in',
              component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/PreCheckInInformation')
            },
            {
              path: 'reservation-change',
              component: { render: c => c('router-view') },
              children: [
                {
                  path: '',
                  name: 'reservation-change',
                  meta: { title: i18n.t('reservationAndUsageHistory.reservationChange') },
                  component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/ReservationChange')
                },
                {
                  path: 'change',
                  meta: { title: i18n.t('reservationAndUsageHistory.accommodationDateExtension') },
                  component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/ReservationChange/Change'),
                  children: [
                    {
                      path: 'accommodation-date-extension',
                      name: 'reservation-extention',
                      meta: { title: i18n.t('reservationAndUsageHistory.accommodationDateExtension') },
                      component: () => import('@/components/ReservationComponents/AccommodationDateExtension')
                    },
                    {
                      path: 'guest-information',
                      name: 'reservation-guest-change',
                      meta: { title: i18n.t('reservationAndUsageHistory.guestInformation') },
                      component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/ReservationChange/GuestInformationChange')
                    },
                    {
                      path: 'rental-listing-change',
                      name: 'reservation-rental-item-change',
                      meta: { title: i18n.t('reservationAndUsageHistory.guestInformation') },
                      component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/ReservationChange/RentalItemChange')
                    },
                    {
                      path: 'rental-listing-change2',
                      name: 'reservation-parking-change',
                      meta: { title: i18n.t('reservationAndUsageHistory.guestInformation') },
                      component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/ReservationChange/ParkingChange')
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'confirmation/:id',
          name: 'reservation-usage-confirmation',
          meta: { title: i18n.t('reservationAndUsageHistory.confirmation') },
          component: () => import('@/views/ReservationAndUsageHistory/Confirmation')
        }
      ]
    },
    {
      path: 'download-documents',
      component: { render: c => c('router-view') },
      children: [
        {
          path: '',
          meta: { title: i18n.t('downloadDocuments.downloadDocuments') },
          component: () => import('@/views/DownloadDocuments')
        },
        {
          path: 'vacation-life-back-number',
          meta: { title: i18n.t('downloadDocuments.downloadDocuments') },
          component: () => import('@/views/DownloadDocuments/VacationLifeBackNumber')
        },
        {
          path: 'user-guide',
          meta: { title: i18n.t('downloadDocuments.downloadDocuments') },
          component: () => import('@/views/DownloadDocuments/UserGuide')
        }
      ]
    }
  ]
}

export default appRouter

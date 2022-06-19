import AuthLayout from '@/layout/AuthLayout'
import {
  i18n
} from '@/plugins/i18n'
import {
  requireAuthMeta
} from '@/router/modules/ensure-authenticated'

const authRouter = {
  path: '/',
  component: AuthLayout,
  redirect: 'home',
  children: [{
    path: 'register',
    component: {
      render: c => c('router-view')
    },
    children: [{
      path: '',
      meta: {
        title: i18n.t('title.registration')
      },
      component: () => import('@/views/Register')
    },
    {
      path: 'information',
      meta: {
        title: i18n.t('title.registration')
      },
      component: () => import('@/views/Register/RegisterInformation')
    }
    ]
  },
  {
    path: 'login',
    component: {
      render: c => c('router-view')
    },
    children: [{
      path: '',
      meta: {
        title: i18n.t('title.login')
      },
      component: () => import('@/views/Login')
    },
    {
      path: 'forgot-password',
      meta: {
        title: i18n.t('title.forgotPassword')
      },
      component: () => import('@/views/Login/LoginForgotPassword')
    },
    {
      path: 'register-ticket',
      component: {
        render: c => c('router-view')
      },
      children: [{
        path: '',
        meta: {
          title: i18n.t('title.registerTicketReservation')
        },
        component: () => import('@/views/Login/LoginTicketRegister')
      },
      {
        path: 'confirm-email',
        meta: {
          title: i18n.t('title.registerTicketReservation')
        },
        component: () => import('@/views/Login/LoginTicketRegister/LoginTicketRegisterEmail')
      }
      ]
    }
    ]
  },
  {
    path: 'password-reset',
    meta: {
      title: i18n.t('title.resetPassword')
    },
    component: () => import('@/views/Login/LoginResetPassword')
  },
  {
    path: 'new-credit-card',
    meta: {
      title: i18n.t('title.changeCreditCardInfo'),
      noCard: true,
      ...requireAuthMeta()
    },
    component: () => import('@/views/MemberInfo/MemberInfoCreditCard/NewCardRegister')
  },
  {
    path: 'mfa-auth',
    component: () => import('@/views/Login/Confirm')
  }
  ]
}

export default authRouter

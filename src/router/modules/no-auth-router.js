const noAuthRouter = {
  path: '/',
  redirect: 'login',
  component: () => import('@/layout/NoAuthLayout'),
  children: [
    {
      path: 'precheckin',
      name: 'pre-check-in-with-code',
      component: () => import('@/views/ReservationAndUsageHistory/ReservationDetails/PreCheckInInformation')
    },
  ]
}

export default noAuthRouter

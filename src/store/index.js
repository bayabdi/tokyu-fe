import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import login from './modules/login'
import user from './modules/user'
import notifications from './modules/notifications'
import memberInfo from './modules/member-info'
import common from './modules/common'
import roomType from './modules/roomType'
import reservationCalendar from './modules/reservationCalendar'
import vacation from './modules/vacation'
import client from './modules/client'
import ticket from './modules/ticket'
import enums from './modules/enums'
import contracts from './modules/contracts'
import pointExchange from './modules/point-exchange'
import booking from './modules/booking'
import right from './modules/right'
import documents from '@/store/modules/documents'
import newBooking from './modules/new-booking'
import waitlist from './modules/waitlist'
import usageHistory from './modules/usage-history'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    user,
    notifications,
    memberInfo,
    common,
    client,
    ticket,
    roomType,
    reservationCalendar,
    vacation,
    enums,
    contracts,
    pointExchange,
    booking,
    right,
    newBooking,
    waitlist,
    usageHistory,
    documents
  },
  getters: getters
})

export default store

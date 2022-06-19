import actions from './actions'
import { getNowPlusOne } from '@/utils/get-date'

const reservationCalendar = {
  state: {
    year: getNowPlusOne().getFullYear(),
    month: getNowPlusOne().getMonth() + 1,
    fromDate: null,
    toDate: null,
    roomTypeId: null,
    roomTypes: [],
    canCheckInUntil: null,
    canCheckOutUntil: null
  },
  mutations: {
    setReservationDate (state, model) {
      state.year = model.year
      state.month = model.month
    },
    setRoomTypeId (state, roomTypeId) {
      state.roomTypeId = roomTypeId
    },
    setRoomTypePrices (state, roomTypeAndPrices) {
      state.roomTypes = roomTypeAndPrices
    },
    setReservationCalendarFromDate (state, fromDate) {
      state.fromDate = fromDate
    },
    setReservationCalendarToDate (state, toDate) {
      state.toDate = toDate
    },
    setDateRestriction (state, {
      canCheckInUntil,
      canCheckOutUntil
    }) {
      state.canCheckInUntil = canCheckInUntil
      state.canCheckOutUntil = canCheckOutUntil
    }
  },
  getters: {
    getPriceAndInventory: (state) => (stayDate) => {
      const rt = state.roomTypes.find(r => r.id === state.roomTypeId)
      if (!rt) {
        return {
          contractPrice: null,
          roomsAvailable: 0
        }
      }
      const priceAndAvailability = rt.priceAndAvailability.find(p => p.stayDate === stayDate)
      if (!priceAndAvailability) {
        return {
          contractPrice: null,
          roomsAvailable: 0
        }
      }
      return {
        contractPrice: priceAndAvailability.contractPrice,
        roomsAvailable: priceAndAvailability.roomsAvailable
      }
    }
  },
  actions
}

export default reservationCalendar

import actions from './actions'

const usageHistory = {
  state: {
    nearFutureBookings: [],
    futureBookings: [],
    pastBookings: [],
    selectedBooking: null,
    changeCompleted: false
  },
  mutations: {
    setNearFutureBookings (state, bookings) {
      state.nearFutureBookings = bookings
    },
    setFutureBookings (state, bookings) {
      state.futureBookings = bookings
    },
    setPastBookings (state, bookings) {
      state.pastBookings = bookings
    },
    setSelectedBooking (state, booking) {
      if (booking.guests) {
        booking.guests = booking.guests.sort((a, b) => {
          if (a.representative) return -1
          if (b.representative) return 1
          if (!a.child && b.child) return -1
          if (a.child && !b.child) return 1
          if (!a.bedShared && b.bedShared) return -1
          if (a.bedShared && !b.bedShared) return 1

          return a.id - b.id
        })
      }
      state.selectedBooking = booking
    },
    updateGuestOfSelectedBooking (state, {
      ind,
      guest
    }) {
      const booking = { ...state.selectedBooking }
      booking.guests.splice(ind, 1, guest)

      state.selectedBooking = booking
    },
    setChangeCompleted (state, completed) {
      state.changeCompleted = completed
    }
  },
  getters: {
    nearFutureBookings: state => state.nearFutureBookings,
    futureBookings: state => state.futureBookings,
    pastBookings: state => state.pastBookings,
    selectedBooking: state => state.selectedBooking
  },
  actions
}

export default usageHistory

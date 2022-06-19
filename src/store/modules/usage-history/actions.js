import { flattenRentalItemRequest, flattenRentalParkingRequest } from '@/api/booking'
import { CALCULATE_PRICE } from '@/api/graphql/new-booking'
import { apolloClient } from '@/plugins/apollo'
import { isoDate } from '@/utils/get-date'
import {
  LIST_NEAR_FUTURE_BOOKINGS,
  LIST_FUTURE_BOOKINGS,
  LIST_PAST_BOOKINGS,
  GET_BOOKING,
  GET_BOOKING_WITH_CODE,
  PRE_CHECK_IN_WITH_CODE,
  PRE_CHECK_IN,
  CONFIRM_STAY,
  CALCULATE_EXTEND_FEE,
  EXTEND_BOOKING,
  CALCULATE_CANCEL_PENALTY,
  CANCEL_BOOKING,
  CHANGE_BOOKING_GUESTS,
  UPDATE_RENTAL_ITEMS,
  UPDATE_PARKINGS,
  UPDATE_BOOKING_INFO
} from '@/api/graphql/usage-history'

// must freeze the `today` at the time of page load
const recentToDays = Number(process.env.VUE_APP_BOOKING_RECENT_TO_DAYS || '30')
const date = new Date()
const today = isoDate(date)
date.setDate(date.getDate() - 1)
const yesterday = isoDate(date)
const date2 = new Date()
date2.setDate(date2.getDate() + recentToDays)
const recentToDate = isoDate(date2)
date2.setDate(date2.getDate() + 1)
const recentToDatePlus1 = isoDate(date2)

export default {
  async loadNearFutureBookings ({ commit }) {
    const res = await apolloClient.query({
      query: LIST_NEAR_FUTURE_BOOKINGS,
      variables: {
        today,
        recentToDate
      },
      fetchPolicy: 'no-cache'
    })

    const bookings = res.data.myBookingList.items
    commit('setNearFutureBookings', bookings)
  },
  async loadFutureBookings ({ commit }) {
    const res = await apolloClient.query({
      query: LIST_FUTURE_BOOKINGS,
      variables: {
        recentToDatePlus1
      }
    })

    const bookings = res.data.myBookingList.items
    commit('setFutureBookings', bookings)
  },
  async loadPastFutureBookings ({ commit, state }) {
    const res = await apolloClient.query({
      query: LIST_PAST_BOOKINGS,
      variables: {
        yesterday,
        skip: state.pastBookings?.length ?? 0,
        take: 10
      },
      fetchPolicy: 'no-cache'
    })

    const bookings = res.data.myBookingList.items
    commit('setPastBookings', (state.pastBookings ?? []).concat(bookings))
  },
  async loadBookingDetail ({ commit }, { id, code }) {
    let res
    if (code) {
      res = await apolloClient.query({
        query: GET_BOOKING_WITH_CODE,
        variables: {
          bookingId: id,
          code
        },
        fetchPolicy: 'no-cache'
      })
    } else {
      res = await apolloClient.query({
        query: GET_BOOKING,
        variables: {
          bookingId: id
        },
        fetchPolicy: 'no-cache'
      })
    }

    const booking = res.data.myBooking
    commit('setSelectedBooking', booking)
    return booking
  },
  async confirmStay (_ctx, { id }) {
    const res = await apolloClient.mutate({
      mutation: CONFIRM_STAY,
      variables: {
        bookingId: id
      }
    })

    return res.data.confirmMyStay
  },

  async preCheckIn (_ctx, { id, code, guests }) {
    const varGuests = guests.map((g) => {
      return {
        guestId: g.id,
        address1: g.address1,
        occupation: g.occupation,
        age: g.age,
        sex: g.sex,
        tel: g.tel,
        email: g.email,
        nationality: g.nationality,
        passportNumber: g.passportNumber,
        passportPhoto: g.passportPhoto
      }
    })
    if (code) {
      await apolloClient.mutate({
        mutation: PRE_CHECK_IN_WITH_CODE,
        variables: {
          bookingId: id,
          code,
          guests: varGuests
        }
      })
    } else {
      await apolloClient.mutate({
        mutation: PRE_CHECK_IN,
        variables: {
          bookingId: id,
          guests: varGuests
        }
      })
    }
  },

  async calculateExtendFee (_ctx, {
    id, days
  }) {
    const res = await apolloClient.query({
      query: CALCULATE_EXTEND_FEE,
      variables: {
        bookingId: id,
        days
      }
    })

    const result = res.data.checkPriceForMyBookingExtension
    let accommodationPrice = 0
    let accommodationPriceSp = 0
    let accommodationPriceFp = 0
    result.days.forEach(day => {
      if (days.includes(day.stayDate)) {
        accommodationPrice += day.accommodationPrice ?? 0
        accommodationPriceSp += day.accommodationPriceSp ?? 0
        accommodationPriceFp += day.accommodationPriceFp ?? 0
      }
    })
    result.totalAdditional = {
      accommodationPrice,
      accommodationPriceSp,
      accommodationPriceFp
    }

    return result
  },

  async extendBooking (_ctx, {
    id, days, password
  }) {
    const res = await apolloClient.mutate({
      mutation: EXTEND_BOOKING,
      variables: {
        bookingId: id,
        days,
        password
      }
    })

    return res.extendMyBooking
  },

  async calculateCancelPenalty (_ctx, {
    bookingId,
    cancelDates
  }) {
    const res = await apolloClient.mutate({
      mutation: CALCULATE_CANCEL_PENALTY,
      variables: {
        bookingId,
        cancelDates
      }
    })

    return res.data.calculateMyBookingCancelPenalty
  },
  async cancelBooking (_ctx, {
    bookingId,
    cancelDates,
    password,
    useTvp
  }) {
    const res = await apolloClient.mutate({
      mutation: CANCEL_BOOKING,
      variables: {
        bookingId,
        cancelDates,
        password,
        useTvp
      }
    })

    return res.data.calculateMyBookingCancelPenalty
  },

  async calculateUpdateBookingGuests (_ctx, {
    booking,
    guests
  }) {
    const res = await apolloClient.query({
      query: CALCULATE_PRICE,
      variables: {
        contractId: booking.contract.id,
        roomTypeId: booking.room.roomTypeId,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        numberOfAdults: guests.filter(g => !g.child).length,
        numberOfChildren: guests.filter(g => g.child && !g.bedShared).length,
        numberOfBedShare: guests.filter(g => g.child && g.bedShared).length,
        bookingPlanId: booking.bookingPlanId,
        bookingId: booking.id
      },
      fetchPolicy: 'no-cache'
    })

    const pricesByDay = res.data.calculateMyAccommodationPrice.pricesByDay
    return {
      totalPrice: pricesByDay.reduce((sum, day) => sum + day.accommodationFee, 0),
      pricesByDay
    }
  },

  async updateBookingGuests (_ctx, {
    password,
    bookingId,
    guests
  }) {
    const map = (g) => ({
      name: g.name,
      kana: 'a',
      child: g.child,
      bedShared: g.bedShared,
      address1: g.address1,
      occupation: g.occupation,
      age: g.age,
      sex: g.sex,
      tel: g.tel,
      email: g.email,
      nationality: g.nationality,
      passportNumber: g.passportNumber,
      passportPhoto: g.passportPhoto
    })

    const res = await apolloClient.mutate({
      mutation: CHANGE_BOOKING_GUESTS,
      variables: {
        password,
        bookingId,
        guests: guests.filter(g => !g.representative).map(map),
        representative: map(guests.find(g => g.representative))
      }
    })
    return res.data.updateMyBookingGuests
  },

  async updateRentalItems (_ctx, {
    bookingId,
    rentalItems
  }) {
    const res = await apolloClient.mutate({
      mutation: UPDATE_RENTAL_ITEMS,
      variables: {
        bookingId,
        rentalItems: flattenRentalItemRequest(rentalItems)
      }
    })
    return res.data.updateMyBookingRentalItems
  },

  async updateParkings (_ctx, {
    bookingId,
    parkings
  }) {
    if (typeof parkings !== 'number') {
      // parkings are managed in this facility
      const res = await apolloClient.mutate({
        mutation: UPDATE_PARKINGS,
        variables: {
          bookingId,
          parkings: flattenRentalParkingRequest(parkings, true)
        }
      })
      return res.data.updateMyBookingParking
    } else {
      const res = await apolloClient.mutate({
        mutation: UPDATE_BOOKING_INFO,
        variables: {
          bookingId,
          data: {
            parkingRequestedNumber: parkings
          }
        }
      })
      return res.data.updateMyBooking
    }
  }
}

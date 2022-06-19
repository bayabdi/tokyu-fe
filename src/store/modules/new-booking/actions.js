import { flattenRentalItemRequest, flattenRentalParkingRequest } from '@/api/booking'
import {
  SEARCH_VACANCY, GET_SEARCH_TAGS, GET_FACILITY_LIST,
  CALCULATE_PRICE, GET_AVAILABLE_PLANS, CREATE_TEMPORARY_BOOKING,
  EXTEND_TEMPORARY_BOOKING, REMOVE_TEMPORARY_BOOKING,
  CONFIRM_BOOKING_GROUP, RENTAL_ITEM_LIST, PARKING_LIST
} from '@/api/graphql/new-booking'
import { getPriceWithNormalTax } from '@/constants/sales-tax'
import { apolloClient } from '@/plugins/apollo'

export default {
  async searchVacancy ({ commit, state }) {
    const res = await apolloClient.query({
      query: SEARCH_VACANCY,
      variables: {
        fromDate: state.checkInDate,
        toDate: state.checkOutDate,
        contractId: state.contractId,
        tags: state.tags ?? [],
        facilityIds: state.facilities?.map(f => f.id) ?? [],
        numberOfAdults: state.numberOfAdults,
        numberOfChildren: state.numberOfChildren,
        numberOfBedShare: state.numberOfBedShare
      },
      fetchPolicy: 'no-cache'
    })

    const facilities = res.data.bookingAvailableFacilityList
    commit('setVacancyList', facilities)
  },
  async getSearchTags () {
    const res = await apolloClient.query({
      query: GET_SEARCH_TAGS,
      variables: { }
    })
    return res.data.enumFacilitySearchTagList.map(tag => tag.name)
  },
  async getFacilityListForBooking () {
    const res = await apolloClient.query({
      query: GET_FACILITY_LIST,
      variables: { }
    })

    return res.data.publicFacilityList
  },
  async getPricingOfFacility ({ state }, { facilityId, fromDate, toDate }) {
    const res = await apolloClient.query({
      query: SEARCH_VACANCY,
      variables: {
        fromDate,
        toDate,
        contractId: state.contractId,
        tags: [],
        facilityIds: [facilityId],
        numberOfAdults: state.numberOfAdults,
        numberOfChildren: state.numberOfChildren,
        numberOfBedShare: state.numberOfBedShare
      },
      fetchPolicy: 'no-cache'
    })

    return res.data.bookingAvailableFacilityList[0]
  },
  async calculateAccommodationPrice ({ state }, { noPlan } = {}) {
    let totalPrice = 0
    const prices = []
    for (const { adults, children, bedShare } of state.numberOfGuests) {
      const res = await apolloClient.mutate({
        mutation: CALCULATE_PRICE,
        variables: {
          contractId: state.contractId,
          roomTypeId: state.roomTypeId,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate,
          numberOfAdults: adults,
          numberOfChildren: children,
          numberOfBedShare: bedShare,
          bookingPlanId: noPlan ? null : state.bookingPlanId
        }
      })
      const pricesByDay = res.data.calculateMyAccommodationPrice.pricesByDay
      totalPrice += pricesByDay.reduce((sum, day) => sum + day.accommodationFee, 0)
      prices.push(pricesByDay)
    }
    return {
      totalPrice,
      prices
    }
  },
  async loadAvailableBookingPlans ({ state, commit }) {
    const res = await apolloClient.query({
      query: GET_AVAILABLE_PLANS,
      variables: {
        contractId: state.contractId,
        roomTypeId: state.roomTypeId,
        checkInDate: state.checkInDate,
        checkOutDate: state.checkOutDate,
        rooms: state.numberOfGuests.map(g => ({
          numberOfAdults: g.adults,
          numberOfChildren: g.children,
          numberOfChildrenWithBedShare: g.bedShare
        }))
      },
      fetchPolicy: 'no-cache'
    })

    commit('setBookingPlans', res.data.availableBookingPlanList.items)
  },
  async createTemporaryBooking ({ state, commit }) {
    const res = await apolloClient.mutate({
      mutation: CREATE_TEMPORARY_BOOKING,
      variables: {
        roomTypeId: state.roomTypeId,
        bookingPlanId: state.bookingPlanId,
        checkInDate: state.checkInDate,
        checkOutDate: state.checkOutDate,
        contractId: state.contractId,
        rooms: state.numberOfGuests.map(g => ({
          numberOfAdults: g.adults,
          numberOfChildren: g.children,
          numberOfChildrenWithBedShare: g.bedShare
        }))
      }
    })

    commit('setTemporaryBookingGroup', res.data.createTemporaryBookingGroup)
  },
  async extendTemporaryBookingTimeout ({ getters }) {
    await apolloClient.mutate({
      mutation: EXTEND_TEMPORARY_BOOKING,
      variables: {
        bookingGroupId: getters.temporaryBookingGroupId
      }
    })
  },
  async deleteTemporaryBooking ({ commit, getters }) {
    const bookingGroupId = getters.temporaryBookingGroupId
    commit('setTemporaryBookingGroup', null)
    if (bookingGroupId) {
      await apolloClient.mutate({
        mutation: REMOVE_TEMPORARY_BOOKING,
        variables: {
          bookingGroupId
        }
      })
    }
  },
  async confirmBookingGroup ({ commit, getters }, {
    requestSameRoom,
    requestMailCertificate,
    feePaymentType
  }) {
    const bookingGroupId = getters.temporaryBookingGroupId
    await apolloClient.mutate({
      mutation: CONFIRM_BOOKING_GROUP,
      variables: {
        bookingGroupId,
        requestSameRoom,
        requestMailCertificate,
        feePaymentType,
        bookings: getters.temporaryBookingGroup.bookings.map(b => {
          const reserveParking = typeof b.parkings !== 'number'
          return {
            id: b.id,
            parkingRequestNumber: reserveParking ? null : b.parkings,
            petNumber: b.pets?.petNumber,
            petBreed: b.pets?.petBreed,
            guests: b.guests.map(g => ({
              id: g.id,
              name: g.name,
              address1: g.address,
              occupation: g.occupation,
              age: g.age,
              sex: g.sex,
              tel: g.tel,
              email: g.email,
              nationality: g.nationality,
              passportNumber: g.passportNumber,
              passportPhoto: g.passportPhoto
            })),
            rentalItems: b.rentalItems ? flattenRentalItemRequest(b.rentalItems) : [],
            parkings: reserveParking && b.parkings ? flattenRentalParkingRequest(b.parkings) : []
          }
        })
      }
    })
    commit('setTemporaryBookingGroup', null)
  },
  async loadRentalItemsForBooking ({ state, commit, getters }, {
    facilityId,
    checkInDate,
    checkOutDate
  }) {
    const res = await apolloClient.mutate({
      mutation: RENTAL_ITEM_LIST,
      variables: {
        facilityId,
        checkInDate,
        checkOutDate
      }
    })
    commit('setRentalItemList', res.data.clientRentalItemList.map(item => {
      item.maxQuantity = item.availabilities.reduce((min, av) => Math.min(min, av.quantity), 1000)
      item.rentalItemDef.priceWithSalesTax = getPriceWithNormalTax(item.rentalItemDef.price)
      return item
    }))
  },

  async loadParkingsForBooking ({ state, commit, getters }, {
    facilityId,
    checkInDate,
    checkOutDate
  }) {
    const res = await apolloClient.mutate({
      mutation: PARKING_LIST,
      variables: {
        facilityId,
        checkInDate,
        checkOutDate
      }
    })
    commit('setParkingList', res.data.clientFacilityParkingList.map(item => {
      item.maxQuantity = item.availabilities.reduce((min, av) => Math.min(min, av.quantity), 1000)
      return item
    }))
  }
}

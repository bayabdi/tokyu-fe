import { isPointBasedProduct, isTvpPaymentAllowedProduct } from '@/constants/product'
import { getNumberOfDaysBetween } from '@/utils/get-date'
import { calculateRentalItemPrice } from '@/utils/prices'
import actions from './actions'

const newBooking = {
  state: {
    contractId: null,
    checkInDate: null,
    checkOutDate: null,
    vacancyList: null,
    tags: [],
    facilities: [],
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfBedShare: 0,
    numberOfRooms: 1,
    numberOfGuests: [],
    roomTypeId: null,
    facilityInfo: null,
    bookingPlans: [],
    bookingPlanId: null,
    temporaryBookingGroup: null,
    rentalItems: [],
    parkings: []
  },
  mutations: {
    setContractIdForNewBooking (state, contractId) {
      state.contractId = contractId
    },
    setCheckInDate (state, checkInDate) {
      state.checkInDate = checkInDate
    },
    setCheckOutDate (state, checkOutDate) {
      state.checkOutDate = checkOutDate
    },
    setVacancyList (state, vacancyList) {
      state.vacancyList = vacancyList
    },
    setSearchTags (state, tags) {
      state.tags = tags
    },
    setSearchFacilityIds (state, facilities) {
      state.facilities = facilities
    },
    setSearchNumberOfAdults (state, numberOfAdults) {
      state.numberOfAdults = numberOfAdults
    },
    setSearchNumberOfChildren (state, numberOfChildren) {
      state.numberOfChildren = numberOfChildren
    },
    setSearchNumberOfBedShare (state, numberOfBedShare) {
      state.numberOfBedShare = numberOfBedShare
    },
    setRoomTypeIdForBooking (state, roomTypeId) {
      state.roomTypeId = roomTypeId
    },
    setNumberOfRoomsForBooking (state, numberOfRooms) {
      const current = state.numberOfGuests.length
      if (current > numberOfRooms) {
        state.numberOfGuests = state.numberOfGuests.slice(0, numberOfRooms)
      } else {
        state.numberOfGuests = state.numberOfGuests.concat([...Array(numberOfRooms - current)].map(() => ({
          adults: 1,
          children: 0,
          bedShare: 0
        })))
      }
      state.numberOfRooms = numberOfRooms
    },
    setNumberOfGuestsForBooking (state, numberOfGuests) {
      state.numberOfGuests = numberOfGuests
      if (state.numberOfGuests.length !== state.numberOfRooms) {
        state.numberOfRooms = state.numberOfGuests.length
      }
    },
    setNumberOfRoomBedShare (state, { ind, num }) {
      state.numberOfGuests[ind].bedShare = num
    },
    setNumberOfRoomChildren (state, { ind, num }) {
      state.numberOfGuests[ind].children = num
    },
    setNumberOfRoomAdults (state, { ind, num }) {
      state.numberOfGuests[ind].adults = num
    },
    setFacilityInfoForBooking (state, facilityInfo) {
      state.facilityInfo = facilityInfo
    },
    setBookingPlans (state, bookingPlans) {
      state.bookingPlans = bookingPlans
    },
    setBookingPlanId (state, bookingPlanId) {
      state.bookingPlanId = bookingPlanId
    },
    setTemporaryBookingGroup (state, temporaryBookingGroup) {
      state.temporaryBookingGroup = temporaryBookingGroup
    },
    setRentalItemList (state, rentalItems) {
      state.rentalItems = rentalItems
    },
    setParkingList (state, parkings) {
      state.parkings = parkings
    }
  },
  getters: {
    isReadyForSearch: (state) => {
      return state.contractId && state.checkInDate && state.checkOutDate
    },
    getAvailableFacilities: (_state, getters) => (reversed) => {
      const facilities = getters.availableFacilities
      // sort it by the 1. unavailable count ASC, then by totalPrice: ASC
      facilities.sort((a, b) => {
        if (a.priceScore.unavailableCount === b.priceScore.unavailableCount) {
          if (reversed) {
            const c = a
            a = b
            b = c
          }
          return a.priceScore.totalPrice - b.priceScore.totalPrice
        } else {
          return a.priceScore.unavailableCount - b.priceScore.unavailableCount
        }
      })
      return facilities
    },
    availableFacilities: (state) => {
      if (!state.vacancyList) return []
      return state.vacancyList.map(facility => {
        const priceFrom = {}

        facility.roomTypes.forEach(roomType => {
          roomType.priceAndAvailability.forEach(ap => {
            let price = ap.contractPrice
            if (ap.roomsAvailable <= 0) price = null

            if (!priceFrom[ap.stayDate] || (
              typeof price === 'number' &&
              priceFrom[ap.stayDate] > price
            )) {
              priceFrom[ap.stayDate] = price
            }
          })
        })
        const priceFromArray = Object.keys(priceFrom).sort().map(stayDate => ({
          stayDate,
          price: priceFrom[stayDate]
        }))
        const priceScore = priceFromArray.reduce((score, day) => {
          if (typeof day.price !== 'number') {
            // the date is unavailable, increment the count
            score.unavailableCount++
          } else {
            score.totalPrice += day.price
          }
          return score
        }, {
          unavailableCount: 0,
          totalPrice: 0
        })
        return {
          ...facility,
          priceFrom: priceFromArray,
          priceScore
        }
      })
    },
    contractForNewBooking: (state, getters) => getters.getContractById(state.contractId),
    newBookingContractProductId: (_state, getters) => {
      return getters.contractForNewBooking.productTypeId
    },
    isPointBasedProduct: (state, getters) => isPointBasedProduct(getters.newBookingContractProductId),
    newBookingAccommodationPriceUnit: (state, getters) => (options = {
      pointsToJapan: false
    }) => {
      if (getters.isPointBasedProduct) {
        if (options.pointsToJapan) return 'ポイント'
        return 'Pt'
      }
      return '円'
    },
    remainingPointsForBooking: (state, getters) => {
      return {
        remainingPoint: getters.getPointByContractId(state.contractId)?.pointRemains,
        isPointBasedProduct: isPointBasedProduct(
          getters.getContractById(state.contractId)?.productTypeId
        )
      }
    },
    numberOfStayDays: state => {
      return getNumberOfDaysBetween(state.checkInDate, state.checkOutDate)
    },
    isReadyForPriceTemporaryBooking (state) {
      return state.roomTypeId &&
        state.checkInDate &&
        state.checkOutDate &&
        state.contractId &&
        state.numberOfGuests.length
    },
    roomTypeForBooking (state) {
      if (state.roomTypeId && state.facilityInfo) {
        const found = state.facilityInfo.roomTypes.find(rt => rt.id === state.roomTypeId)
        if (found) return found
      }
      return null
    },
    temporaryBookingGroup (state) {
      return state.temporaryBookingGroup
    },
    temporaryBookingGroupId (state, getters) {
      return getters.temporaryBookingGroup?.id
    },
    rentalItemsForBooking (state) {
      return state.rentalItems
    },
    parkingsForBooking (state) {
      return state.parkings
    },
    isTvpPaymentAllowed (state, getters) {
      return isTvpPaymentAllowedProduct(
        getters.getContractById(state.contractId)?.productTypeId
      )
    },
    rentalItemSummary (state, getters) {
      let grandTotal = 0
      let charges = []
      getters.temporaryBookingGroup.bookings.forEach(b => {
        const result = calculateRentalItemPrice(b.rentalItems)
        grandTotal += result.totalPrice
        charges = charges.concat(result.charges)
      })

      const itemNameAndPrice = {}
      charges.forEach(c => {
        itemNameAndPrice[c.name] = (itemNameAndPrice[c.name] ?? 0) + c.price
        return itemNameAndPrice
      })
      const chargeSummary = Object.keys(itemNameAndPrice).map(name => {
        return {
          name,
          price: itemNameAndPrice[name]
        }
      })

      return {
        totalPrice: grandTotal,
        charges: chargeSummary
      }
    },
    isParkingManagedFacility (state) {
      return !!state.parkings.length
    },
    isPetManagedFacility (state) {
      return state.facilityInfo.tags.includes('ペット可')
    },
    parkingReservationCount (state, getters) {
      let parkingCount = 0
      getters.temporaryBookingGroup.bookings.forEach(b => {
        if (typeof b.parkings === 'number') {
          parkingCount += b.parkings
        } else {
          parkingCount += b.parkings?.length ?? 0
        }
      })

      return parkingCount
    }
  },
  actions
}

export default newBooking

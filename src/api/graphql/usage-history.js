import gql from 'graphql-tag'

const BookingFragment = `fragment bookingCard on Booking {
  id # Booking ID 予約ID
  checkInDate
  checkOutDate
  bookingTypeId
  room {
    roomType {
      name # Room type name 部屋タイプ名
      facility {
        name: nameOnClientWeb #Facility Name 施設名
        mainImageUrl
      }
    }
  }
  stayConfirmedAt
}`

export const LIST_NEAR_FUTURE_BOOKINGS = gql`
query(
  $today: DateString!
  $recentToDate: DateString!
) {
  myBookingList(
    filter: { checkInDateFrom: $today, checkInDateTo: $recentToDate }
    orderBy: { fieldName: "booking.checkInDate", direction: "ASC" }
  ) {
    items {
      ...bookingCard
    }
  }
}

${BookingFragment}
`

export const LIST_FUTURE_BOOKINGS = gql`
query(
  $recentToDatePlus1: DateString!
) {
  myBookingList(
    filter: {
      checkInDateFrom: $recentToDatePlus1
    }
    orderBy: { fieldName: "booking.checkInDate", direction: "ASC" }
  ) {
    items {
      ...bookingCard
    }
  }
}

${BookingFragment}`

export const LIST_PAST_BOOKINGS = gql`
query(
  $yesterday: DateString!
  $skip: Int!
  $take: Int!
) {
  myBookingList(
    filter: {
      checkInDateTo: $yesterday
    }
    orderBy: { fieldName: "booking.checkInDate", direction: "DESC" }
    pagination: {
      skip: $skip
      take: $take
    }
  ) {
    items {
      ...bookingCard
    }
  }
}

${BookingFragment}`

const GetBookingFragment = `
fragment getBooking on Booking {
  id
  bookingTypeId
  cancelledAt
  canModifyByClient
  checkInDate
  checkOutDate
  checkedInAt
  bookingPlanId
  parkingRequestedNumber
  room {
    roomTypeId
    roomType {
      name
      facility {
        id
        name
        mainImageUrl
        facilityHpUrl
      }
    }
  }
  contract {
    id
    productTypeId
    productType {
      name
    }
  }
  id
  guests {
    id
    child
    bedShared
    name
    address1
    age
    sex
    tel
    email
    nationality
    passportNumber
    passportPhoto
    representative
    occupation
    stayDateRange {
      fromDate
      toDate
    }
  }
  rentalItems {
    rentalItemReservationId: id
    quantity
    fromDate
    toDate
    rentalItemId
    unitPrice
    rentalPeriod
    rentalItem {
      rentalItemDef {
        name
      }
    }
  }
  parkingRequestedNumber
  parkings {
    id
    carNumber
    color
    fromDate
    toDate
    facilityParkingId
  }
  optionalCleaningTotal: chargeTotal(
    typeIds: 5
  ) {
    totalJpy
  }
  accommodationFeeTotal: chargeTotal(
    typeIds: [1, 2]
  ) {
    totalJpy
    totalSp
    totalFp
  }
  finalizedInvoices {
    pdfFileUrl
    receiptId
  }
}
`
export const GET_BOOKING = gql`
query($bookingId: Int!) {
  myBooking(
    id: $bookingId
  ) {
    ...getBooking
  }
}
${GetBookingFragment}
`

export const GET_BOOKING_WITH_CODE = gql`
query($bookingId: Int!, $code: String!) {
  myBooking: myBookingNonLogin(
    id: $bookingId
    code: $code
  ) {
    ...getBooking
  }
}
${GetBookingFragment}
`

export const PRE_CHECK_IN = gql`
mutation (
  $bookingId: Int!
  $guests: [MyBookingPreCheckInFilterInput!]!
) {
  preCheckIn: preCheckInMyBooking(
    bookingId: $bookingId
    data: $guests
  )
}`

export const PRE_CHECK_IN_WITH_CODE = gql`
mutation (
  $bookingId: Int!
  $guests: [MyBookingPreCheckInFilterInput!]!
  $code: String!
) {
  preCheckIn: preCheckInMyBookingNonLogin(
    bookingId: $bookingId
    data: $guests
    code: $code
  )
}`

export const CONFIRM_STAY = gql`
mutation ($bookingId: Int!) {
  confirmMyStay(
    bookingId: $bookingId
  ) {
    __typename
  }
}
`

export const CALCULATE_EXTEND_FEE = gql`
query (
  $bookingId: Int!
  $days: [DateString!]!
) {
  checkPriceForMyBookingExtension(
    bookingId: $bookingId
    days: $days
  ) {
    days {
      stayDate # Date of stay Attention! The price for the entire reservation will be included. Please filter and display only the extended amount. 宿泊日 注意！予約の全日程の料金が入ります。延長した分だけをFilterして表示して下さい
      accommodationPrice # Charges for this day of stay (Japanese Yen) この宿泊日の料金（日本円）
      accommodationPriceSp # Price SP 料金SP
      accommodationPriceFp # Price FP 料金FP
    }
  }
}`

export const EXTEND_BOOKING = gql`
mutation (
  $bookingId: Int!
  $days: [DateString!]!
  $password: String!
) {
  extendMyBooking(
    bookingId: $bookingId
    days: $days
    password: $password
  )
}`

export const CALCULATE_CANCEL_PENALTY = gql`
query (
  $bookingId: Int!
  $cancelDates: [DateString!]!
) {
  calculateMyBookingCancelPenalty(
    bookingId: $bookingId
    stayDates: $cancelDates
  ) {
    penalties {
      stayDate
      price
      spPoint
      fpPoint
      penaltyRate
      penaltyPrice
      penaltySpPoint
      penaltyFpPoint
    }
  }
}`

export const CANCEL_BOOKING = gql`
mutation (
  $bookingId: Int!
  $cancelDates: [DateString!]!
  $password: String!
  $useTvp: Int
) {
  cancelMyBooking(
    bookingId: $bookingId
    stayDates: $cancelDates
    password: $password
    useTvp: $useTvp
  ) {
    __typename
  }
}`

export const CHANGE_BOOKING_GUESTS = gql`
mutation (
  $bookingId: Int!
  $guests: [UpdateMyBookingGuestDataInput!]!
  $representative: UpdateMyBookingGuestDataInput!
  $password: String!
) {
  updateMyBookingGuests(
    bookingId: $bookingId
    data: $guests
    representative: $representative
    password: $password
  )
}
`

export const UPDATE_RENTAL_ITEMS = gql`
mutation (
  $bookingId: Int!
  $rentalItems: [UpdateMyRentalItemInput!]!
) {
  updateMyBookingRentalItems(
    bookingId: $bookingId
    rentalItems: $rentalItems
  )
}`

export const UPDATE_PARKINGS = gql`
mutation (
  $bookingId: Int!
  $parkings: [UpdateMyFacilityParkingReservationInput!]!
) {
  updateMyBookingParking(
    bookingId: $bookingId
    parkings: $parkings
  )
}`

export const UPDATE_BOOKING_INFO = gql`
mutation (
  $bookingId: Int!
  $data: UpdateMyBookingInput!
) {
  updateMyBooking (
    bookingId: $bookingId
    data: $data
  )
}`

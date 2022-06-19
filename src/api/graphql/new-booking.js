import gql from 'graphql-tag'

export const SEARCH_VACANCY = gql`
query (
  $fromDate: DateString! # search from date
  $toDate: DateString! # search to date
  $contractId: Int! #ID of contract Int!
  $tags: [String!] # search tag 検索タグ [String!]
  $facilityIds: [Int!] # Facility ID 施設ID [Int!]
  $numberOfAdults: Int! # num of adult 大人 Int
  $numberOfChildren: Int! # num of Child 子供なし子供
  $numberOfBedShare: Int! # num of Child bed share 添い寝あり子供
) {
  bookingAvailableFacilityList (
    fromDate: $fromDate
    toDate: $toDate
    contractId: $contractId
    tags: $tags
    facilityIds: $facilityIds
    numberOfAdults: $numberOfAdults
    numberOfChildren: $numberOfChildren
    numberOfBedShare: $numberOfBedShare
  ) {
    id
    name: nameOnClientWeb # Facility Name 施設名
    tags # tags タグ string array
    mainImageUrl
    facilityHpUrl # Link to facility information page 施設情報ページのリンク
    address1
    postalCode
    roomTypes {
      id # Room Type ID (used for reservation) 部屋タイプID（予約で使用します）
      name # Room type name 部屋タイプ名
      maxOccupancy
      bedShareMaxOccupancy
      priceAndAvailability {
        stayDate # StayDate 宿泊日
        contractPrice
        roomsAvailable
      }
    }
  }
}
`

export const GET_SEARCH_TAGS = gql`
query {
  enumFacilitySearchTagList {name}
}
`

export const GET_FACILITY_LIST = gql`
query {
  publicFacilityList {
    id name shortName
  }
}`

export const CALCULATE_PRICE = gql`
mutation (
  $contractId: Int!
  $roomTypeId: Int!
  $checkInDate: DateString! # DateString!
  $checkOutDate: DateString! #DaetString!
  $numberOfAdults: Int!
  $numberOfChildren: Int!
  $numberOfBedShare: Int!
  $bookingPlanId: Int  # Null for without plan プラン未使用はNull
  $bookingId: Int  #Each reservation ID 各予約ID
) {
  calculateMyAccommodationPrice (
    contractId: $contractId
    roomTypeId: $roomTypeId
    checkInDate: $checkInDate
    checkOutDate: $checkOutDate
    numberOfAdults: $numberOfAdults
    numberOfChildren: $numberOfChildren
    numberOfBedShare: $numberOfBedShare
    bookingPlanId: $bookingPlanId
    bookingId: $bookingId
  ) {
    pricesByDay {
      date
      accommodationFee
      fees {
        subject
        price
        taxIncluded
        taxType
        priceWithSalesTax
      }
    }
  }
}`

export const GET_AVAILABLE_PLANS = gql`
query (
  $roomTypeId: Int! #Room Type ID 部屋タイプID Int!
  $checkInDate: DateString! #  Check-in date チェックイン日 DateString!
  $checkOutDate: DateString! #  Check-out date  チェックアウト日 DateString!
  $contractId: Int! #契約のID Int!
  $rooms: [AvailableBookingPlanRoomsInput!]!
) {
  availableBookingPlanList(filter : {
    roomTypeId: $roomTypeId
    checkInDate: $checkInDate
    checkOutDate: $checkOutDate
    contractId: $contractId
    rooms: $rooms
  }) {
    items {
      id
      title
      subtitle # Sub title サブタイトル
      description # Description 説明

      prices {
        stayDate # Stay date 宿泊日
        accommodationPrice # Price of JPY JPYでの価格
        accommodationPriceSp # Price of SP SPの価格
        accommodationPriceFp # Price of FP FPの価格
        bookingPlanFee {
          price # Expenses attached to the plan (always JPY) (to be recorded as other expenses) プランに付属する費用(常にJPY)（その他費用として計上すること）
        }
      }
      noShowPenalty # Penalty for no-shows ノーショーの場合のペナルティ （小数）
      day0Penalty # Penalty for same-day cancellation 当日キャンセルのペナルティ
      threshold1Day # Deadline1 X day before  ◯日前の期限1
      threshold1Penalty # Penalty rate for deadline 1 期限1のペナルティ率
      threshold2Day # Deadline2 X day before ◯日前の期限2
      threshold2Penalty # Penalty rate for deadline 2 期限2のペナルティ率
      threshold3Day # Deadline3 X day before ◯日前の期限3
      threshold3Penalty #Penalty rate for deadline 3 期限3のペナルティ率
      threshold4Day #  Deadline4 X day before ◯日前の期限4
      threshold4Penalty # Penalty rate for deadline 4 期限4のペナルティ率
      threshold5Day #  Deadline5 X day before ◯日前の期限5
      threshold5Penalty # Penalty rate for deadline 5 期限5のペナルティ率
      threshold6Day #  Deadline6 X day before ◯日前の期限6
      threshold6Penalty # Penalty rate for deadline 6 期限6のペナルティ率
      threshold7Day #  Deadline7 X day before ◯日前の期限7
      threshold7Penalty # Penalty rate for deadline 7 期限7のペナルティ率
    }
  }
}`

export const CREATE_TEMPORARY_BOOKING = gql`
mutation (
  $roomTypeId: Int!
  $bookingPlanId: Int
  $checkInDate: DateString!
  $checkOutDate: DateString!
  $contractId: Int!
  $rooms: [CreateTemporaryBookingRoomInput!]! # array of the number of adult, child, bedshare
) {
  createTemporaryBookingGroup(
    roomTypeId: $roomTypeId
    bookingPlanId: $bookingPlanId
    checkInDate: $checkInDate
    checkOutDate: $checkOutDate
    contractId: $contractId # Contract ID 契約ID
    rooms: $rooms
  ) {
    id # Reservation group ID (use this to confirm, etc.) 予約グループID（これを利用して確定など行う）
    bookings {
      id # Reservation ID, which is also used to process the reservation confirmation. 予約ID、これも利用して予約確定処理を行う
      checkInDate
      checkOutDate
      guests { # guest 宿泊者
        id # Guest ID, which is also used for confirmation. 宿泊者ID、これも確定時に利用する。
        representative # Boolean! True for representative, False for others 代表者はTrue,それ以外はFalse
        child # Boolean! True for children (including Children sleeping with parents), False for other children (adults). 子供（添い寝を含む)はTrue,それ以外（大人）はFalse
        bedShared # Boolean! true for children sleeping together, false for others 添い寝子供はtrue,それ以外はFalse
      }
    }
  }
}`

export const EXTEND_TEMPORARY_BOOKING = gql`
mutation (
  $bookingGroupId: Int!
) {
  extendBookingGroup(id: $bookingGroupId)
}`

export const REMOVE_TEMPORARY_BOOKING = gql`
mutation ($bookingGroupId: Int!) {
    removeTemporaryBookingGroup (id: $bookingGroupId)
}`

export const CONFIRM_BOOKING_GROUP = gql`
mutation (
  $bookingGroupId: Int!
  $requestSameRoom: Boolean!
  $requestMailCertificate: Boolean!
  $feePaymentType: FeePaymentType!
  $bookings: [ConfirmBookingGroupBookingInput!]!
) {
  confirmBookingGroup(
    id: $bookingGroupId
    bookings: $bookings
    requestSameRoom: $requestSameRoom
    requestMailCertificate: $requestMailCertificate
    feePaymentType: $feePaymentType
  )
}`

export const RENTAL_ITEM_LIST = gql`
query (
  $facilityId: Int!
  $checkInDate: DateString!
  $checkOutDate: DateString!
){
  clientRentalItemList(
    facilityId: $facilityId
    checkInDate: $checkInDate
    checkOutDate: $checkOutDate
  ) {
    id
    quantity
    availabilities {
      stayDate
      quantity
    }
    rentalItemDef {
      name
      price
      rentalPeriod
    }
  }
}`

export const PARKING_LIST = gql`
query (
  $facilityId: Int!
  $checkInDate: DateString!
  $checkOutDate: DateString!
){
  clientFacilityParkingList(
    facilityId: $facilityId
    checkInDate: $checkInDate
    checkOutDate: $checkOutDate
  ) {
    id
    name
    quantity
    maxHeight

    availabilities {
      stayDate
      quantity
    }
  }
}`

export const GET_CANCEL_POLICY = gql`
query (
  $contractId: Int!
  $checkInDate: DateString!
  $bookingPlanId: Int
) {
  myCancelPolicy(
    contractId: $contractId
    checkInDate: $checkInDate
    bookingPlanId: $bookingPlanId
  ) {
     noShowPenalty
     day0Penalty
     thresholds {
       day
       penalty
     }
     appliedToday
  }
}
`

export const GET_BOOKING_CANCEL_POLICY = gql`
query (
  $bookingId: Int!
  $code: String!
) {
  bookingCancelPolicy(
    bookingId: $bookingId
    code: $code
  ) {
     noShowPenalty
     day0Penalty
     thresholds {
       day
       penalty
     }
     appliedToday
  }
}
`

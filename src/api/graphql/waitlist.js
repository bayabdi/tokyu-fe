import gql from 'graphql-tag'

export const CREATE_CANCEL_WAITLIST = gql`
mutation (
  $roomTypeId: Int!
  $checkInDate: DateString!
  $checkOutDate: DateString!
  $type: CancelWaitListType!
){
  createMyCancelWaitList(
    roomTypeId: $roomTypeId
    checkInDate: $checkInDate
    checkOutDate : $checkOutDate
    type: $type
  ) {
    id
  }
}
`
export const CANCEL_FACILITY_PARKING = gql`
  mutation(
    $id: Int! # get this id from the list api
  ) {
    cancelFacilityParkingCancelWaitList(facilityParkingWaitlistId: $id){
      __typename
    }
  }
`
export const DELETE_MY_CANCEL_WAIT_LIST = gql`
   mutation(
    $id: Int! # get this id from the list api
  ) {
    deleteMyCancelWaitList(id: $id) {
      __typename
    }
}
`
export const WAIT_LISTS = gql`
query{
  myCancelWaitList (
    inEffect: true # Valid only 有効なもののみ
  ) {
    items {
      checkInDate # Preferred check-in date 希望チェックイン日
      checkOutDate # Preferred check-out date 希望チェックアウト日
      id
      roomType {
        name # Room type name 部屋タイプ名
        facility {
          name # Facility Name 施設名
        }
      }
    }
  }

  myFacilityParkingCancelWaitlistList(
    filter: { inEffect: true } # Valid only 有効なもののみ
  ) {
    items {
      id
      fromDate #DateString! date range from
      toDate #DateString! date range to
      facilityParking {
        name #String! parking name (in the mockup is displayed)
        maxHeight #Int if not null show
        id
        facility {
          name #String! name of the facility. (where 東急バケーションズ軽井沢 is displayed in the mockup)
        }
      }
    }
  }
}
`

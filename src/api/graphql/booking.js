import gql from 'graphql-tag'

export const MY_BOOKING_LIST = gql`
    query(
        $fromDate: DateString! # set today for this page
        $toDate: DateString # set 1 month from today for this page, but Make it modifiable with env var
    ) {
        myBookingList(
            filter: { checkInDateFrom: $fromDate, checkInDateTo: $toDate }
            orderBy: { fieldName: "booking.checkInDate", direction: "ASC" }
        ) {
            items {
                id #Booking ID 予約ID
                checkInDate
                bookingTypeId
                checkOutDate
                room {
                    roomType {
                        name # Room type name 部屋タイプ名
                        facility {
                            name: nameOnClientWeb #Facility Name 施設名
                        }
                    }
                }
                stayConfirmedAt #The reserved dates. If this is Null, display "Enter the information".予約の利用確認日。これがNullの場合は「情報を入力する」を表示する
                needsStayConfirmation # if true show button linked to https://overflow.io/s/5R4JG9AB?node=c7b550ba
                cancelledAt
            }
        }
    }
`

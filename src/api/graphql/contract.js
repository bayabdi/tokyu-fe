import gql from 'graphql-tag'

export const GET_MY_AVAILABLE_POINTS = gql`
query {
  myAvailablePoints {
    contractPoints {
      contractId
      contract {
        productTypeId
        productType {
          name
        }
      }
      pointRemains
    }
    tvpPoint
  }
}
`
export const MY_CONTRACT_LIST = gql`
query ($today: DateString)  {
  myContractList(pagination: {take: 500, skip: 0}){
    items {
      id # contractId
      productType{
        id #Product ID 商品ID
        name # Product name 商品名（ex.マイウィーク）
      }
      startYear #Year of MW/PW start use MW/PWの開始利用年
      mwPwRoomType {
        name # Name of MW/PW room type MW/PWの部屋タイプ名
        facility {
          name: nameOnClientWeb #Facility Name 施設名
        }
      }
      mwPwWeekNumber #MW/PW week number MW/PW の週番号
      mwExchangeFee #Exchange fee (excluding tax) 交換手数料（税抜き）

      startDate # Start date of contract 契約の開始日
      vmRoomType {
        name # Name of VM room type VMの部屋タイプ名
        facility {
          name:nameOnClientWeb #Facility Name 施設名
        }
      }
      vmStayRightDate {
        startDate
        endDate
      }
      pointSummary {
        validFrom
        validTo
        pointRemains
      }
      mwUsageRights (fromDate: $today) {# array
        year
        status
        currentRights { # array, if there are 2 show 2 lines of facility.name and bookWeekNo
          bookRoomType {
            facility {
              name
            }
          }
          bookWeekNo
        }
      }

    }
  }
}
`
export const MY_PW_CONTRACT = gql`
query ($contractId: Int!) {
  myContract(id: $contractId) {
    productType{name} # String! 契約
    contractNumber # String 契約番号
    years #Int! 契約年数
    endDate
    additionalPointPrice
  }
  # notice that the response shape is the same as for PW!!!
  myPwContractUsage(contractId: $contractId) {
    rights {
      year # year
          bookingGroup {
          bookings {
            id # Int!  予約ID
            checkInDate # DateString! チェックイン日
            checkOutDate # DateString! 最終日
            cancelledAt
            room {
              roomType {
                facility {
                  name # String! 施設
                }
              }
            }
          }
      }
    }
  }
}
`
export const LOAD_CURRENT_CONTRACTS = gql`
query {
  myContractList(pagination: {take: 100, skip: 0}){
    items {
      id
      canCheckInUntil
      canCheckOutUntil
      productTypeId
      productType{
        id
        name
      }
      startYear
      mwPwRoomType {
        name
        facility {
          name
        }
      }
      mwPwWeekNumber
      mwExchangeFee

      startDate
      endDate
      vmRoomType {
        name
        facility {
          name
        }
      }
    }
  }
}
`
export const MY_SP_CONTRACT = gql`
query ($contractId: Int!) {
  myContract(id: $contractId) {
    productType{id, name} # String! 契約
    contractNumber # String 契約番号
    years #Int! 契約年数
    endDate
    additionalPointPrice # Int! the price of the additional point (use this value to determine the price for purchaseMyPoints

    pointSummary {
      year
      validFrom # DateString! 期限開始
      validTo # DateString! 期限終了
      pointRemains # Int! 残ポイント
    }

    pointMovementList {
      changedAt # DateTime! 日時
      validFrom # DateString! 期限開始
      validThru #DateString! 期限終了
      pointChange # Int! ポイント名
    }
}
}`
export const GET_CONTRACT_POINTS_SUMMARY = gql`
query ($contractId: Int!) {
  myContractPointSummary(contractId: $contractId) {
    year
    validFrom
    validTo
    pointRemains
}
}
`
export const GET_CONTRACT_PRODUCT_TYPE = gql`
query ($contractId: Int!) {
  myContract(id: $contractId) {
    productType{
      id,
      name
    } # String! 契約
  }
}
`
export const MY_VM_CONTRACT = gql`
query ($contractId: Int!) {
  myContract(id: $contractId) {
    productType{name} # String! 契約
    contractNumber # String 契約番号
    years #Int! 契約年数
    endDate
    additionalPointPrice
  }
  # notice that the response shape is the same as for PW!!!
  myVmContractUsage(contractId: $contractId) {
    rights {
      year # year
          bookingGroup {
          bookings {
            id # Int!  予約ID
            checkInDate # DateString! チェックイン日
            checkOutDate # DateString! 最終日
            cancelledAt
            room {
              roomType {
                facility {
                  name # String! 施設
                }
              }
            }
          }
      }
    }
  }
}
`
export const MY_MW_CONTRACT = gql`
query ($contractId: Int!) {
  myMwContractUsage(contractId: $contractId) {
    productType{name} # String! 契約
    contractNumber # String 契約番号
    years #Int! 契約年数
    mwPwRoomType {
      facility {
        name # String! 権利施設
      }
    }
    mwPwWeekNumber # Int 権利週
    endDate #DateString 満了日
    rights {
      year
      currentRights {
        newBookingGroup {
          bookings {
            id # Int!予約ID
            room {
              roomType {
                facility{
                  name #String! 施設
                }
              }
            }
            checkInDate #DateString! チェックイン日
            checkOutDate #DateString! 最終日
          }
        }
      }
    }
  }
}

`

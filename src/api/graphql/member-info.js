import gql from 'graphql-tag'

export const MY_CLIENT_INFO = gql`
   query {
    myClientInfo {
      memberId # memberId 会員番号
      name # name
      id
      email
      mainContact {
        tel
        mobile
        email
        postalCode
        prefecture
        locality
        address1
        address2
      }
    }
  }
`
export const MAIN_CONTACT = gql`
   query {
    myClientInfo {
      mainContact {
        tel
        mobile
        email
        postalCode
        prefecture
        locality
        address1
        address2
      }
    }
  }
`
export const MY_CLIENT_CHARGE_LIST = gql`
   query (
    $skip: Int!
    $take: Int!
  ) {
    myClientChargeList (pagination: {skip: $skip, take: $take}) {
      items {
        chargeDate
        price
        clientChargeType {name} # Title
        receipt {
          pdfFileUrl # URL of the file ファイルのURL
        }
      }
      hasMore
    }
  }
`
export const MY_SUB_MEMBER_LIST = gql`
   query {
    mySubMemberList {
      id
      name
      subMemberTypeId # int 1:sub-member 副会員 、２：family member ファミリー会員
      memberUser {
        email # login mail adress ログインメールアドレス
      }
    }
  }
`

export const MY_SUB_MEMBER = gql`
query ($id: Int!) {
  mySubMember(id: $id) {
    subMemberTypeId
    name
    nameKana
    birthday
    relationshipId
    sex
    postalCode
    prefecture
    locality
    address1
    address2
    tel
    email

    memberUser {
      id
      email
    }
  }
}
`

export const UPDATE_SUB_MEMBER = gql`
mutation (
  $id: Int!
  $subMemberTypeId: Int!
  $memberUser: MemberUserMyCreateInput
  $baseInfo: BaseInfoMySubMemberCreateInput
) {
  updateMySubMemberAccount(
    id: $id
    subMemberTypeId: $subMemberTypeId,
    memberUser: $memberUser
    basicInfo: $baseInfo
  ) {
    id
  }
}
`

export const CREATE_SUB_MEMBER = gql`
mutation (
  $subMemberTypeId: Int! # 1: Sub Member 1: 副会員、2: Family Member 2: ファミリー会員
  $memberUser: MemberUserMyCreateInput # { email: String! password: String!}
  $baseInfo: BaseInfoMySubMemberCreateInput # following type
) {
  createMySubMemberAccount(
    subMemberTypeId: $subMemberTypeId
    memberUser: $memberUser
    basicInfo: $baseInfo
  ) {
    id
  }
}
`

export const DELETE_SUB_MEMBER = gql`
mutation (
  $id: Int!
) {
  deleteMySubMember(id: $id)
}
`

export const UPDATE_MY_MAIN_CONTACT = gql`
 mutation (
   $mobile: String!
   $email: String!
   $postalCode: String!
   $prefecture: String!
   $locality: String!
   $address1: String!
   $address2: String!
 ) {
  updateMyMainContact(
      mobile: $mobile
      email: $email
      postalCode: $postalCode
      prefecture: $prefecture
      locality: $locality
      address1: $address1
      address2: $address2
  ){
    id
  }
}
`
export const REFER_FUTURE_CLIENT = gql`
 mutation (
$name: String! # 名前
$kana: String! #読みがな
$tel: String! # 電話
) {
  referFutureClient(
    name: $name
  kana: $kana
  tel: $tel
) #returns boolean
}
`

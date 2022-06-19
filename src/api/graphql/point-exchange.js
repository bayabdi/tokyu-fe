import gql from 'graphql-tag'

export const GET_POINT_EXCHANGE_PRODUCTS = gql`
query {
  clientPointExchangeProductList{
    id
    name
    spPoint
    fpPoint
    tvpPoint
    companyName
  }
}
`
export const ORDER_POINT_EXCHANGE_PRODUCTS = gql`
mutation (
  $address: CreatePointExchangeAddressInput
  $orders: [CreatePointExchangeOrderInput!]!
  $contractId: Int
) {
  createMyPointExchange(
    address: $address
    orders: $orders
    contractId: $contractId
  )
}
`

export const PURCHASE_MY_POINTS = gql`
mutation (
  $contractId: Int!
  $year: Int!
  $points: Int!
  $password: String!
){
  purchaseMyPoints(
    contractId: $contractId,
    year: $year #  Obtained from API in contract details  契約詳細のAPIから取得
    points: $points # Number of points added 追加ポイント数
    password: $password
  ) {
    receipt{
      pdfFileUrl # this is the receipt PDF URL! just open it in a new tab if button is clicked
    }
  }
}`

export const DEFAULT_ROLLOVER_FEE = gql`
query {
  defaultRolloverFee {
    totalPrice # Int! this is the fee with tax
  }
}`

export const ROLLOVER_MY_POINTS = gql`
mutation(
  $contractId: Int!
  $year: Int!
  $points: Int!
  $password: String!
){
  rolloverMyPoints(
    contractId: $contractId
    year: $year # Obtained from API in contract details 契約詳細のAPIから取得
    points: $points # Rollover Points 繰越のポイント
    password: $password
  )
  {
    receipt{
      pdfFileUrl # this is the receipt PDF URL! just open it in a new tab if button is clicked
    }
  }
}`

export const ADVANCE_MY_POINTS = gql`
mutation(
  $contractId: Int!
  $year: Int!
  $points: Int!
  $password: String!
){
  advanceMyPoints(
    contractId: $contractId
    year: $year # Obtained from API in contract details 契約詳細のAPIから取得
    points: $points # Advance Points 前倒しのポイント
    password: $password
  ) {
    __typename # advance point is free, so there is no reciept. Hide the button
  }
}`

export const GET_MY_POINT_EXCHANGE_PRODUCTS = gql`
query {
  myPointExchangeList {
    items {
      confirmedAt # Confirmation Date If this is Not null, "Ticket Issuer Confirmed. 確認日時 ここがNot nullなら「チケット発行元確認済み」
      createdAt #Application Date 申込日時
      quantity #Quantity 数量
      tvpPoint # If paid by TVP, the value will be placed here. TVPで払った場合はここに値が入る
      spPoint # SP Price SP価格
      fpPoint # FP Price FP 価格
      pointExchangeProduct {
        name # Product name 商品名
      }
    }
  }
}
`

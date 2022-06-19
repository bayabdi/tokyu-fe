import gql from 'graphql-tag'

export const GET_MY_SAVED_CARD = gql`
query {
  mySavedCard {
    id
    cardNo
  }
}
`

export const SAVE_CARD = gql`
mutation ($token: String!) {
  clientSaveCard(token: $token){
    id
    cardNo
  }
}
`

export const GET_PREF_PAYMENT_METHOD = gql`
query {
  myClientInfo {
    facilityFeePayment
    setupFeePayment
    optionalCleaningPayment
    taxPayment
    otherServicePayment
  }
}`

export const UPDATE_PREF_PAYMENT_METHOD = gql`
mutation (
  $facilityFeePayment: FeePaymentType
  $setupFeePayment: FeePaymentType
  $optionalCleaningPayment: FeePaymentType
  $taxPayment: FeePaymentType
  $otherServicePayment: FeePaymentType
) {
  updateMyClientInfo (
    facilityFeePayment: $facilityFeePayment
    setupFeePayment: $setupFeePayment
    optionalCleaningPayment : $optionalCleaningPayment
    taxPayment :$taxPayment
    otherServicePayment: $otherServicePayment
  ) {
    id
  }
}
`

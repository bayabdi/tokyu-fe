import gql from 'graphql-tag'

export const REGISTER_EMAIL_TICKET = gql`
mutation (
  $ticketNo: String! # include the hyphens
  $secret: String! # include the hyphens
  $email: String!
) {
  registerEmailToBookingTicket(data: {
    ticketNo: $ticketNo
    secret: $secret
    email: $email
  })
}
`

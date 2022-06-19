import gql from 'graphql-tag'

export const GENERATE_UPLOAD_URL = gql`
mutation (
  $contentType: String!
  $contentLength: Int!
  $type: ClientAllowedUploadType!
) {
  generateMyUploadUrl(
    contentType: $contentType
    contentLength: $contentLength
    type: $type
  ) {
    uploadUrl
    fileUrl
    key
  }
}`

export const GENERATE_PASSPORT_UPLOAD_URL = gql`
mutation (
  $contentType: String!
  $contentLength: Int!
  $bookingId: Int!
  $code: String!
) {
  generateMyUploadUrl: generatePassportUploadUrl(
    contentType: $contentType
    contentLength: $contentLength
    bookingId: $bookingId
    code: $code
  ) {
    uploadUrl
    fileUrl
    key
  }
}`

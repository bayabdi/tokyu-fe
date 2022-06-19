import gql from "graphql-tag"

export const REQUEST_MFA_CLIENT = gql`
    mutation ($email: String!, $password: String!, $vsIntent: Boolean!) {
        requestMFAClient(email: $email, password: $password, vsIntent: $vsIntent) {
            token
            validUntil,
        }
    }
`
export const CONFIRM_MFA_CLIENT = gql`
    mutation ($token: String!, $code: String!) {
        confirmMFAClient(code: $code, token: $token) {
            accessToken,
            refreshToken,
            memberUserId,
            forcePasswordChangeRequired
        }
    }
`

export const START_PASSWORD_RESET = gql`
    mutation initiateReset($email: String!){
        requestResetPasswordClient(email: $email) {
            token
        }
    }
`

export const CONFIRM_PASSWORD_RESET = gql`
    mutation confirmReset($code: String!, $password: String!, $token: String!){
        confirmResetPasswordClient(
            code: $code, password: $password, token: $token) {
            accessToken
            refreshToken
        }
    }
`

export const REFRESH_TOKEN = gql`
    mutation refreshAccessToken ($refreshToken: String!) {
        refreshClientToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
        }
    }
`

export const REGISTER_EMAIL_START = gql`
mutation($email: String!) {
    submitEmailClientVerification(
        email: $email
    )
}
`

export const REGISTER_FIRST_USER = gql`
mutation (
    $token: String!
    $memberId: String!
    $birthday: DateString!
    $tel: String!
    $password: String!
) {
    submitTokenInfoClient(
        token: $token 
        password: $password 
        memberId: $memberId 
        birthday: $birthday
        tel: $tel
    )
}
`;

export const GET_USER_INFO = gql`
query {
    myUserInfo {
        name
        prefecture
        locality
        address1
        address2
        tel
        mobile
        email
    }
}
`
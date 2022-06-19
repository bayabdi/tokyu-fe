import { apolloClient } from '@/plugins/apollo'
import { REFRESH_TOKEN } from './graphql/user'

const deadlineMinutes = 5 // if less 5 minutes left refresh the token

export function getPayloadFromJWT (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

export function needsTokenRefresh (token) {
  if (!token) return false
  const payload = getPayloadFromJWT(token)
  const expiresAt = payload.exp * 1000
  return expiresAt - Date.now() < deadlineMinutes * 60 * 1000
}

export async function refreshAccessToken (refreshToken) {
  const res = await apolloClient.mutate({
    mutation: REFRESH_TOKEN,
    variables: {
      refreshToken
    }
  })

  return res.data.refreshClientToken
}

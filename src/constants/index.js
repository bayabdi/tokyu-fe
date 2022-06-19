const config = {
  apiUrl: process.env.VUE_APP_GRAPHQL_HTTP || 'https://api.tvos2022dev.com/graphql',
  authToken: 'token',
  shortToken: 'shortToken',
  user: 'currentUser',
  refreshToken: 'refreshToken',
  resetToken: 'resetToken',
  rememberLoginEmail: 'rememberLoginEmail',
  savedLoginEmail: 'savedLoginEmail'
}
export default config

export const BookCalendarFewFrom =
  parseInt(process.env.VUE_APP_BOOK_CALENDAR_FEW_FROM || '3', 0)

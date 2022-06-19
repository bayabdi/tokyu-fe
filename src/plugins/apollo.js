import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import { setContext } from 'apollo-link-context'
import config from '../constants'
import router from '../router'
import store from '../store'
import { serverErrors } from '@/constants/errors'
import { currentLanguage } from './i18n'
import { needsTokenRefresh, refreshAccessToken } from '@/api/users'

// Install the vue plugin
Vue.use(VueApollo)

// Http endpoint
const httpEndpoint = config.apiUrl || 'http://localhost:3000/graphql'

const httpLink = {
  uri: httpEndpoint,
  headers: {
    'Content-Language': currentLanguage()
  }
}

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  wsEndpoint: null,
  // LocalStorage token
  // tokenName: config.authToken,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: httpLink

  httpLinkOptions: httpLink

  // Override default cache
  // cache: new InMemoryCache()

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}

const authLink = setContext(async ({ operationName }, { headers, ...rest }) => {
  let token = localStorage[config.authToken]
  if (needsTokenRefresh(token) && operationName !== 'refreshAccessToken') {
    const refreshToken = localStorage[config.refreshToken]
    if (refreshToken) {
      try {
        const newTokens = await refreshAccessToken(refreshToken)
        localStorage[config.authToken] = newTokens.accessToken
        localStorage[config.refreshToken] = newTokens.refreshToken
        token = newTokens.accessToken
      } catch (e) {
        token = null
      }
    }
  }

  // return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
    link: authLink
    // async getAuth(tokenName) {
    //   let token = localStorage[tokenName];
    //   if (needsTokenRefresh(token)) {
    //     const refreshToken = localStorage[config.refreshToken];
    //     if (refreshToken) {
    //       const newTokens = await refreshAccessToken(refreshToken);
    //       localStorage[tokenName] = newTokens.accessToken;
    //       localStorage[config.refreshToken] = new newTokens.refreshToken;
    //       token = newTokens.accessToken;
    //     }
    //   }
    //   return `Bearer ${token}`;
    // }
  })
  apolloClient.wsClient = wsClient

  // Create vue apollo provider
  return new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    },
    async errorHandler (error) {
      if (error.graphQLErrors.some(err => err.code === serverErrors.unauthorizedError)) {
        await store.dispatch('logOut')
        await router.push({ path: '/logout' })
      }
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    }
  })
}

export const defaultApolloProvider = createProvider()
export const apolloClient = defaultApolloProvider.defaultClient

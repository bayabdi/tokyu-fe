import { gqlErrorToast } from '@/utils/graphql-errors'

export default {
  install (Vue, { toast }) {
    /**
     *
     * @param {function(): Promise<void>} promise
     * @param {{[errorCode: string]: (error: any) => any }} except
     */
    Vue.prototype.$showGqlError = async function (promise, except = {}) {
      try {
        return await (typeof promise === 'function' ? promise() : promise)
      } catch (e) {
        const exceptMessages = Object.keys(except)
        const { excluded } = gqlErrorToast(toast, e, exceptMessages)
        for (const key of Object.keys(excluded)) {
          except[key]?.(excluded[key])
        }
        throw e
      }
    }
  }
}

export const urlMixin = {
  methods: {
    getQueryParameter (name) {
      const parameterValue = this.$route.query[name]
      if (Array.isArray(parameterValue)) return parameterValue[0]
      else if (parameterValue) return parameterValue
      return null
    }
  }
}

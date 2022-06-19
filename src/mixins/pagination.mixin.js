export const paginationMixin = {
  methods: {
    async getPaginatedList (getList = async (apollo, skip, take) => {}) {
      await this.$doLoading(async () => {
        await this.$showGqlError(async () => {
          const result = await getList(this.$apollo, this.items.length, this.take)
          this.items.push(...result.items)
          this.hasMore = result.hasMore
        })
      })
    }
  },
  data () {
    return {
      items: [],
      hasMore: true,
      take: 10
    }
  }
}

<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-13 pt-9">
      <section>
        <div
          v-for="(urgentInformationItem, i) in urgentInformation"
          :key="i"
          class="urgent-info__item py-2 px-3 mt-1 rounded text-left d-flex --c-white"
        >
          <h4 class="font-weight-medium">
            {{ $t("homePage.urgentInformation") }}
          </h4>
          <v-divider vertical class="mx-3 bg-white">|</v-divider>
          <div class="font-weight-light">
            {{ urgentInformationItem.title }} - {{ urgentInformationItem.body }}
          </div>
        </div>
      </section>
      <section>
        <h1 class="text-heading--c-prm text-center pt-6 pb-3">
          {{ $t('common.contactingCustomers') }}
        </h1>

        <NewsItem
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :urlImg="item.imageUrl"
          :description="item.body"
          :link="'/home/news/' + item.id"
          class="mb-3"
        ></NewsItem>

        <!-- ----------- -->
        <div class="text-center pt-3 pb-6">
          <v-btn
            rounded
            class="hover-secondary bg-white text-medium font-weight-bold px-10"
            @click="loadList()"
            :disabled="!hasMore"
          >
            {{ $t('buttons.viewMore') }}
          </v-btn>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import NewsItem from '@/components/NewsItem'
import { paginationMixin } from '@/mixins/pagination.mixin'

export default {
  name: 'Notification',
  components: {
    NewsItem,
    Breadcrumbs
  },
  mixins: [paginationMixin],
  data () {
    return {
      urgentInformation: []
    }
  },
  methods: {
    async loadList () {
      await this.getPaginatedList(async (apollo, skip, take) => (await this.$store.dispatch('myWebNotificationList', {
        apollo,
        skip,
        take
      })).data.myWebNotificationList)
    }
  },
  async mounted () {
    await this.loadList()
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        const myWebNotificationListResult = await this.$store.dispatch('myWebNotificationListUrgent', {
          apollo: this.$apollo,
          take: 3,
          skip: 0
        })
        this.urgentInformation = myWebNotificationListResult.data.myWebNotificationList.items
      })
    })
  }
}
</script>

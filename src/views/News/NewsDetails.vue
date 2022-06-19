<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/news">
        {{ $t('news.notification') }}>
      </router-link>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-13 pt-9">
      <div class="bg-white rounded-10 px-5">
        <div class="text-title font-weight-bold --c-prm pt-3 pb-4">
          {{ news.title !== null ? news.title : '' }}
        </div>
        <div class="border-top-main --border-smoke pb-9"></div>
        <v-img
          height="200"
          width="206"
          :src="news!==null? news.imageUrl: ''"
          lazy-src="@/assets/images/lazy-img.png"
          class="mx-auto"
          alt="tokyu_vacations_news"
        />
        <div class="text-medium --c-medium-gray mt-9 pb-9 ">
          {{ news !== null ? news.body : '' }}
        </div>
      </div>
      <v-container>
        <v-row>
          <v-col @click="prev(id > 1 ? id - 1 : 1)" class="col-3">
            <v-btn class="bg-white --c-prm font-weight-bold" height="57" rounded> <</v-btn>
            <div class="text-small --c-prm text-center mt-1">前の記事</div>
          </v-col>
          <v-col class="col-6 text-center">
            <v-btn class="bg-white px-15 --c-prm font-weight-bold" height="57" rounded> 戻る</v-btn>
          </v-col>
          <v-col @click="next(id + 1)" class="col-3">
            <v-btn class="bg-white px-0 --c-prm font-weight-bold" height="57" rounded> ></v-btn>
            <div class="text-small --c-prm text-center mt-1">次の記事</div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  name: 'NewsDetails',
  components: {
    Breadcrumbs
  },
  data () {
    return {
      id: parseInt(window.location.pathname.slice(11))
    }
  },
  computed: {
    news () {
      return this.$store.state.notifications.new
    }
  },
  methods: {
    next (id) {
      if (window.location.pathname !== `/home/news/${id}`) {
        this.$router.push(`/home/news/${id}`)
      }
    },
    prev (id) {
      if (window.location.pathname !== `/home/news/${id}`) {
        this.$router.push(`/home/news/${id}`)
      }
    }
  },
  async mounted () {
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        await this.$store.dispatch('myWebNotificationList', {
          apollo: this.$apollo,
          take: 10,
          skip: 0
        })

        this.$store.commit('setNew', {
          state: this.$store.state,
          id: parseInt(window.location.pathname.slice(11))
        })
      })
    })
  }
}
</script>

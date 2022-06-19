<template>
  <div>
    <Breadcrumbs>
      <router-link to="/home/member-info">
        {{ $t("menu.main.membershipInformation") }}
      </router-link>
      >
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container px-5 pb-15">
      <h1 class="text-heading--c-prm text-center py-6">
        {{ $t("common.receipt") }}
      </h1>

      <!-- Receipt item -->
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white pa-4 mb-3 d-flex align-center justify-space-between"
      >
        <div>
          <span class="text-title--c-prm font-weight-bold">
            {{ item.chargeDate }}
          </span>
          <p class="mr-3 text-medium">{{ item.clientChargeType.name }}</p>
        </div>

        <v-btn
          @click="showPdf(item)"
          :disabled="!hasPdf(item)"
          large
          width="117"
          rounded
          class="bg-primary text-medium--c-white"
        >
          {{ $t("buttons.display") }}
        </v-btn>
      </div>
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
    </div>

  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  paginationMixin
} from '@/mixins/pagination.mixin'

export default {
  components: {
    Breadcrumbs
  },
  name: 'MemberInfoReceiptList',
  mixins: [paginationMixin],
  methods: {
    getPdfUrl (row) {
      return row.receipt?.pdfFileUrl
    },
    hasPdf (row) {
      return !!this.getPdfUrl(row)
    },
    showPdf (row) {
      if (this.hasPdf(row)) {
        window.open(this.getPdfUrl(row), '_blank').focus()
      }
    },
    async loadList () {
      await this.getPaginatedList((apollo, skip, take) =>
        this.$store.dispatch('myClientChargeList', {
          apollo,
          skip,
          take
        }))
    }
  },
  async mounted () {
    await this.loadList()
  }
}
</script>

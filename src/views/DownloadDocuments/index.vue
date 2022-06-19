<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container pb-15 px-5">
      <h1 class="text-heading--c-prm text-center pt-10 pb-8">
        {{ $t("downloadDocuments.downloadDocuments") }}
      </h1>
      <v-container style="cursor: pointer">
        <v-row
          v-for="item in items"
          :key="item.id"
          @click="routerLink(item.link, 0)"
          class="bg-white mb-3 rounded-10 --border-light-gray border-medium"
        >
          <v-col class="col-3 text-center">
            <IconBooks width="46" height="44" class="mt-1" v-if="item.id === 1" />
            <IconOpenBook width="43" height="40" class="mt-1" v-if="item.id === 2" />
          </v-col>
          <v-col
            v-html="item.text"
            class="text-title --c-medium-gray font-weight-medium pl-0 d-flex flex-column justify-center"
          >
          </v-col>
        </v-row>
      </v-container>

      <div
        style="display: block"
        @click="routerLink(null, 1)"
        class="text-title text-center pb-8 --c-prm font-weight-medium text-decoration-underline"
      >
        {{ $t("downloadDocuments.clickHereForLastYear") }}
      </div>
      <div v-for="doc in docs" :key="doc.id">
        <h1
          v-if="categoryTitle(doc.docType.name)"
          class="text-heading--c-prm text-center pt-4 pb-2"
        >
          {{ doc.docType.name }}
        </h1>
        <DocumentBlock :url="doc.url">
          {{ doc.fileName }}
        </DocumentBlock>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import DocumentBlock from './components/DocumentBlock'
import IconBooks from '@/components/icons/IconBooks'
import IconOpenBook from '../../components/icons/IconOpenBook'

export default {
  name: 'DownloadDocuments',
  components: {
    IconOpenBook,
    Breadcrumbs,
    IconBooks,
    DocumentBlock
  },
  computed: {
    docs () {
      return this.$store.state.documents.otherPublicDocList
    },
    userDocs () {
      return this.$store.state.documents.userGuideList
    }
  },
  created () {
    this.$store.dispatch('getDocuments', {
      apollo: this.$apollo
    })
  },
  mounted () {
    if (this.$route.hash === '#userguide') {
      if (!(this.userDocs.length > 0)) {
        window.location.href = this.userDocs[0].url
      }
    }
  },
  data () {
    return {
      items: [
        {
          id: 1,
          text: this.$t('common.vacationLifeBackIssues'),
          link: '/home/download-documents/vacation-life-back-number'
        },
        {
          id: 2,
          text: this.$t('common.usersGuide'),
          link: null
        }
      ]
    }
  },
  methods: {
    categoryTitle (title) {
      if (this.title === title) {
        return false
      } else {
        this.title = title
        return true
      }
    },
    routerLink (link, index) {
      if (link === null) {
        this.userGuideList(index)
      } else {
        this.$router.push(link)
      }
    },
    userGuideList (index) {
      this.$store.dispatch('getUserGuideList', {
        apollo: this.$apollo
      }).then(res => {
        window.open(res[index].url, '_blank')
      })
    }
  }
}
</script>

<template>
  <div>
    <Breadcrumbs>
      {{ $route.meta.title }}
    </Breadcrumbs>
    <div class="form-container pb-15 px-5">
      <h1 class="text-heading--c-prm text-center pt-10 pb-16">
        {{ $t('downloadDocuments.vacationLifeBackNumber') }}
        <!--{{ $t('downloadDocuments.downloadDocuments') }}-->
      </h1>
      <DocumentBlock
        v-for="(doc, i) in docs"
        :key="i"
        :url="doc.url"
      >
        {{ doc.year }}{{ $t("common.fisYear") }}{{ doc.month }}
      </DocumentBlock>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import DocumentBlock from './components/DocumentBlock'

export default {
  name: 'VacationLifeBackNumber',
  components: {
    Breadcrumbs,
    DocumentBlock
  },
  computed: {
    docs () {
      return this.$store.state.documents.vacationLifeList
    }
  },
  created () {
    this.$store.dispatch('getDocuments', {
      apollo: this.$apollo
    })
  },
  data () {
    return {
      pointSelected: 'sharing-point',
      remainingSharingPoints: 32000,
      remainingFlexPoints: 35000
    }
  }
}
</script>

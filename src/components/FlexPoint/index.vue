<template>
  <div class="bg-white mt-7 pt-4 pb-4 px-4" v-show="contracts.length > 0">
    <div class="text-subtitle--c-prm--w-bold text-center mb-4">
      {{ $t("common.flexPoint") }}
    </div>
    <div class="pb-7" v-for="(contract, i) in contracts" :key="contract.id">
      <v-divider></v-divider>
      <div class="d-flex justify-space-between">
        <div class="text-medium--c-medium-gray mt-9">
          {{ $t("common.numberOfPointsBeforeExpiration") }}
        </div>
        <div class="text-right text-m-max--c-prm--w-bold mt-4">
          <span v-if="validPoints[i].length > 0">{{
              validPoints[i][0].pointRemains
            }}</span>
          <span v-else>0</span>
          <span class="text-medium">{{ $t("unit.point") }}</span>
        </div>
      </div>
      <div
        class="text-medium--c-medium-gray text-right"
        v-if="validPoints[i].length > 0"
      >
        {{ $t("common.endDate") }}
        <span class="--w-bold"> {{
            validPoints[i][0].validTo.replaceAll("-", "/")
          }} </span>
        {{$t('common.upto')}}
      </div>
      <v-divider class="my-6"></v-divider>
      <div v-if="validPoints[i].length > 1">
        <div class="point-info-row">
          <div class="text-medium--c-medium-gray">
            {{ $t("common.nextDeadLine") }}
          </div>
          <div class="text-heading--c-medium-gray--w-bold">
            {{ validPoints[i][1].pointRemains }}
            <span class="text-medium--w-medium">{{ $t('unit.point') }}</span>
          </div>
        </div>
        <div class="point-info-row">
          <div class="text-medium--c-medium-gray">
            {{ $t("common.startDeadLine") }}
          </div>
          <div class="text-medium--c-medium-gray--w-bold">
            {{ validPoints[i][1].validTo.replaceAll("-", "/") }}
          </div>
        </div>
      </div>
      <div v-if="canSeeDetail" class="text-center mt-10">
        <router-link
          :to="'/home/contract-information/Details/' + contract.id"
        >
          <v-btn color="primary" elevation="2" large rounded>{{
              $t("common.viewDetails")
            }}</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FLexPoint',
  props: ['contracts', 'canSeeDetail'],
  data () {
    return {
      validPoints: []
    }
  },
  methods: {
    getValidPoints (points) {
      const sortedPoints = points.slice().sort((a, b) => { return a.validFrom < b.validTo })

      const validIndex = sortedPoints.findIndex(point => this.isValidPoint(point))

      const validPoints = []

      if (validIndex > -1) { validPoints.push(sortedPoints[validIndex]) }
      if (validIndex + 1 < sortedPoints.length) { validPoints.push(sortedPoints[validIndex + 1]) }

      // console.log("validPoints: ", validPoints)

      return validPoints
    },
    isValidPoint (point) {
      const from = new Date(point.validFrom)
      const today = new Date()
      const to = new Date(point.validTo)

      return (from <= today && today <= to)
    }
  },
  watch: {
    contracts (newContracts) {
      this.validPoints = []
      newContracts.forEach(element => {
        this.validPoints.push(this.getValidPoints(element.pointSummary))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.point-info-row {
  display: flex;
  &> div {
    margin-right: 2em;
  }
}
</style>

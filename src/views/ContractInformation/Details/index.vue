<template>
  <PWDetails
    v-if="isPW"
    :contractId="contractId"
    :productTypeId="productTypeId"
  />
  <MWDetails
    v-else-if="isMW"
    :contractId="contractId"
    :productTypeId="productTypeId"
  />
  <SPDetails v-else-if="isSP" :contractId="contractId" />
</template>

<script>
import {
  ProductTypeNameToId
} from '@/constants/product'
import PWDetails from '@/views/ContractInformation/PWDetails'
import MWDetails from '@/views/ContractInformation/MWDetails'
import SPDetails from '@/views/ContractInformation/SPDetails'

export default {
  components: {
    PWDetails,
    MWDetails,
    SPDetails
  },
  data () {
    return {
      isPW: false,
      isSP: false,
      isMW: false,
      productTypeId: 0
    }
  },
  computed: {
    contractId () {
      return parseInt(this.$route.params.id)
    }
  },
  async created () {
    await this.$doLoading(async () => {
      await this.$showGqlError(async () => {
        const data = await this.$store.dispatch('getContractProductType', {
          apollo: this.$apollo,
          contractId: this.contractId
        })

        this.productTypeId = data.data.myContract.productType.id

        this.isMW = this.productTypeId === ProductTypeNameToId.MW
        this.isSP = (this.productTypeId === ProductTypeNameToId.SP || this.productTypeId === ProductTypeNameToId.FP)
        this.isPW = (this.productTypeId === ProductTypeNameToId.PW || this.productTypeId === ProductTypeNameToId.VM)
      })
    })
  }
}
</script>

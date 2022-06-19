<template>
  <span>{{prefecture}}・{{locality}}</span>
</template>

<script>
import { getLocalityFromAddress, getPrefectureFromAddress } from '@/utils/string'
export default {
  props: {
    address: String
  },
  computed: {
    prefecture () {
      return getPrefectureFromAddress(this.address)
    },
    locality () {
      return getLocalityFromAddress(this.address)
    }
  }
}
</script>

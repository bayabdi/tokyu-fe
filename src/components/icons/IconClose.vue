<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="13.09" height="13.09" viewBox="0 0 13.09 13.09">
    <line id="Line_2" data-name="Line 2" x2="10.262" y2="10.262" transform="translate(1.414 1.414)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
    <line id="Line_3" data-name="Line 3" x1="10.262" y2="10.262" transform="translate(1.414 1.414)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: 'IconClose',
  props: {
    width: {
      type: Number,
      default: 13.09
    },
    height: {
      type: Number,
      default: 13.09
    },
    color: {
      type: String,
      default: '#757575'
    }
  }
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 10.237 12.708">
    <path id="Path_7715" data-name="Path 7715" d="M5.785,5.854,0,0H2.551L8.337,5.854,2.551,11.708H0Z" transform="translate(9.04 12.208) rotate(180)" :fill="color" stroke="rgba(0,0,0,0)" stroke-width="1"/>
  </svg>
</template>

<script>
export default {
  name: 'IconPrev',
  props: {
    width: {
      type: Number,
      default: 10.237
    },
    height: {
      type: Number,
      default: 12.708
    },
    color: {
      type: String,
      default: '#0079C9'
    }
  }
}
</script>

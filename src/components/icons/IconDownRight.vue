<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 20.795 22.714">
    <g id="Group_4904" data-name="Group 4904" transform="translate(-58 -2663.5)">
      <line id="Line_241" data-name="Line 241" y2="18" transform="translate(58.5 2663.5)" fill="none" stroke="#707070" stroke-width="1"/>
      <line id="Line_242" data-name="Line 242" x1="14" transform="translate(58.5 2681.5)" fill="none" stroke="#707070" stroke-width="1"/>
    </g>
    <path id="Polygon_80" data-name="Polygon 80" d="M4.5,0,9,8H0Z" transform="translate(9 15.786) rotate(-30)" :fill="color"/>
  </svg>
</template>

<script>
export default {
  name: 'IconDownRight',
  props: {
    width: {
      type: Number,
      default: 20.795
    },
    height: {
      type: Number,
      default: 22.714
    },
    color: {
      type: String,
      default: '#757575'
    }
  }
}
</script>

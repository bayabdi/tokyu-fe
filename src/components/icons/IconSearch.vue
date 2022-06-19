<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 17.414 17.414">
    <g id="Group_141" data-name="Group 141" transform="translate(-2304 -234)">
      <circle id="Ellipse_17" data-name="Ellipse 17" cx="5.795" cy="5.795" r="5.795" transform="translate(2305 235)" fill="none" :stroke="color" stroke-linecap="round" stroke-width="2"/>
      <line id="Line_5" data-name="Line 5" x2="4.773" y2="4.773" transform="translate(2315.227 245.227)" fill="none" :stroke="color" stroke-linecap="round" stroke-width="2"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconSearch',
  props: {
    width: {
      type: Number,
      default: 17.414
    },
    height: {
      type: Number,
      default: 17.414
    },
    color: {
      type: String,
      default: '#004f8b'
    }
  }
}
</script>

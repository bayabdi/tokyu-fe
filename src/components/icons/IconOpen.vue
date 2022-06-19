<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 12 12">
    <g id="Group_9095" data-name="Group 9095" transform="translate(-313 -465)">
      <g id="Rectangle_3137" data-name="Rectangle 3137" transform="translate(313 468)" fill="#fff" :stroke="color" stroke-width="1">
        <rect width="9" height="9" stroke="none"/>
        <rect x="0.5" y="0.5" width="8" height="8" fill="none"/>
      </g>
      <g id="Rectangle_3138" data-name="Rectangle 3138" transform="translate(316 465)" fill="#fff" :stroke="color" stroke-width="1">
        <rect width="9" height="9" stroke="none"/>
        <rect x="0.5" y="0.5" width="8" height="8" fill="none"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconOpen',
  props: {
    width: {
      type: Number,
      default: 12
    },
    height: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
      default: '#707070'
    }
  }
}
</script>

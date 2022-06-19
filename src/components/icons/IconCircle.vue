<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 21.258 21.258">
    <ellipse id="Ellipse_945" data-name="Ellipse 945" cx="10.629" cy="10.629" rx="10.629" ry="10.629" :fill="color"/>
  </svg>
</template>

<script>
export default {
  name: 'IconCircle',
  props: {
    width: {
      type: Number,
      default: 21.258
    },
    height: {
      type: Number,
      default: 21.258
    },
    color: {
      type: String,
      default: '#004f8b'
    }
  }
}
</script>

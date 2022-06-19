<template>
  <div>
    <h1>...</h1>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    this.$store.dispatch('logOut')
    this.$router.push('/login')
  }
}
</script>

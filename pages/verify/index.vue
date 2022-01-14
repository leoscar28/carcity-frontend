<template>
  <Verify></Verify>
</template>

<script>
export default {
  middleware: ['verify'],
  name: "index"
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>

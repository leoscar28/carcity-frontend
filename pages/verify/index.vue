<template>
  <Verify></Verify>
</template>

<script>
export default {
  head: {
    title: 'Подтверждение кода',
    meta: [
      /*{
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }*/
    ],
  },
  middleware: ['verify'],
  name: "index"
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>

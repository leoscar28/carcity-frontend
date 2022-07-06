<template>
  <VerifyRegistration></VerifyRegistration>
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
  middleware: ['registration'],
  name: "verify"
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>

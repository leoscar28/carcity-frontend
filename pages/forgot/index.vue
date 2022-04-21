<template>
  <Forgot></Forgot>
</template>

<script>
export default {
  head: {
    title: 'Восстановление пароля',
    meta: [
      /*{
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }*/
    ],
  },
  middleware: ['verified'],
  name: "index"
}
</script>

<style lang="scss">

</style>

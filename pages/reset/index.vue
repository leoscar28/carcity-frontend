<template>
  <Reset></Reset>
</template>

<script>
export default {
  head: {
    title: 'Сброс пароля',
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

<style scoped>

</style>

<template>
  <Registration/>
</template>

<script>
export default {
  head: {
    title: 'Регистрация',
    meta: [
      /*{
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }*/
    ],
  },
  name: "index",
  middleware: ['auth','verified']
}
</script>

<style >

</style>

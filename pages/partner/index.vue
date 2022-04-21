<template>
  <Login></Login>
</template>

<script>
export default {
  head: {
    title: 'Вход в систему',
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

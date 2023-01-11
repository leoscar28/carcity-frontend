<template>
  <RegistrationComplete/>
</template>

<script>
export default {
  head: {
    title: 'Регистрация завершена',
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

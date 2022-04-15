<template>
  <Login></Login>
</template>

<script>
export default {
  name: "index",
  middleware: ['auth','verified']
}
</script>

<style >

</style>

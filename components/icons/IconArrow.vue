<template>
    <span class="icon" :style="style"></span>
</template>

<script>
    export default {
        name: "IconArrow",
        props:{
          rotate:Boolean,
          float: {
            type: String,
            default: 'none',
            validator: (value) => {
              return ['none', 'left', 'right'].includes(value)
            }
          }
        },
        computed:{
          style(){
            return {
              float: this.float,
              transform: this.rotate ? 'scaleX(-1)' : 'none'
            }
          }
        }
    }
</script>

<style scoped lang="scss">
  .icon {
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url('/icon_arrow.svg') center center;
  }
</style>

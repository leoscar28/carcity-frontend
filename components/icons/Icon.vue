<template>
  <span class="icon" :style="{backgroundImage: 'url('+url+')', width:hw, height:hw}"></span>
</template>

<script>
    export default {
      name: "Icon",
      props:{
          name:{
            type: String,
            required: true,
            validator(value) {
              return [
                'arrow',
                'calendar', 'calls', 'check', 'close', 'confirm',
                'delete',
                'edit', 'expand_more',
                'image', 'info',
                'keys_blue',
                'loading_blue', 'loading_yellow',
                'publish',
                'reviews', 'rework_blue', 'rework_red',
                'shop', 'shop_blue', 'success',
                'top',
                'unpublish',
                'view', 'views'
              ].includes(value)
            }
          },
          size: {
            type: Number,
            default: 18
          }
      },
      data(){
        return { hw: this.size + 'px', url: '/icon_' + this.name + '.svg' }
      }
    }
</script>

<style scoped lang="scss">
  .icon {
    background-position: center center;
    background-size: 100%;
    background-repeat: no-repeat;
    margin-right: 4px;

    &--rotate {
      transform: rotateX(180deg)
    }
  }
</style>

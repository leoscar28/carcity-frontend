<template>
  <div class="service" data-aos="fade-up" data-aos-easing="ease-in-cubic">
    <div class="service__img-wrapper">
      <img v-if="img" class="service__img" :src="img" alt="">
    </div>
    <p class="service__title">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true
    }
  }
}
</script>

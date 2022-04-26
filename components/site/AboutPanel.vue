<template>
  <div class="panel panel--sm d-flex align-items-center" data-aos="fade-up" data-aos-easing="ease-in-cubic">
    <img v-if="icon" :src="icon" width="21" height="29" alt="">
    <p class="fs-18 fw-medium ms-3 mb-0 text-truncate">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

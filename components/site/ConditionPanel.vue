<template>
  <div class="panel condition" data-aos-easing="ease-in-cubic">
    <div class="mb-3">
      <img :src="icon" width="32" height="24" alt="">
    </div>
    <div>
      <p class="mb-0">
        <slot />
      </p>
    </div>
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

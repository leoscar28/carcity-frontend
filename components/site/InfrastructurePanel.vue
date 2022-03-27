<template>
  <div class="panel">
    <div v-if="icon" class="mb-3">
      <img :src="icon" width="32" height="24" alt="">
    </div>
    <div>
      <p class="mb-0 fs-18 fw-medium">
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

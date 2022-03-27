<template>
  <a :href="href" @click="scrollTo">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    targetId: {
      type: String,
      required: true
    }
  },
  computed: {
    href () {
      return '#' + this.targetId
    }
  },
  methods: {
    scrollTo (ev) {
      const anchorElem = document.getElementById(this.targetId)
      const headerElem = document.getElementById('header')

      if (!anchorElem) { return }

      ev.preventDefault()
      const offsetTop = anchorElem.offsetTop - headerElem.offsetHeight

      scroll({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<template>
  <div class="dropdown">
    <button
      ref="menu"
      class="btn btn-secondary dropdown-toggle"
      :class="{ 'show': isOpen }"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      RU
    </button>
    <div class="dropdown-menu" style="min-width: 4rem;" :class="{'show': isOpen}">
      <li><a class="dropdown-item" href="#">KZ</a></li>
      <li><a class="dropdown-item" href="#">EN</a></li>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle () {
      const _this = this
      const closeListener = (e) => {
        // Check if user clicks outside of the menu
        // true — close the menu and remove EventListener
        if (_this.catchOutsideClick(e, _this.$refs.menu)) {
          window.removeEventListener('click', closeListener)
          _this.isOpen = false
        }
      }
      // Add event listener to watch clicks outside the menu
      window.addEventListener('click', closeListener)
      // Close if open and vice versa
      this.isOpen = !this.isOpen
    },
    catchOutsideClick (event, dropdown) {
      // When user clicks menu — do nothing
      if (dropdown === event.target) { return false }
      // When user clicks outside of the menu — close the menu
      if (this.isOpen && dropdown !== event.target) { return true }
    }
  }
}
</script>

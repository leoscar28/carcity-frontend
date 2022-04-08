<template>
  <div class="dropdown">
    <button
      ref="menu"
      class="btn btn-secondary dropdown-toggle"
      :class="{ 'show': isOpen }"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      {{languages[current]}}
    </button>
    <div class="dropdown-menu" style="min-width: 4rem;" :class="{'show': isOpen}">
      <li v-for="(language,key) in languages" :key="key" role="button" @click="selectLanguage(key)">
        <a class="dropdown-item">{{language}}</a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    },
    languages() {
      return this.$store.state.localStorage.languages;
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    selectLanguage(key) {
      this.$store.commit('localStorage/setCurrent',key);
    },
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

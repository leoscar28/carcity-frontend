<template>
  <div class="body-section-content">
    <div class="rule">
      <div class="rule-content">
        <div class="rule-content-tie"></div>
        <template v-if="current === 0">
          <div v-for="(item,key) in body" :key="key" v-html="item.body"></div>
        </template>
        <template v-else>
          <div v-for="(item,key) in body" :key="key" v-html="item.body_kz"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RulesMain",
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    }
  },
  data() {
    return {
      body: '',
    }
  },
  async created() {
    this.body = await this.$store.dispatch('localStorage/ruleGet');
  },
}
</script>

<style scoped>

</style>

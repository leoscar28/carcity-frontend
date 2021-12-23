<template>
  <div>
    <HeaderSection></HeaderSection>
    <div class="body-section">
      <SidebarSection></SidebarSection>
      <div class="body-section-content">
        <DashboardSection></DashboardSection>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['guest'],
  name: "index"
}
</script>

<style lang="scss">

</style>

<template>
  <div class="modal" :class="{'modal-hidden':!commodityShow}">
    <div class="modal-content">
      <div class="modal-content-header-close" @click="$emit('commodityShowChange',false)"></div>
      <div class="modal-content-header">Список ТМЦ</div>
      <div class="modal-content-body" v-if="request.file">
        <a
          :href="request.file" target="_blank">
          <div class="modal-content-body-file" onselectstart="return false;">
            <div class="modal-content-body-file-icon"></div>
            <div class="modal-content-body-file-title">{{request.file.substring(request.file.lastIndexOf('/')+1)}}</div>
            <div class="modal-content-body-file-download"></div>
          </div>
        </a>
      </div>
      <div class="modal-content-body" v-if="request.requestCommodity && request.requestCommodity.length > 0">
        <div class="modal-content-body-item">
          <div class="modal-content-body-item-id">№</div>
          <div class="modal-content-body-item-title">Наименование</div>
          <div class="modal-content-body-item-measure">Кол-во</div>
        </div>
        <div class="modal-content-body-item" v-for="(commodity,key) in request.requestCommodity" :key="key">
          <div class="modal-content-body-item-id">{{key + 1}}</div>
          <div class="modal-content-body-item-title">{{commodity.title}}</div>
          <div class="modal-content-body-item-measure">{{commodity.quantity}} {{commodity.measure}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commodities",
  props: ['commodityShow','request']
}
</script>

<style lang="scss">

</style>

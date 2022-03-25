<template>
  <div class="request-section-main-footer" onselectstart="return false;">
    <div class="request-section-main-footer-pagination" v-show="count > 1">
      <template v-if="showLeft">
        <div class="request-section-main-footer-pagination-item request-section-main-footer-pagination-item-sel" @click="$emit('setRange',1)" v-if="1 === paginate">
          <div>1</div>
        </div>
        <div class="request-section-main-footer-pagination-item" @click="$emit('setRange',1);$emit('setPaginate',1)" v-else>
          <div>1</div>
        </div>
        <div class="request-section-main-footer-pagination-item-dots"></div>
      </template>
      <div class="request-section-main-footer-pagination-item-left" v-show="left" @click="$emit('down')"></div>
      <template v-for="(item,key) in numbers">
        <div class="request-section-main-footer-pagination-item request-section-main-footer-pagination-item-sel" v-if="item === paginate" :key="key">
          <div>{{item}}</div>
        </div>
        <div class="request-section-main-footer-pagination-item" v-else :key="key" @click="$emit('setPaginate',item)">
          <div>{{item}}</div>
        </div>
      </template>
      <div class="request-section-main-footer-pagination-item-right" v-show="right" @click="$emit('up')"></div>
      <template v-if="showRight">
        <div class="request-section-main-footer-pagination-item-dots"></div>
        <div class="request-section-main-footer-pagination-item request-section-main-footer-pagination-item-sel" @click="$emit('setRange',maxRange)" v-if="count === paginate">
          <div>{{count}}</div>
        </div>
        <div class="request-section-main-footer-pagination-item" @click="$emit('setRange',maxRange);$emit('setPaginate',count)" v-else>
          <div>{{count}}</div>
        </div>
      </template>
      <select class="request-section-main-footer-pagination-take" @change="$emit('setTake',$event.target.value)">
        <option value="30" selected>30 / записей</option>
        <option value="50">50 / записей</option>
        <option value="100">100 / записей</option>
      </select>
    </div>
    <div class="request-section-main-footer-count">
      <div>выбрано {{paginate}} из {{count}} страниц</div>
      <div class="request-section-main-footer-count-selected" v-if="pages > 0">найдено записей {{pages}}</div>
      <div class="request-section-main-footer-count-selected" v-else>Записей не найдено</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RequestSectionFooter",
  props: ['paginate','pages','take','range'],
  data() {
    return {
      loop: 5,
    }
  },
  computed: {
    count() {
      if (this.pages < this.take) {
        return 1;
      }
      return Math.floor(this.pages / this.take) + ((this.pages % this.take) > 0 ? 1 : 0);
    },
    maxRange() {
      if (this.count > this.loop) {
        return Math.floor(this.count / this.loop) + ((this.count % this.loop) > 0 ? 1 : 0);
      }
      return 1;
    },
    numbers() {
      let max = this.range * this.loop;
      let min = max - this.loop;
      if (max > this.count) {
        max = max - (max - this.count);
      }
      let arr = [];
      for (let i = min;i < max; ++i) {
        arr.push(i + 1);
      }
      return arr;
    },
    showLeft() {
      return this.range > 1;
    },
    showRight() {
      return (this.count - (this.range * this.loop)) > 0;
    },
    left() {
      return ((this.range * this.loop) - this.loop) > 0;
    },
    right() {
      return (this.range * this.loop) < this.count;
    }
  }
}
</script>

<style lang="scss">

</style>

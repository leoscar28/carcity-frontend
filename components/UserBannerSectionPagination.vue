<template>
  <div class="ubs-pagination" onselectstart="return false;">
    <div class="ubs-pagination-pagination" v-show="count > 1">
      <template v-if="showLeft">
        <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-sel" @click="$emit('setRange',1)" v-if="1 === paginate">
          <div>1</div>
        </div>
        <div class="ubs-pagination-pagination-item" @click="$emit('setRange',1);$emit('setPaginate',1)" v-else>
          <div>1</div>
        </div>
        <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-dots"></div>
      </template>
      <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-left" v-show="left" @click="$emit('down')"></div>
      <template v-for="(item,key) in numbers">
        <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-sel" v-if="item === paginate" :key="key">
          <div>{{item}}</div>
        </div>
        <div class="ubs-pagination-pagination-item" v-else :key="key" @click="$emit('setPaginate',item)">
          <div>{{item}}</div>
        </div>
      </template>
      <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-right" v-show="right" @click="$emit('up')"></div>
      <template v-if="showRight">
        <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-dots"></div>
        <div class="ubs-pagination-pagination-item ubs-pagination-pagination-item-sel" @click="$emit('setRange',maxRange)" v-if="count === paginate">
          <div>{{count}}</div>
        </div>
        <div class="ubs-pagination-pagination-item" @click="$emit('setRange',maxRange);$emit('setPaginate',count)" v-else>
          <div>{{count}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

  export default {
    name: "UserBannerSectionPagination",
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
  .ubs-pagination-pagination {
    display: flex;
    flex-direction: row;
    grid-gap: 10px;

    &-item-left {
      background-image: url('/left.svg');
    }
    &-item-right {
      background-image: url('/right.svg');
    }
    &-item-dots {
      background-image: url('/dots.svg');
    }

    &-item {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid transparent;
      cursor:pointer;
      &-sel {
        border: 1px solid #274985;
      }
    }
  }
</style>

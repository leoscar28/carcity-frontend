<template>
  <div class="row mb-5">
    <div class="col-xl-12 mb-lg-5 mb-3">
      <div class="row">
        <div class="col-lg-12 px-md-2 px-0">
          <div class="promotion-form">
            <div>Что вы ищите?</div>
            <div class="row">
              <div class="col-md-6 mb-md-3 mb-2">
                <input v-model="term" type="text" class="form-control" placeholder="Поиск по названию запчасти"/>
              </div>
              <div class="col-md-6 mb-md-3 mb-2">
                <select v-model="type" class="form-control">
                  <option value="1">Запчасти</option>
                  <option value="2">Услуги</option>
                </select>
              </div>
            </div>
            <div v-if="type == 1" class="brands  mb-md-3 mb-2">
              <div class="promotion-links">
                <span @click="showBrands = !showBrands" class="promotion-link promotion-link--gray fw-bold">Марка</span>
                <span v-for="(brand, index) in brandsForMenu" @click="setBrand(brand.id)"  class="promotion-link fw-bold d-md-block d-none" :class="{'promotion-link--active': brand_id.includes(brand.id)}">{{brand.name}}</span>
                <span @click="showBrands = !showBrands" class="promotion-link promotion-link--gray promotion-link--gray--more fw-bold">ещё ...</span>
              </div>
              <div v-show="showBrands" class="checkbox-groups mt-2" :style="brandsHeight">
                <CheckboxGroup v-for="(group, letter) in brands" :key="letter" :title="letter">
                  <label  v-for="(item, index) in group" :key="index">
                    {{ item.name }}
                    <input type="checkbox" v-model="brand_id" :value="item.id">
                    <span class="checkmark"></span>
                  </label >
                </CheckboxGroup>
              </div>
            </div>
            <div class="categories">
              <div class="promotion-links">
                <span @click="showCategories = !showCategories" class="promotion-link promotion-link--gray fw-bold">Категория</span>
                <span v-for="category in categoriesForMenu" @click="setCategory(category.id)" class="promotion-link fw-bold d-md-block d-none" :class="{'promotion-link--active': category_id.includes(category.id)}">{{category.name}}</span>
                <span @click="showCategories = !showCategories" class="promotion-link promotion-link--gray promotion-link--gray--more fw-bold">ещё ...</span>
              </div>
              <div v-show="showCategories" class="checkbox-groups mt-2" :style="categoriesHeight">
                <CheckboxGroup v-for="(group, letter) in categories" :key="letter" :title="letter">
                  <label  v-for="(item, index) in group" :key="index">
                    {{ item.name }}
                    <input type="checkbox" v-model="category_id" :value="item.id">
                    <span class="checkmark"></span>
                  </label >
                </CheckboxGroup>
              </div>
            </div>
            <div class="text-center d-flex flex-md-row flex-column align-items-center justify-content-center gap-3 mt-md-3 mt-2 pt-2">
              <div v-show="!isRooms" class="form-check">
                <input v-model="withImage" class="form-check-input" type="checkbox" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  С фото
                </label>
              </div>
              <NuxtLink v-if="!isPage" to="/promotions?showRooms=true" class="btn btn-outline-primary">Показать бутики</NuxtLink>
              <button v-else @click="getRooms()" class="btn" :class="!isRooms ? 'btn-outline-primary' : 'btn-primary'" v-text="!isRooms ? 'Показать бутики' : 'Искать бутики'"></button>
              <button @click="getItems(1)" class="btn" :class="isRooms ? 'btn-outline-primary' : 'btn-primary'" v-text="isRooms ? 'Показать объявления' : 'Искать объявления'"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="!isRooms">
      <div class="col-xl-12 mb-lg-5 mb-3">
        <h4 v-if="isPage" class="fw-bold mb-3 pb-1">Все объявления</h4>
        <div class="items-sort" v-if="isPage">Сортировка по: <div @click="nextOrderBy">{{orderBy.name}}</div><div @click="changeSort"><Icon class="d-block m-0" :class="{'icon--rotate': sort === 'ASC'}" name="filter_list" size="26"/></div></div>
        <div class="promotion-items">
          <WidgetUserBannerFront v-for="item in items" :item="item" :key="item.id"/>
        </div>
      </div>
      <div v-if="!isPage" class="col-xl-12 text-center mb-lg-5 mb-0">
        <NuxtLink to="/promotions" class="btn btn-outline-primary">Показать все объявления</NuxtLink>
      </div>
      <UserBannerSectionPagination :paginate="paginate" :pages="pages" :take="take" :range="range" @up="up" @down="down" @setRange="setRange" @setPaginate="setPaginate" @setTake="setTake"/>
    </template>
    <template v-else>
      <div class="map-all">
        <div class="map-left order-md-first order-last">
          <div class="map-left-list">
            <vue-custom-scrollbar class="scroll-area" ref="scrollArea" style="height: 350px" :settings="{ suppressScrollX: false }">
              <div class="map-left-list-main">
                <div v-for="(room,key) in list" @click="roomId = room.id" :key="'roomId'+room.id" :ref="'roomId'+room.id" class="map-left-list-item" :class="{'map-left-list-item--active':roomId === room.id}">
                  <div class="map-left-list-item-description">
                    <div class="map-left-list-item-description-title">{{room.tier.title}}</div>
                  </div>
                  <div class="map-left-list-item-id">{{room.roomType.title}} {{room.title}}</div>
                </div>
              </div>
            </vue-custom-scrollbar>
          </div>
        </div>
        <div class="map-right">
          <map-main :selected="selectedTier" :room-ids="roomIds" :key="'room'+roomId" @room-select="setRoomId"></map-main>
          <div class="map-right-footer d-flex flex-row" onselectstart="return false">
            <div class="map-right-footer-item" :class="{'map-right-footer-item-sel':(selectedTier === key)}" v-for="(tier,key) in tiers" :key="key" v-show="tier.id !== 6 && tier.id !== 1" @click="selectedTier = key">{{tier.title}}</div>
          </div>
        </div>
      </div>
      <div class="col-xl-12 mb-lg-5 mt-3 mb-3">
        <h4 v-if="isPage && items.length" class="fw-bold mb-3 pb-1">Объявления выбранного продавца</h4>
        <div class="promotion-items">
          <WidgetUserBannerFront v-for="item in items" :item="item" :key="item.id"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

  import WidgetUserBannerFront from "./WidgetUserBannerFront";
  import CheckboxGroup from "./uploader/CheckboxGroup";
  import UserBannerSectionPagination from "./UserBannerSectionPagination";
  import Icon from "./icons/Icon";
  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import "vue-custom-scrollbar/dist/vueScrollbar.css";
  const AD_TYPE_SPARE_PART = 1;
  const AD_TYPE_SERVICE = 2;

  export default {
    name: "UserBannerSection",
    components: {Icon, UserBannerSectionPagination, CheckboxGroup, WidgetUserBannerFront, vueCustomScrollbar},
    props: {
      isPage: Boolean
    },
    data(){
      return {
        isRooms:false,
        sort: 'DESC',
        orderBy: {name: 'Дате', value: 'updated'},
        orderByIndex: 0,
        orderByArr: [
          {name: 'Дате', value: 'updated'},
          {name: 'Рейтингу', value: 'rating'},
          {name: 'Количеству отзывов', value: 'review'}
        ],
        roomId:null,
        roomIds:[],
        term:'',
        showCategories:false,
        showBrands: false,
        items:[],
        categories:[],
        categoriesCount: null,
        brands:[],
        brandsCount: null,
        type: AD_TYPE_SPARE_PART,
        category_id:[],
        brand_id:[],
        withImage: false,
        categoriesForMenu: [],
        brandsForMenu: [],
        take: this.isPage ? 15 : 10,
        paginate: 1,
        range: 1,
        pages: 0,
        selectedTier:1
      }
    },
    computed:{
      dataForRequest(){
        let data =  {
          type: 'published',
          take: this.take,
          pagination: this.paginate,
          brand_id: this.brand_id,
          category_id: this.category_id,
          order_by: this.orderBy.value,
          sort: this.sort,
          pages: null,
          data: {
            type: this.type
          }
        }

        if (this.withImage) {
          data['with_image'] = 1;
        }

        if (this.term) {
          data['term'] = this.term;
        }
        return data;
      },
      columns(){
        let columns = 3;

        if(process.client) {
          if (window.innerWidth <= 960) {
            columns = 2
          }
        }
        return columns;
      },
      categoriesHeight(){
        return {maxHeight: (this.categoriesCount/this.columns * 35) + 'px' }
      },
      brandsHeight(){
        return {maxHeight: (this.brandsCount/this.columns * 30) + 'px' }
      },
      tiers() {
        return this.$store.state.localStorage.tiers;
      },
      rooms() {
        return this.$store.state.localStorage.rooms;
      },
      list() {
        let rooms = this.rooms.filter(room => (room.tier.id - 1) === this.selectedTier);

        return rooms.filter(room => this.roomIds.includes(room.id));
      }
    },
    async created() {

      let cats = [],
        brs = [];

      if (this.$route.query.showRooms) {
        await this.getRooms();
      } else {
        await this.getItems();
      }

      cats = await this.$store.dispatch('localStorage/listDictionarySpareParts')
      this.categories = this.group(cats);
      this.categoriesForMenu = this.filterForMenu(cats);
      this.categoriesCount = cats.length;

      brs = await this.$store.dispatch('localStorage/listDictionaryBrands')
      this.brands = this.group(brs);
      this.brandsForMenu = this.filterForMenu(brs);
      this.brandsCount = brs.length;

      await this.$store.dispatch('localStorage/tiersGet');
      await this.$store.dispatch('localStorage/roomGet');
    },
    methods:{
      setRoomId(room_id){
        this.roomId = room_id;
        const [el] = this.$refs['roomId'+this.roomId];
        if (el) {
          this.$refs.scrollArea.$el.scrollTop = el.offsetTop;
        }
      },
      async changeSort(){
        this.sort = this.sort === 'ASC' ? 'DESC' : 'ASC';
        await this.getItems()
      },
      async nextOrderBy(){
        ++this.orderByIndex;
        if (this.orderByIndex > 2) {
          this.orderByIndex = 0;
        }
        this.orderBy = this.orderByArr[this.orderByIndex];
        await this.getItems()
      },
      group(list){
        let groups = list.reduce((groups, item) => ({ ...groups, [item.name[0]]: [...(groups[item.name[0]] || []), item] }), {})
        return Object.keys(groups).sort().reduce((obj, key) => { obj[key] = groups[key]; return obj; }, {});
      },
      filterForMenu(list){
        return list.filter((item) => { return item.for_menu === 1})
      },
      async getRoomItems(room_id){
        const data = this.dataForRequest;
        data.data.room_id = room_id;
        this.items = await this.$store.dispatch('localStorage/getUserBanners', data);
      },
      async getItems(page = null){
        this.isRooms = false;
        if (this.isPage) {
          if (page) {
            this.paginate = page;
          }
          this.pages = await this.$store.dispatch('localStorage/getUserBannerPages', this.dataForRequest);
        }
        this.items = await this.$store.dispatch('localStorage/getUserBanners', this.dataForRequest);
      },
      async getRooms(){
        this.isRooms = true;
        this.items = [];
        this.roomIds = await this.$store.dispatch('localStorage/getUserBannerRooms', this.dataForRequest);

      },
      setCategory(id){
        if (this.category_id.includes(id)) {
          this.category_id = this.category_id.filter((i) => {return i !== id})
        } else {
          this.category_id.push(id)
        }
      },
      setBrand(id){
        if (this.brand_id.includes(id)) {
          this.brand_id = this.brand_id.filter((i) => {return i !== id})
        } else {
          this.brand_id.push(id)
        }
      },
      async setTake(value) {
        this.take = value;
        this.paginate = 1;
        this.range = 1;
        await this.getItems();
      },
      async setPaginate(value) {
        this.paginate = value;
        await this.getItems();
      },
      setRange(value) {
        this.range  = value;
      },
      down() {
        this.range--;
      },
      up() {
        this.range++;
      }
    },
    watch:{
      roomId: async function(val){
        await this.getRoomItems(val);
      },
      type: async function(val) {
        let cats = [];
        this.category_id = [];
        this.brand_id = [];
        this.showBrands = false;
        this.showCategories = false;

        cats = (val == AD_TYPE_SPARE_PART) ?
          await this.$store.dispatch('localStorage/listDictionarySpareParts') :
          await this.$store.dispatch('localStorage/listDictionaryServices');

        this.categories = this.group(cats);
        this.categoriesForMenu = this.filterForMenu(cats);
        this.categoriesCount = cats.length;
      }
    }
  }
</script>

<style lang="scss">
  .promotion-form {
    padding:24px;
    border-radius: 16px;
    background: #FFFFFF;


    @media (max-width:768px) {
      border-radius: 0;
      padding:16px;
    }

    .checkbox-groups {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      grid-gap: 8px;

      @media (max-width:768px) {
        max-height: 100%!important;
      }
      .checkbox-group {
        width: 30%;
        font-size: 14px;

        @media (max-width:960px) {
          width: 50%;
        }
        @media (max-width:768px) {
          width: 100%;
        }
      }
    }
  }

  .items-sort {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    grid-gap: 12px;
    font-size: 18px;
    margin-bottom: 20px;

    div {
      cursor: pointer;
      color: #274985;
      border-bottom: 1px dashed;
      padding: 0 8px;
      &:hover {
        background: #b8c6dd;
      }
    }
  }

  .promotion-items {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    min-height: 300px;

    @media (max-width:768px) {
      grid-gap: 16px;
    }
  }

  .promotion-links {
    color: #274985;
    font-size: 16px;
    display: flex;
    grid-gap: 8px;
    flex-direction: row;
    flex-wrap:wrap;
  }

  .promotion-link {
    cursor: pointer;
    border: 1px dashed transparent;
    border-bottom-color: #274985;
    &--gray {
      color: #8C8C8C;
      border-bottom-color: #8C8C8C;
      &--more {
        @media (max-width:768px) {
          color:#274985;
          border-bottom-color: #274985;
        }
      }
    }
    &--active {
      border-style: solid;
      background: #274985;
      color: #FFFFFF;
    }
  }

  @import '/assets/Map.scss';

</style>

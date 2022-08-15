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
              <div class="col-md-6 mb-md-3 mb-2 d-flex gap-md-3 gap-2">
                <button @click="type = 1" class="btn promotion-form__btn-selector" :class="type != 1 ? 'btn-outline-primary' : 'btn-primary'">Запчасти</button>
                <button @click="type = 2" class="btn promotion-form__btn-selector" :class="type != 2 ? 'btn-outline-primary' : 'btn-primary'">Услуги</button>
              </div>
            </div>
            <div v-if="type == 1" class="brands  mb-md-3 mb-2 d-md-block d-none">
              <div class="promotion-links">
                <span @click="showBrands = !showBrands" class="promotion-link promotion-link--gray fw-bold">Марка</span>
                <span v-for="(brand, index) in brandsForMenu" @click="setBrand(brand.id)"  class="promotion-link fw-bold d-md-block d-none" :class="{'promotion-link--active': brandCheck(brand.id)}">{{brand.name}}</span>
                <span @click="showBrands = !showBrands" class="promotion-link promotion-link--gray promotion-link--gray--more fw-bold">ещё ...</span>
              </div>
              <div v-show="showBrands" class="checkbox-groups mt-2" :style="brandsHeight">
                <CheckboxGroup v-for="(group, letter) in brands" :key="'cggb'+letter" :title="letter">
                  <label  v-for="(item, index) in group" :key="'cggbl' + index">
                    {{ item.name }}
                    <input type="checkbox" v-model="brand_id" :value="item.id">
                    <span class="checkmark"></span>
                  </label >
                </CheckboxGroup>
              </div>
            </div>
            <div class="categories d-md-block d-none">
              <div class="promotion-links">
                <span @click="showCategories = !showCategories" class="promotion-link promotion-link--gray fw-bold">Категория</span>
                <span v-for="category in categoriesForMenu" @click="setCategory(category.id)" class="promotion-link fw-bold d-md-block d-none" :class="{'promotion-link--active': categoryCheck(category.id)}">{{category.name}}</span>
                <span @click="showCategories = !showCategories" class="promotion-link promotion-link--gray promotion-link--gray--more fw-bold">ещё ...</span>
              </div>
              <div v-show="showCategories" class="checkbox-groups mt-2" :style="categoriesHeight">
                <CheckboxGroup v-for="(group, letter) in categories" :key="'cggc' + letter" :title="letter">
                  <label  v-for="(item, index) in group" :key="'cggcl' + index">
                    {{ item.name }}
                    <input type="checkbox" v-model="category_id" :value="item.id">
                    <span class="checkmark"></span>
                  </label >
                </CheckboxGroup>
              </div>
            </div>
            <div v-if="type == 1"  class="d-md-none mobile-checkbox-groups mb-2">
              <div @click="showBrands = !showBrands" class="promotion-form__modal-btn">
                <span v-text="brand_id.length ? 'Марки' : 'Выберите марку'"></span>
                <Icon v-if="!brand_id.length" name="arrow" size="18"/>
                <span v-else class="badge rounded-pill">{{brand_id.length}}</span>
              </div>
              <div v-show="showBrands" class="mobile-checkbox-groups__checkboxes">
                <div v-for="(group, letter) in brands" :key="'mcgb'+letter" :title="letter">
                  <label  v-for="(item, index) in group" :key="'mcgbl'+index">
                    {{ item.name }}
                    <input type="checkbox" v-model="brand_id" :value="item.id">
                    <span class="checkmark"></span>
                  </label >
                </div>
              </div>
            </div>
            <div class="d-md-none mobile-checkbox-groups">
              <div @click="showCategories = !showCategories" class="promotion-form__modal-btn">
                <span v-text="category_id.length ? 'Категории' : 'Выберите категорию'"></span>
                <Icon v-if="!category_id.length" name="arrow" size="18"/>
                <span v-else class="badge rounded-pill">{{category_id.length}}</span>
              </div>
              <div v-show="showCategories" class="mobile-checkbox-groups__checkboxes">
                <div v-for="(group, letter) in categories" :key="'mcgc'+letter" :title="letter">
                  <label  v-for="(item, index) in group" :key="'mcgcl'+index">
                    {{ item.name }}
                    <input type="checkbox" v-model="category_id" :value="item.id">
                    <span class="checkmark"></span>
                  </label >
                </div>
              </div>
            </div>
            <div class="text-center d-flex flex-md-row flex-column align-items-center justify-content-center gap-3 mt-md-3 mt-2 pt-md-2">
                <div v-show="!isRooms" class="form-check">
                  <input v-model="withImage" class="form-check-input" type="checkbox" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    С фото
                  </label>
                </div>
              <div class="promotion-form__buttons d-flex flex-md-row flex-column gap-md-3 gap-2 pt-md-0 pt-3">
                <NuxtLink v-if="!isPage" to="/promotions?showRooms=true" class="btn btn-outline-primary">Показать бутики</NuxtLink>
                <button v-else @click="getRooms()" class="btn" :class="!isRooms ? 'btn-outline-primary' : 'btn-primary'" v-text="!isRooms ? 'Показать бутики' : 'Искать бутики'"></button>
                <button @click="getItems(1)" class="btn" :class="isRooms ? 'btn-outline-primary' : 'btn-primary'" v-text="isRooms ? 'Показать объявления' : 'Искать объявления'"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="!isRooms">
      <div class="col-xl-12 mb-lg-5 mb-3">
        <h4 v-if="isPage" class="fw-bold mb-3 pb-1">Все объявления</h4>
        <template v-if="items.length" >
          <div class="items-sort" v-if="isPage">Сортировка по:
            <select v-model="sortSelector">
              <option :value="1">сначала новые</option>
              <option :value="2">сначала старые</option>
              <option :value="3">возрастанию рейтинга</option>
              <option :value="4">убыванию рейтинга</option>
              <option :value="5">возрастанию количества отзывов</option>
              <option :value="6">убыванию количества отзывов</option>
            </select>
            <!--            <div @click="nextOrderBy">{{orderBy.name}}</div><div @click="changeSort"><Icon class="d-block m-0" :class="{'icon&#45;&#45;rotate': sort === 'ASC'}" name="filter_list" size="26"/></div>-->
          </div>
          <div class="promotion-items">
            <WidgetUserBannerFront v-for="item in items" :item="item" :key="item.id"/>
          </div>
        </template>
        <template v-else-if="!loading">
          <div class="promotion-items__empty">По вашему запросу ничего не найдено</div>
        </template>
        <template v-else>
          <div class="promotion-items__empty">Ищем объявления ...</div>
        </template>
      </div>
      <div v-if="!isPage" class="col-xl-12 text-center mb-lg-5 mb-0">
        <NuxtLink :to="{ path: 'promotions', query: $route.query}" class="btn btn-outline-primary">Показать все объявления</NuxtLink>
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
                  <div v-if="roomId === room.id && roomUser && (roomSpareParts.length || roomBrands.length || roomServices.length)" class="map-left-list-item-room">
                    <div v-for="sparePart in roomSpareParts" :key="'sp'+sparePart.id">{{sparePart.name}}</div>
                    <div v-for="brand in roomBrands" :key="'br'+brand.id">{{brand.name}}</div>
                    <div v-for="service in roomServices" :key="'ss'+service.id">{{service.name}}</div>
                  </div>
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
      let data = {
        isRooms:false,
        sort: 'DESC',
        sortSelector: 1,
        orderBy: {name: 'Дате', value: 'updated'},
        orderByIndex: 0,
        orderByArr: [
          {name: 'Дате', value: 'updated'},
          {name: 'Рейтингу', value: 'rating'},
          {name: 'Количеству отзывов', value: 'review'}
        ],
        roomId:null,
        roomUser: null,
        roomIds:[],
        term:'',
        showCategories:false,
        showBrands: false,
        items:[],
        serviceCategories:[],
        sparePartCategories:[],
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
        take: this.isPage ? 50 : 10,
        paginate: 1,
        range: 1,
        pages: 0,
        selectedTier:1,
        loading: false
      }

      const query = this.$route.query;

      if (query.category_id) {
        data.category_id = Array.isArray(query.category_id) ? query.category_id.map(Number) : [Number(query.category_id)];
      }

      if (query.brand_id) {
        data.brand_id = Array.isArray(query.brand_id) ? query.brand_id.map(Number) : [Number(query.brand_id)];
      }

      if (query.type) {
        data.type = query.type;
      }

      if (query.term) {
        data.term = query.term;
      }

      if (query.with_image) {
        data.withImage = query.with_image;
      }

      if (query.order_by) {
        data.orderBy = data.orderByArr.find((item) => item.value === query.order_by);
      }

      if (query.sort) {
        data.sort = query.sort;
      }

      return data;
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
      },
      roomSpareParts(){
        if (this.roomUser.spare_parts && this.type === AD_TYPE_SPARE_PART){
          return this.roomUser.spare_parts.filter(sparePart => this.category_id.includes(sparePart.id));
        }
        return [];
      },
      roomBrands(){
        if (this.roomUser.brands && this.type === AD_TYPE_SPARE_PART){
          return this.roomUser.brands.filter(brand => this.brand_id.includes(brand.id));
        }
        return [];
      },
      roomServices(){
        if (this.roomUser.services && this.type === AD_TYPE_SERVICE){
          return this.roomUser.services.filter(service => this.service_id.includes(service.id));
        }
        return [];
      },
      brandCheck() {
        return id => this.brand_id.includes(id);
      },
      categoryCheck() {
        return id => this.category_id.includes(id);
      },

    },
    async created() {

      let cats = [],
        brs = [];

      const query = this.$route.query;

      if (query.showRooms) {
        await this.getRooms();
      } else {
        await this.getItems();
      }

      this.serviceCategories = await this.$store.dispatch('localStorage/listDictionaryServices');
      this.sparePartCategories = await this.$store.dispatch('localStorage/listDictionarySpareParts');

      cats = query.type && query.type == AD_TYPE_SERVICE ? this.serviceCategories : this.sparePartCategories;
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
        this.roomUser = await this.$store.dispatch('localStorage/getRoomUserInfo', room_id);
      },
      async getItems(page = null){
        this.loading = true;
        this.isRooms = false;
        if (this.isPage && page) {
          this.paginate = page;
        }
        let data = this.dataForRequest;
        if (data.data.room_id) {
          delete data.data.room_id;
        }
        if (this.isPage) {
          this.pages = await this.$store.dispatch('localStorage/getUserBannerPages', data);
        }
        this.items = await this.$store.dispatch('localStorage/getUserBanners', data);

        let query = {};

        if (data.category_id.length) {
          query['category_id'] = data.category_id;
        }

        if (data.brand_id.length) {
          query['brand_id'] = data.brand_id;
        }

        if (data.data.type) {
          query['type'] = data.data.type;
        }

        if (data.term) {
          query['term'] = data.term;
        }

        if (data.with_image) {
          query['with_image'] = data.with_image;
        }

        if (data.order_by) {
          query['order_by'] = data.order_by;
        }

        if (data.sort) {
          query['sort'] = data.sort;
        }

        if (query !== this.$router.query) {
          let str = "";
          for (let key in query) {

            if (Array.isArray(query[key])) {
              query[key].forEach((val) => {
                if (str !== "") {
                  str += "&";
                }
                str += key + "=" + encodeURIComponent(val);
              })
            } else {
              if (str !== "") {
                str += "&";
              }
              str += key + "=" + encodeURIComponent(query[key]);
            }

          }
          history.pushState(
            {},
            null,
            this.$route.path + '?' + str
          )
        }

        this.loading = false;
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
      sortSelector: async function(val) {
        switch (val) {
          case 1:
            this.orderBy = {name: 'Дате', value: 'updated'};
            this.sort = 'DESC';
            break;
          case 2:
            this.orderBy = {name: 'Дате', value: 'updated'};
            this.sort = 'ASC';
            break;
          case 3:
            this.orderBy = {name: 'Рейтингу', value: 'rating'};
            this.sort = 'DESC';
            break;
          case 4:
            this.orderBy = {name: 'Рейтингу', value: 'rating'};
            this.sort = 'ASC';
            break;
          case 5:
            this.orderBy = {name: 'Количеству отзывов', value: 'review'};
            this.sort = 'DESC';
            break;
          case 6:
            this.orderBy = {name: 'Количеству отзывов', value: 'review'};
            this.sort = 'ASC';
            break;
        }
        await this.getItems()
      },
      roomId: async function(val){
        await this.getRoomItems(val);
        const [el] = this.$refs['roomId'+this.roomId];
        if (el) {
          this.$refs.scrollArea.$el.scrollTop = el.offsetTop;
        }
      },
      type: async function(val) {
        let cats = [];
        this.category_id = [];
        this.brand_id = [];
        this.showBrands = false;
        this.showCategories = false;

        cats = (val == AD_TYPE_SPARE_PART) ?
          this.sparePartCategories :
          this.serviceCategories;

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

    &__btn-selector {
      width :50%;
    }



    @media (max-width:768px) {
      border-radius: 0;
      padding:16px;

      * {
        font-size: 14px!important;
      }

      &__modal-btn, .form-check {

        display: flex;
        justify-content: space-between;
        width: 100%;
        border: 1px solid #F5F5F5;
        background: #F5F5F5;
        padding: 0.5rem 1rem;
        border-radius: 50rem;

        .badge {
          display: inline-block;
          padding: 0 0.65em;
          font-weight: 700;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          background: #274985;
          color: #fff;
        }
      }

      .form-check {
        label {
          text-align: left;
          width:100%;
          order: 1!important;
        }

        input {
          order: 2!important;
        }
      }

      &__buttons {
        width: 100%;
        border-top: 1px solid #F0F0F0;
        .btn {
          width: 100%;
        }
      }
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

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .promotion-items {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    min-height: 300px;

    &__empty {
      padding: 12px 24px;
      border-radius: 8px;
      background: #fff;
      font-size: 16px;
    }

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

  .mobile-checkbox-groups {
    border: 1px solid #f5f5f5;
    border-radius: 1.5rem;

    &__checkboxes {
      height: 250px;
      width: 100%;
      flex-wrap: wrap;
      overflow-y: scroll;
      padding: 0.5rem 1rem;

      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .25rem 0;
        position: relative;

        .checkmark {
          position: relative;
          top: 2px;
          left: 0;
          height: 16px;
          width: 16px;
          border: 1px solid #bfbfbf;
          border-radius: 0.2rem;
          &:before {
            display: block;
            content: '';
            height: 1px;
            width:1px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: transparent;
            border-radius: 2px;
            transition: all .2s ease-in-out;
          }
        }

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
          &:checked ~ .checkmark {
            border-color: #274985;

            &:before {
              background: #274985;
              width: 11px;
              height: 11px;
            }
          }
        }
      }
    }
  }

  @import '/assets/Map.scss';

</style>

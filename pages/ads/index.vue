<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{ suppressScrollX: false }">
      <HeaderSection/>
      <div class="body-section">
        <SidebarSection/>
        <div class="body-section-content">
          <div class="request-searching-form">
            <div class="request-searching-form__header">Отчет</div>
            <div class="request-searching-form__content">
                  <label class="form-label">Когда создано</label>
                  <br>
                  <date-picker v-model="date" range readonly format="YYYY.MM.DD" :lang="lang" :range-separator="' - '" :editable="false" ></date-picker>
                  <download-excel class="request-searching-form__button mt-3" :fetch="download" :name="'Отчет по объявлениям.xls'">
                    Отчет в XLS
                  </download-excel>
            </div>
          </div>

        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import HeaderSection from "@/components/HeaderSection";
import SidebarSection from "@/components/SidebarSection";
import DatePicker from 'vue2-datepicker';
import downloadExcel from "vue-json-excel";
DatePicker.locale('ru');
import 'vue2-datepicker/index.css';
export default {
  data(){
    return {
      take: 100000,
      type: 'published',
      date: null,
      statuses: {10: 'Новое объявление', 15:'Изменено', 20: 'На доработку', 30: 'Не опубликовано', 31: 'Опубликовано', 40: 'В архиве'}
    }
  },
  computed:{
    lang(){
      return this.$store.state.localStorage.lang;
    }
  },
  head(){
    return {
      title: 'Отчет по объявлениям',
      meta: [
        /*{
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }*/
      ],
    }
  } ,
  middleware: ['dashboard'],
  name: "index",
  components: {HeaderSection, SidebarSection,  vueCustomScrollbar, DatePicker, downloadExcel},
  methods: {
    async download() {
        let data = {
          take: this.take,
          type: this.type,
        };
        let statuses = this.statuses;
        if (this.date) {
          data.created_at = this.date;
        }
        let res = await this.$store.dispatch('localStorage/getUserBanners',data);

        console.log(res);
        return res.reduce(function callback(filtered, val) {

            filtered.push({
              'Арендатор': val.user.company,
              'Ярус': val.room.tier.title,
              'Бутик': val.room.room_type.title + ' ' + val.room.title,
              'ID': val.id,
              'Статус': statuses[val.status],
              'Создано': val.created_at,
              'Опубликовано': val.status === 31 ? val.published_at : '',
              'Просмотров объявления': val.view_count,
              'Просмотров телефона': val.phone_view_count,
              'Заголовок':val.title,
              'Текст объявления':val.description
            });

          return filtered;
        }, []);
    },
  }
}
</script>

<style lang="scss">

.request-searching-form {
  margin:20px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgb(0 0 0 / 5%);

  &__header {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #f4f4f4;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  &__content {
    padding:15px;
  }

  &__button {
    max-width: 120px;
    text-align: center;
    border-radius: 5px;
    font-size: 12px;
    min-width: 75px;
    padding: 6px 16px;
    background: #274985;
    color: #FFFFFF;
    border: 1px solid  transparent;
    &:disabled {
      opacity: .6;
    }
  }
}
</style>

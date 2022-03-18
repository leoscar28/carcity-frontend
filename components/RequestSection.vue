<template>
  <div class="request-section">
    <div class="request-section-main">
      <div class="request-section-main-header">
        <div class="request-section-main-header-title" v-if="type === 1">Акт выполненных работ</div>
        <div class="request-section-main-header-title" v-else-if="type === 2">Договора и приложения</div>
        <div class="request-section-main-header-title" v-else-if="type === 3">Счет на оплату</div>
      </div>
      <div class="request-section-main-filter">
        <div class="request-section-main-filter-item-input">
          <select class="request-section-main-filter-item-input-select">
            <option>Статуc выгрузки</option>
            <option v-for="(uploadStatus,key) in uploadStatuses" :key="key">{{uploadStatus.title}}</option>
          </select>
        </div>
        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon calendar"></div>
          <input type="text" placeholder="Дата">
        </div>
        <div class="request-section-main-filter-item">
          <button class="request-section-main-filter-item-find">Найти</button>
          <button class="request-section-main-filter-item-reset">Сбросить</button>
        </div>
      </div>
      <div class="request-section-main-footer">
        <div class="request-section-main-footer-pagination">
          <div class="request-section-main-footer-pagination-item-left"></div>
          <div class="request-section-main-footer-pagination-item">
            <div>1</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>2</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>3</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>4</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>5</div>
          </div>
          <div class="request-section-main-footer-pagination-item-dots"></div>
          <div class="request-section-main-footer-pagination-item">
            <div>50</div>
          </div>
          <div class="request-section-main-footer-pagination-item-right"></div>
        </div>
        <div class="request-section-main-footer-count">1-10  из 100 страницы</div>
      </div>
      <table class="request-section-main-table">
        <thead class="request-section-main-table-head">
          <tr>
            <th>
              <div class="request-section-table-header request-section-table-header-bold">
                <div class="request-section-table-header-icon"></div>
                <div class="request-section-table-header-id">ID</div>
                <div class="request-section-table-header-status">Статус выгрузки</div>
                <div class="request-section-table-header-date">Дата</div>
                <div class="request-section-table-header-count">Всего документов</div>
                <div class="request-section-table-header-count">Доступный для компаний</div>
                <div class="request-section-table-header-count">Не выгружены</div>
                <div class="request-section-table-header-comment">Комментарий</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(doc,key) in docs">
            <tr class="request-section-main-table-row" :key="key">
              <td>
                <div class="request-section-table-header" @click="doc.status = !doc.status">
                  <div class="request-section-table-header-icon">
                    <div :class="{'request-section-table-header-icon-minus':doc.status,'request-section-table-header-icon-plus':!doc.status}"></div>
                  </div>
                  <div class="request-section-table-header-id">1</div>
                  <div class="request-section-table-header-status">Подписано клиентами</div>
                  <div class="request-section-table-header-date">27.01.2022</div>
                  <div class="request-section-table-header-count">1 200</div>
                  <div class="request-section-table-header-count">1 000</div>
                  <div class="request-section-table-header-count">200</div>
                  <div class="request-section-table-header-comment">Lorem ipsum dolor sit amet, consectetur</div>
                </div>
                <div class="request-section-table-body" v-show="doc.status">
                  <div class="request-section-table-body-header">
                    <div class="request-section-table-body-header-title">Успешно выгружено документов 3, из них подписано вами 3, подписано магазинами 3</div>
                    <div class="request-section-table-body-header-buttons">
                      <button class="request-section-table-body-header-button">
                        <div class="request-section-table-body-header-button-icon"></div>
                        Отчет в CSV
                      </button>
                      <button class="request-section-table-body-header-button">
                        <div class="request-section-table-body-header-button-icon"></div>
                        Отчет в XLS
                      </button>
                      <button class="request-section-table-body-header-button request-section-table-body-header-button-reject" v-if="user.role_id === 3">
                        <div class="request-section-table-body-header-button-icon request-section-table-body-header-button-reject-icon"></div>
                        Отменить рейс
                      </button>
                    </div>
                  </div>
                  <table class="request-section-table-body-list">
                    <thead>
                      <tr class="request-section-table-body-list-item">
                        <th>Номер документа</th>
                        <th>Организация</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                        <th>Название</th>
                        <th>UID</th>
                        <th>Код</th>
                        <th>Компания</th>
                        <th>Статус</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="request-section-table-body-list-item" v-for="(n,key) in 3" :key="key">
                        <td>0000012</td>
                        <td>ТОО “ТЦ Car City”</td>
                        <td>27.01.2022</td>
                        <td>0.00 ₸</td>
                        <td>Договор аренды</td>
                        <td>7_580</td>
                        <td>3133</td>
                        <td>ТОО "Название"</td>
                        <td>
                          <button class="request-section-table-body-list-item-btn">Подписать</button>
                        </td>
                        <td>
                          <div class="request-section-table-body-list-item-buttons">
                            <div class="request-section-table-body-list-item-trash" v-if="user.role_id === 3"></div>
                            <div class="request-section-table-body-list-item-download"></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="request-section-table-body-footer" v-if="user.role_id === 4">
                    <button class="request-section-table-body-header-button">
                      <div class="request-section-table-body-header-button-icon request-section-table-body-footer-draw"></div>
                      Подписать документы
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="request-section-main-footer">
        <div class="request-section-main-footer-pagination">
          <div class="request-section-main-footer-pagination-item-left"></div>
          <div class="request-section-main-footer-pagination-item">
            <div>1</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>2</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>3</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>4</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>5</div>
          </div>
          <div class="request-section-main-footer-pagination-item-dots"></div>
          <div class="request-section-main-footer-pagination-item">
            <div>50</div>
          </div>
          <div class="request-section-main-footer-pagination-item-right"></div>
        </div>
        <div class="request-section-main-footer-count">1-10  из 100 страницы</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestSection",
  props: ['type'],
  components: {},
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    uploadStatuses() {
      return this.$store.state.localStorage.uploadStatuses;
    }
  },
  data() {
    return {
      take: 30,
      docs: [{status: false},{status: false},{status: false},{status: false},{status: false},{status: false},{status: false}],
    }
  },
  async created() {
    await this.$store.dispatch('localStorage/getUploadStatuses');
    // this.docs = await this.$store.dispatch('localStorage/getRequests', {
    //   userId: this.user.id,
    //   type: this.type,
    //   paginate: 1,
    //   take: this.take
    // });
  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import '/assets/RequestSection.scss';
</style>

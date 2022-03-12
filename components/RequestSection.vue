<template>
  <div class="request-section">
    <div class="request-section-main">
      <div class="request-section-main-header">
        <div class="request-section-main-header-title">Заявки</div>
        <div class="request-section-main-header-buttons">
          <button class="request-section-main-header-button-settings" @click="$emit('showChange',true);$emit('statusChange',true)">Настройки</button>
          <button class="request-section-main-header-button" @click="$emit('showRequestChange',true);$emit('statusRequestChange',true)">Подать заявку</button>
        </div>
      </div>
      <div class="request-section-main-filter">
        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon matrix"></div>
          <input type="text" placeholder="Номер заявки">
        </div>
        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon calendar"></div>
          <input type="text" placeholder="Дата создания">
        </div>
        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon status"></div>
          <input type="text">
        </div>
        <div class="request-section-main-filter-item">
          <button class="request-section-main-filter-item-reset">Сбросить</button>
          <button class="request-section-main-filter-item-find">
            Найти
          </button>
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
            <th>Номер заявки</th>
            <th>Дата создания</th>
            <th>Период проведения</th>
            <th>Согласующая сторона</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(request,key) in requests">
            <tr class="request-section-main-table-row" :key="key">
              <td>
                <NuxtLink :to="'/request?id='+request.id">
                  <div class="request-section-main-table-row-number">№{{request.id}}</div>
                </NuxtLink>
              </td>
              <td>{{request.created_at_readable}}</td>
              <td>{{request.start.replace(/-/g, ".")}} <div class="request-section-main-table-arrow"></div> {{request.end.replace(/-/g, ".")}}</td>
              <template v-for="(queue,key) in request.requestQueue">
                <td class="request-section-main-table-dot-orange" v-if="!queue.department && queue.approve === 2" :key="key">Арендатор</td>
                <td class="request-section-main-table-dot-orange" v-else-if="queue.department && queue.approve === 2" :key="key">{{queue.department.title}}</td>
              </template>
              <td>
                <NuxtLink :to="'/request?id='+request.id" v-if="request.ready === 1">
                  <div class="request-section-main-table-row-status-agreed">На согласовании</div>
                </NuxtLink>
                <NuxtLink :to="'/request?id='+request.id" v-else-if="request.ready === 2">
                  <div class="request-section-main-table-row-status-approved">Согласовано</div>
                </NuxtLink>
                <NuxtLink :to="'/request?id='+request.id" v-else-if="request.ready === 3">
                  <div class="request-section-main-table-row-status-ready">Выполнено</div>
                </NuxtLink>
                <NuxtLink :to="'/request?id='+request.id" v-else-if="request.ready === 4">
                  <div class="request-section-main-table-row-status-rejected">Отклонено</div>
                </NuxtLink>
              </td>
              <td>
                <div class="request-section-main-table-row-print" :class="{'request-section-main-table-row-print-enable':(request.ready === 3)}"></div>
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
  props: ['type','show','status'],
  components: {},
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
  },
  data() {
    return {
      take: 30,
      requests: [],
    }
  },
  async created() {
    this.requests = await this.$store.dispatch('localStorage/getRequests', {
      userId: this.user.id,
      type: this.type,
      paginate: 1,
      take: this.take
    });
  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import '/assets/RequestSection.scss';
</style>

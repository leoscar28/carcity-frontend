<template>
  <div class="request-section">
    <div class="request-section-main">
      <div class="request-section-main-header">
        <div class="request-section-main-header-title">Заявки</div>
        <button class="request-section-main-header-button">Подать заявку</button>
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
          </tr>
        </thead>
        <tbody>
          <template v-for="index in 30">
            <tr class="request-section-main-table-row" :key="index">
              <td>
                <div class="request-section-main-table-row-number">№{{index}}</div>
              </td>
              <td>01.11.22</td>
              <td>2 <div class="request-section-main-table-arrow"></div> 7.11.2020</td>
              <td class="request-section-main-table-dot-orange">Арендатор</td>
              <td>
                <div class="request-section-main-table-row-status-approved">На согласовании</div>
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
  name: "RequestSection"
}
</script>

<style lang="scss">
  @import '/assets/RequestSection.scss';
</style>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content-header">Подача заявки</div>
      <div class="modal-content-graph">
        <div class="modal-content-graph-active">
          <div>1</div>
          <div class="modal-content-graph-title">Формирование</div>
        </div>
        <div class="modal-content-graph-line"></div>
        <div class="modal-content-graph-item">
          <div>2</div>
          <div class="modal-content-graph-title">Детали</div>
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Вид работ</div>
        <div class="modal-content-graph-field-radio">
          <div class="modal-content-graph-field-radio-item">
            <div class="modal-content-graph-field-radio-item-icon modal-content-graph-field-radio-item-icon-active"></div>
            <div class="modal-content-graph-field-radio-item-title">Ввоз</div>
          </div>
          <div class="modal-content-graph-field-radio-item">
            <div class="modal-content-graph-field-radio-item-icon"></div>
            <div class="modal-content-graph-field-radio-item-title">Вывоз</div>
          </div>
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Наименование организации</div>
        <div class="modal-content-graph-field-input">
          <select>
            <option disabled selected>Выберите организацию</option>
          </select>
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">№ помещения</div>
        <div class="modal-content-graph-field-input">
          <select>
            <option disabled selected>Выберите помещения</option>
          </select>
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Мобильный телефон</div>
        <div class="modal-content-graph-field-input">
          <input type="text">
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Рабочий телефон</div>
        <div class="modal-content-graph-field-input">
          <input type="text">
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Период проведения</div>
        <div class="modal-content-graph-field-description">Заявка заполняется максимум на 5 дней</div>
        <div class="modal-content-graph-field-input">
          <input type="text">
        </div>
      </div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Ответственные лица</div>
        <div class="modal-content-graph-field-input-double">
          <div>
            <div class="modal-content-graph-field-input-double-title">Фамилия</div>
            <input type="text" placeholder="Введите фамилию">
          </div>
          <div>
            <div class="modal-content-graph-field-input-double-title">Имя</div>
            <input type="text" placeholder="Введите имя">
          </div>
          <div class="modal-content-graph-field-input-double-remove"></div>
        </div>
        <div class="modal-content-graph-field-add">
          <button>
            <span>
              <div></div> Добавить
            </span>
          </button>
        </div>
      </div>
      <div class="modal-content-graph-footer">
        <div>
          <button>Отмена</button>
        </div>
        <div>
          <button class="modal-content-graph-footer-btn">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Request"
}
</script>

<style lang="scss">
  @import "assets/Modal.scss";
</style>

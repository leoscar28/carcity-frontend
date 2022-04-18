<template>
  <download-excel class="request-section-table-body-header-button" :fetch="download" :name="types[this.type]+'-'+rid+'.xls'">
    <div class="request-section-table-body-header-button-icon"></div>
    Отчет в XLS
  </download-excel>
</template>

<script>
import downloadExcel from "vue-json-excel";

export default {
  name: "Excel",
  components: {downloadExcel},
  props: ['statuses','type','rid'],
  data() {
    return {
      types: ['Акт выполненных работ','Договора и приложения','Счета на оплату'],
      status: true,
    }
  },
  methods: {
    async download() {
      if (this.status) {
        this.status = false;
        let res;
        if (this.type === 1) {
          res = await this.$store.dispatch('localStorage/completionGetByRid',this.rid);
        } else if (this.type === 2) {
          res = await this.$store.dispatch('localStorage/applicationGetByRid',this.rid);
        } else if (this.type === 3) {
          res = await this.$store.dispatch('localStorage/invoiceGetByRid',this.rid);
        }
        this.status = true;
        let self = this;
        console.log(res);
        console.log(this.statuses);
        return res.map(function callback(val) {
          return {
            'Номер документа': val.number,
            'Организация': val.organization,
            'Дата': val.created_at,
            'Сумма': val.sum + ' тг',
            'Название': val.name,
            'Компания': val.users.company,
            'Статус': self.statuses[val.upload_status_id].title,
          };
        });
      }
    },
  }
}
</script>

<style scoped>

</style>

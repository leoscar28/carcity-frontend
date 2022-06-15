<template>
  <download-excel class="request-section-table-body-header-button" :fetch="download" :name="types[this.type - 1]+'-'+rid+'.xls'">
    <div class="request-section-table-body-header-button-icon"></div>
    Отчет в XLS
  </download-excel>
</template>

<script>
import downloadExcel from "vue-json-excel";

export default {
  name: "Excel",
  components: {downloadExcel},
  props: ['statuses','type','rid','number','sum','customer','statusSelected'],
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
        //'number','sum','customer','status'
        console.log(this.statusSelected);
        console.log(res);
        return res.reduce(function callback(filtered, val) {
          /*
                let status  = true;
      if (number && number.trim() !== '' && !rid.number.trim().toLowerCase().includes(number.trim().toLowerCase())) {
        status  = false;
      }
      if (sum && sum.trim().replace(/\s/g, '') !== '' && !rid.sum.toString().replace(/\s/g, '').includes(sum)) {
        status  = false;
      }
      if (customer && customer.trim() !== '' && !rid.customer.trim().toLowerCase().includes(customer.trim().toLowerCase())) {
        status  = false;
      }
      if (statusSelected && (rid.upload_status_id !== statusSelected)) {
        status  = false;
      }
           */
          let stat = true;
          if (self.number && self.number.trim() !== '' && !val.number.trim().toLowerCase().includes(self.number.trim().toLowerCase())) {
            stat  = false;
          }
          if (self.sum && self.sum.trim().replace(/\s/g, '') !== '' && !val.sum.toString().replace(/\s/g, '').includes(self.sum)) {
            stat  = false;
          }
          if (self.customer && customer.trim() !== '' && !val.company.trim().toLowerCase().includes(self.customer.trim().toLowerCase())) {
            stat  = false;
          }
          if (self.statusSelected && (val.upload_status_id !== self.statusSelected)) {
            stat = false;
          }

          if (stat) {
            filtered.push({
              'Номер документа': val.number,
              'Организация': val.organization,
              'Дата': val.created_at,
              'Сумма': val.sum + ' тг',
              'Название': val.name,
              'Компания': val.users ? val.users.company : val.customer,
              'Статус': self.statuses[val.upload_status_id - 1].title,
            });
          }
          return filtered;
        }, []);
      }
    },
  }
}
</script>

<style scoped>

</style>

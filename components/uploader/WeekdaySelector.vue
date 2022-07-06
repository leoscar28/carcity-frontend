<template>
  <div class="form-control form-control-sm weekday-selector">
    <label v-for="(day, index) in lang.formatLocale.weekdaysMin" :key="index" class="weekday" :class="{'weekday--active': isActive(index)}">
      {{ day }}
      <input type="checkbox" v-model="weekdays" :value="index">
    </label>
  </div>
</template>

<script>
    export default {
      name: "WeekdaySelector",
      props:['formWeekdays'],
      emits:['select'],
      data(){
        return {weekdays:this.formWeekdays}
      },
      computed:{
          lang(){
            return this.$store.state.localStorage.lang;
          }
      },
      methods:{
        isActive(index){
          return this.weekdays.includes(index);
        }
      },
      watch:{
        weekdays(){
          this.$emit('select', this.weekdays)
        }
      }
    }
</script>

<style lang="scss">
  .weekday-selector {
    display: flex;
    grid-gap: 6px;

    .weekday {
      border: 1px solid #bfbfbf;
      color: #bfbfbf;
      border-radius: 3px;
      flex-grow: 1;
      text-align: center;
      transition: all .2s ease-in-out;
      cursor: pointer;

      input{
        display:none;
      }
      &--active {
        color: #ffffff;
        background: #274985;
        border: 1px solid #274985;
      }
    }
  }
</style>

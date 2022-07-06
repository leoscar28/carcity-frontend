<template>
  <div class="checkbox-group">
    <div @click="show()" class="checkbox-group__letter">{{ title }} <img class="checkbox-group__expander" :class="{'checkbox-group__expander--active':isActive}" src="/icon_expand_more.svg"/></div>
    <transition name="slide-up">
      <div v-show="!isMobile || isActive" class="checkbox-group__checkboxes"><slot/></div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "CheckboxGroup",
        props: ['title'],
        data() {
            return {isActive: false}
        },
      mounted() {
      },
      computed: {
            isMobile(){
              if (process.client) {
                return window.innerWidth < 768;
              }
              return false;
            }
        },
        methods: {
            show(){
              if (this.isMobile) {
                this.isActive = !this.isActive;
              }
            }
        }
    }
</script>

<style lang="scss">
  .checkbox-group {

    display: flex;
    flex-direction: row;
    width: 50%;

    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
      grid-gap: 8px;
    }

    &__expander {
      display: none;
      transition: .5s transform ease-in-out;

      &--active {
        transform: scale(1, -1);
      }

      @media (max-width: 768px) {
        display: block;
        float: right;
      }
    }

    &__letter {
      width: 25px;
      color: #8C8C8C;
      font-weight: 500;


      @media (max-width: 768px) {
        width: 100%;
        border-bottom: 1px solid #bfbfbf;
        line-height: 22px;
        padding: 8px 0;
      }
    }

    .slide-up-enter-active,
    .slide-up-leave-active {
      transition: all .3s ease;
      max-height: 100%;
    }

    .slide-up-enter-from,
    .slide-up-leave-to {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    }

    &__checkboxes {
      width: 100%;

      label {
        display: block;
        position: relative;
        padding-left: 1.5rem;
        min-height: 20px;
        line-height: 20px;
        cursor: pointer;
        margin-bottom: 0.325rem;
        color: #1E1E1E;

        .checkmark {
          position: absolute;
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

        &:hover {
          .checkmark {
            border-color: #6582b7;
          }
        }
      }
    }

  }
</style>

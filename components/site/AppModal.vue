<template>
  <div>
    <div
      class="modal"
      :class="{ 'show d-block': visible }"
      tabindex="-1"
      @click.self="hide"
    >
      <div class="modal-dialog" :class="[modalSize]" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h5 class="modal-title">
                {{ title }}
              </h5>
            </slot>
            <button type="button" class="btn-close" aria-label="Close" @click="hide" />
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="visible" class="modal-backdrop" :class="{ show: visible }" />
  </div>
</template>

<script>
import { currentScrollbarWidth } from '~/utils/scroll'

export default {
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    modalSize () {
      return this.size ? `modal-${this.size}` : ''
    }
  },
  ...process.client && {
    watch: {
      visible: {
        handler (newVal) {
          if (newVal) {
            document.body.classList.add('overflow-hidden')
            document.body.style.paddingRight = currentScrollbarWidth + 'px'
          } else {
            document.body.classList.remove('overflow-hidden')
            document.body.removeAttribute('style')
          }
        },
        immediate: true
      }
    }
  },
  methods: {
    hide () {
      this.$emit('input', false)
    }
  }
}
</script>

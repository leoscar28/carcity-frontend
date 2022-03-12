<template>
  <div class="modal" :class="{'modal-hidden':!show}">
    <div class="modal-content">
      <div class="modal-content-header-close" @click="$emit('showChange',false)"></div>
      <div class="modal-content-header">Галерея</div>
      <template v-if="status">
        <div class="modal-content-list">
          <div>
            <div class="modal-content-list-item modal-content-list-item-add" @click="$emit('statusChange',false);"></div>
            <div class="modal-content-list-item" :class="{'modal-content-list-item-sel':(user.image_id && (image.id === user.image_id.id))}" v-for="(image,index) in images" :key="index" :style="{'background-image':'url('+image.src+')'}" @click="userImage(image.id)"></div>
          </div>
        </div>
        <div class="modal-content-graph-footer">
          <div>
            <button @click="$emit('showChange',false);">Отмена</button>
          </div>
          <div>
            <button class="modal-content-graph-footer-btn" @click="$emit('showChange',false);">Выбрать фото</button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="modal-content-resize">
          <div class="modal-content-resize-text">Загрузите фото</div>
          <cropper
            ref="cropper"
            :src="img.src"
            :stencil-props="{aspectRatio: 1}"
            @change="change"
          ></cropper>
        </div>
        <div class="modal-content-graph-footer" v-if="!img.src">
          <div>
            <button @click="$emit('statusChange',true);">Отмена </button>
          </div>
          <div>
            <input type="file" class="modal-hidden" ref="file" @change="loadImage($event)" accept="image/*">
            <button class="modal-content-graph-footer-btn" @click="$refs.file.click()">Загрузить фото</button>
          </div>
        </div>
        <div class="modal-content-graph-footer" v-else>
          <template v-if="!loading">
            <div>
              <button @click="img = {src: null,type: null}">Отмена</button>
            </div>
            <div>
              <button class="modal-content-graph-footer-btn" @click="ready">Обрезать фото</button>
            </div>
          </template>
          <template v-else>
            <div>
              <div id="circleG">
                <div id="circleG_1" class="circleG"></div>
                <div id="circleG_2" class="circleG"></div>
                <div id="circleG_3" class="circleG"></div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
export default {
  name: "Images",
  props: ['show','status'],
  components: {
    Cropper
  },
  computed: {
    images() {
      return this.$store.state.localStorage.image;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  data() {
    return {
      img: {
        src: null,
        type: null
      },
      image: null,
      loading: false,
    }
  },
  created() {
    this.$store.dispatch('localStorage/getImages');
  },
  methods: {
    async userImage(id) {
      let update  = this.$toast.show('Сохранение фото');
      const res = await this.$store.dispatch('localStorage/setUser', {
        id: this.user.id,
        data: {
          image_id: id,
        }
      });
      if (res.hasOwnProperty('errors')) {
        update.goAway(2000);
        for (const [key, value] of Object.entries(res.errors)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
      } else {
        update.goAway(0);
        this.$toast.show('Сохранено').goAway(2000);
      }
    },
    loadImage(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.img.src) {
          URL.revokeObjectURL(this.img.src);
        }
        const blob = URL.createObjectURL(files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.img = {
            src: blob,
            type: this.getMimeType(e.target.result, files[0].type),
          };
        };
        reader.readAsArrayBuffer(files[0]);
      }
    },
    getMimeType(file, fallback = null) {
      const byteArray = (new Uint8Array(file)).subarray(0, 4);
      let header = '';
      for (let i = 0; i < byteArray.length; i++) {
        header += byteArray[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          return "image/png";
        case "47494638":
          return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          return "image/jpeg";
        default:
          return fallback;
      }
    },
    change({coordinates, canvas}) {
      const ctx = canvas.getContext('2d');
      ctx.getImageData(coordinates.left, coordinates.top, coordinates.width, coordinates.height);
      this.image  = canvas.toDataURL();
    },
    async ready() {
      if (!this.loading) {
        this.loading = true;
        const res = await this.$store.dispatch('localStorage/imageCreate', {
          user_id: this.user.id,
          src: this.image
        });
        this.loading  = false;
        this.$emit('statusChange',true);
        this.img  = {
          src: null,
          type: null
        };
        this.image  = null;
        await this.userImage(res.id);
      }
    }
  }
}
</script>

<style lang="scss">
@import "assets/Modal.scss";
</style>

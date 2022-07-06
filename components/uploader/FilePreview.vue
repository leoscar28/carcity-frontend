<template>
  <div class="file-preview">
    <button @click="$emit('remove', file)" class="close-icon">&times;</button>
    <img :src="file.url" :alt="file.file.name" :title="file.file.name" />
  </div>
</template>

<script>
  export default {
    name:"FilePreview",
    props:{
      file: { type: Object, required: true }
    },
    emits:['remove']
  }
</script>

<style scoped lang="scss">
  .file-preview {
    width: calc(20% - 12.8px);
    position: relative;
    aspect-ratio: 1/1;
    overflow: hidden;

    @media (max-width:768px) {
      width: calc(50% - 8px);
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .close-icon {
      position: absolute;
      line-height: 20px;
      height: 20px;
      border-radius: 20px;
      box-shadow: 0 0 5px currentColor;
      right: 0.25rem;
      appearance: none;
      border: 0;
      padding: 0;
    }

    .close-icon {
      width: 20px;
      font-size: 20px;
      background: #933;
      color: #fff;
      top: 0.25rem;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="image-list" v-show="files.length">
    <FilePreview v-for="file of files" :key="file.id" :file="file" @remove="removeFile" />
  </div>
</template>

<script>
    import FilePreview from "./FilePreview";

    export default {
      name: "ImageList",
      emits:['remove-file'],
      props: {
          files: {
            type: Array
          }
      },
      components: {FilePreview},
      methods: {
        removeFile(file){
          this.$emit('remove-file', file)
        }
      }
    }
</script>

<style lang="scss">
    .image-list {
      display: flex;
      grid-gap: 16px;
      @media (max-width: 768px) {
        flex-wrap: wrap;

      }
    }
</style>

<template>
  <div class="image-list" v-show="files.length">
    <FilePreviewUploaded v-for="file of files" :key="file.id" :file="file" @remove="removeFile" />
  </div>
</template>

<script>
    import FilePreviewUploaded from "./FilePreviewUploaded";

    export default {
      name: "ImageListUploaded",
      emits:['remove-file'],
      props: {
          files: {
            type: Array
          }
      },
      components: {FilePreviewUploaded},
      methods: {
        removeFile(file){
          this.$emit('remove-file', file)
        }
      }
    }
</script>

<style scoped lang="scss">
    .image-list {
      display: flex;
      grid-gap: 16px;
      @media (max-width: 768px) {
        flex-wrap: wrap;

      }
    }
</style>

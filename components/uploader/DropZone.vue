<template>
  <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop" class="drop-area">
    <slot :dropZoneActive="active"></slot>
  </div>
</template>

<script>
  const events = ['dragenter', 'dragover', 'dragleave', 'drop']

  export default {
    name: "DropZone",
    emits: ['files-dropped'],
    data(){
      return {active:false, inActiveTimeout: null};
    },
    methods: {
      setActive(){
        this.active = true;
        clearTimeout(this.inActiveTimeout);
      },
      setInactive(){
        this.inActiveTimeout = setTimeout(()=>{
          this.active = false;
        }, 50)
      },
      onDrop(e){
        this.setInactive();
        this.$emit('files-dropped', [...e.dataTransfer.files])

      },
      preventDefaults(e){
        e.preventDefault();
      }
    },
    mounted() {
      events.forEach((eventName) => {
        document.body.addEventListener(eventName, this.preventDefaults)
      })
    },
    unmounted(){
      events.forEach((eventName) => {
        document.body.removeEventListener(eventName, this.preventDefaults)
      })
    }
  }
</script>

<style lang="scss">
  .drop-area {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    transition: .2s ease;
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }

    &[data-active=true] {
      border: 1px solid #e5e5e5;
      background: #ffffff;
    }
  }
</style>

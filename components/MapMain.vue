<template>
  <div class="map-right-main">
    <div>
        <map-main-level-two v-if="selected === 1" :room-ids="roomIds" @room-select="setRoomId"></map-main-level-two>
        <map-main-level-three v-if="selected === 2" :room-ids="roomIds" @room-select="setRoomId"></map-main-level-three>
        <map-main-level-four v-if="selected === 3" :room-ids="roomIds" @room-select="setRoomId"></map-main-level-four>
        <map-main-level-five v-if="selected === 4" :room-ids="roomIds" @room-select="setRoomId"></map-main-level-five>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapMain",
  props: ['selected', 'roomIds'],
  emits: ['room-select'],
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    },
    tiers() {
      return this.$store.state.localStorage.tiers;
    }
  },
  methods: {
    setRoomId(room_id){
      this.$emit('room-select', room_id)
    }
  }
}
</script>

<style lang="scss">
  .active-room {
    fill:#f5be24;
    cursor:pointer;
  }
</style>

<template>
  <div class="search-albums-container">
    <div class="sheet-wrap-list">
        <Album v-for="album in albums" :key="album.id" :album="album"/>
    </div>
  </div>
</template>

<script>
import Album from '@/components/Album'
export default {
  props: {
    albums: {
      type: Array,
      required: true
    }
  },
  components: {
    Album
  }

}
</script>

<style>
.search-albums-container{
  margin-top: 20px;
}
</style>

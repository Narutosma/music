<template>
  <div class="singer-alubms-container">
    <div class="sheet-wrap-list">
      <Alubm v-for="album in albums" :key="album.id" :album="album"/>
    </div>
  </div>
</template>

<script>
import Alubm from '@/components/Album'
export default {
  props: ['albums'],
  components: {
    Alubm
  }
}
</script>

<style>
  .singer-alubms-container{
    margin-top: 20px;
  }
</style>

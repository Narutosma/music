<template>
  <div class="search-mv-container">
    <div class="mv-wrap-list">
        <VCard v-for="mv in mvs" :key="mv.id" :mv="mv"/>
    </div>
  </div>
</template>

<script>
import VCard from '@/components/VCard'
export default {
  props: {
    mvs: {
      type: Array,
      required: true
    }
  },
  components: {
    VCard
  }
}
</script>

<style>
.search-mv-container{
    margin-top: 20px;
}

</style>

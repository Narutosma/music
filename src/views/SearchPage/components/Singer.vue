<template>
  <div class="search-singer-container">
    <div class="singer-wrap-list">
      <SCard v-for="singer in singers" :key="singer.id" :singer="singer"/>
    </div>
  </div>
</template>

<script>
import SCard from '@/components/SCard'
export default {
  props: ['singers'],
  components: {
    SCard
  }
}
</script>

<style>
.search-singer-container{
  margin-top: 20px;
}
</style>

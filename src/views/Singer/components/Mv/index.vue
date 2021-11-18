<!-- 歌手mv列表 -->
<template>
  <div class="mv-singer-container">
    <div class="mv-wrap-list">
      <VCard v-for="mv in mvs" :key="mv.id" :mv="mv"/>
    </div>
  </div>
</template>

<script>
import VCard from '@/components/VCard'
export default {
  props: ['mvs'],
  components: {
    VCard
  }
}
</script>

<style>
.mv-singer-container{
  margin-top: 20px;
}

</style>

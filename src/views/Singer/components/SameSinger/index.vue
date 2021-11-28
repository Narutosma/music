<!-- 相似歌手 -->
<template>
  <div class="same-singer-container">
    <div class="singer-wrap-list">
      <SCard v-for="singer in same" :key="singer.id" :singer="singer"/>
    </div>
  </div>
</template>

<script>
import SCard from '@/components/SCard'
export default {
  props: {
    same: {
      type: Array,
      required: true
    }
  },
  components: {
    SCard
  },
  created () {
    console.log(this.same)
  }

}
</script>

<style>
.same-singer-container{
  margin-top: 20px;
}
</style>

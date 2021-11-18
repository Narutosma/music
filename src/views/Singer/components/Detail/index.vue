<!-- 歌手详情 -->
<template>
  <div class="singer-introduce-container">
    <div class="introduce-item">
      <h3 class="title">{{ desc.name }}简介</h3>
      <p>{{ desc.briefDesc }}</p>
    </div>
    <div class="introduce-item" v-for="(intro, i) in desc.introduction" :key="i">
      <h3>{{ intro.ti }}</h3>
      <p>{{ intro.txt }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['desc'],
  created () {
    console.log(this.desc)
  }
}
</script>

<style lang="scss">
@import '@/common.scss';
.singer-introduce-container{
  margin-top: 20px;
  border-radius: 5px;
  background: $white;
  padding: 10px;

  .introduce-item{
    margin-top: 10px;
    p{
      margin: 20px 0;
      color: $gray;
      letter-spacing:1.2px;
      line-height: 24px;
    }
  }

  .title{
    text-align: center;
    position: relative;
    &::after{
      content: "";
      display: block;
      width: 60px;
      height: 2px;
      background: $red;
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translateX(-50%);
    }
  }
}

</style>

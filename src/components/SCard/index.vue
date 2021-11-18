<!-- 歌手卡 -->
<template>
  <div class="s-card-container">
      <div class="avata">
          <img v-lazy="singer.img1v1Url + '?param=200y200'" :data-src="singer.img1v1Url + '?param=20y20'" alt="">
          <router-link :to="{name: 'singerdetail', params: {id: singer.id}}"></router-link>
      </div>
      <p class="card-singer">
          <router-link :to="{name: 'singerdetail',params: {id: singer.id}}">{{ singer.name }}</router-link>
      </p>
      <p class="card-songs">
          <span>单曲数： {{ singer.musicSize }}</span>
      </p>
  </div>
</template>

<script>
export default {
  props: ['singer']
}
</script>

<style lang="scss">
    @import "@/common.scss";
    .s-card-container{
        width: 92px;
        // margin: 0 20px 20px 0;
        // margin-bottom: 20px;
        &:nth-child(10n){
            margin-right: 0;
        }
        .avata{
            border-radius: 50%;
            overflow: hidden;
            width: 92px;
            height: 92px;
            position: relative;
            box-shadow: 0px 0px 5px #ddd;
            img{
                width: 100%;
                height: 100%;
            }
            a{
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .card-singer,
        .card-songs{
            text-align: center;
            margin-top: 2px;
            a{
                @include common-a;
                @include text-wrap(1);
                font-size: 14px;
            }
            span{
                font-size: 12px;
                color:$red;
            }
        }
    }
</style>

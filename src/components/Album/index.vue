<template>
      <div class="alubm-card">
      <div class="alubm-cover">
          <img :src="album.picUrl + '?param=200y200'" alt="">
          <router-link :to="{name:'albumplaylist', params: {id: album.id}}" />
          <span><Icon type='playFill' size="12"/>{{ album.subType }}</span>
      </div>
      <p class="des">
          <router-link :to="{name:'albumplaylist', params: {id: album.id}}">{{ album.name }}</router-link>
          <span>{{ album.artist.name}}</span>
          <span>{{ formatDate(album.publishTime) }}</span>
      </p>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { formatDate } from '@/utils'
export default {
  props: ['album'],
  data () {
    return {
      sheet: {}
    }
  },
  components: {
    Icon
  },
  methods: {
    formatDate,
    // 数字转换
    formatCount (count) {
      if (count < 100000) return count
      else if (count < 100000000) return `${Math.floor(count / 10000)}万`
      else return `${Math.floor(count / 100000000)}亿`
    }
  }

}
</script>

<style lang="scss">
    @import "@/common.scss";
    .alubm-card{
        width: 140px;
        height: 220px;
        margin-right: 50px;
        margin-bottom: 30px;
        position: relative;
        &:nth-child(6n){
            margin-right: 0;
        }
        .alubm-cover{
            width: 100%;
            height: 140px;
            border-radius: 5px;
            position: relative;
            z-index: 1;

            // 专辑后显示的光盘样式
            &::before{
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                right: -15px;
                transform: translateY(-50%);
                width: 80%;
                height: 80%;
                background: $black;
                border-radius: 50%;
                z-index: -1;
            }

            img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
            a{
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 100%;
                height: 100%;
                z-index: 2;
            }
            span{
                cursor: pointer;
                position: absolute;
                right: 5px;
                top: 5px;
                background: rgba($color: #000000, $alpha: 0.6);
                color: $white;
                font-size: 12px;
                padding: 0 5px;
                border-radius: 3px;
                .iconfont{
                    vertical-align: baseline;
                }
            }
        }
        .des{
            width: 100%;
            margin: 8px 0 3px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            a{
                max-width: 100%;
                @include common-a;
                @include text-wrap(1);
            }

            span{
                // margin-top: 3px;
                color: $gray;
                font-size: 12px;
            }
        }
    }
</style>

<!-- 歌单组件 -->
<template>
  <div class="v-card">
      <div class="m-cover">
          <img v-lazy="mv.cover + '?param=300y200'" :data-src="mv.cover + '?param=30y20'" alt="">
          <router-link :to="{name:'mvdetail', params: {id: mv.id}}" />
          <span class="playCount"><Icon type='playFill' size="12"/>{{ formatCount(mv.playCount) }}</span>
          <div class="v-info">
              <span>{{ mv.artistName }}</span>
              <span class="right">{{ timeToMinute(mv.duration) }}</span>
          </div>
      </div>
      <p class="des">
          <router-link :to="{name:'mvdetail', params: {id: mv.id}}">{{ mv.name }}</router-link>
      </p>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { timeToMinute } from '@/utils'
export default {
  props: {
    mv: {
      type: Object,
      required: true
    }
  },
  components: {
    Icon
  },
  methods: {
    // 数字转换
    formatCount (count) {
      if (count < 100000) return count
      else if (count < 100000000) return `${Math.floor(count / 10000)}万`
      else return `${Math.floor(count / 100000000)}亿`
    },
    timeToMinute
  }

}
</script>

<style lang="scss">
    @import "@/common.scss";
    .v-card{
        width: 260px;
        height: 188px;
        &:nth-child(4n){
            margin-right: 0;
        }
        .m-cover{
            width: 100%;
            height: 140px;
            overflow: hidden;
            border-radius: 5px;
            position: relative;
            box-shadow: 4px -4px 5px #777;
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
            .playCount{
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

            .v-info{
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                padding: 5px 10px;
                color: $white;
                background: rgba($color: $black, $alpha: 0.6);

                .right{
                    float: right;
                }
            }
        }
        .des{
            width: 100%;
            margin: 8px 0 3px;
            font-size: 14px;
            a{
                max-width: 100%;
                @include common-a;
                @include text-wrap(2);
            }
        }
    }
</style>

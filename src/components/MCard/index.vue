<!-- 歌单组件 -->
<template>
  <div class="m-card">
      <div class="m-cover">
          <img v-lazy="sheet.picUrl + '?param=200y200'" :data-src="sheet.picUrl + '?param=20y20'" alt="">
          <router-link :to="{name:'playlist', params: {id: sheet.id}}" />
          <span><Icon type='playFill' size="12"/>{{ formatCount(sheet.playCount) }}</span>
      </div>
      <p class="des">
          <router-link :to="{name:'playlist', params: {id: sheet.id}}">{{ sheet.name }}</router-link>
      </p>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  props: {
    sheet: {
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
    }
  }

}
</script>

<style lang="scss">
    @import "@/common.scss";
    .m-card{
        width: 140px;
        height: 188px;
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
            a{
                max-width: 100%;
                @include common-a;
                @include text-wrap(2);
            }
        }
    }
</style>

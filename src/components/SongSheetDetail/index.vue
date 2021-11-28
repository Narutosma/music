<!-- 歌单详情 -->
<template>
  <div class="song-sheet-detail">
    <div class="song-sheet-title">
        <div class="sheet-cover">
            <img :src="sheet.coverImgUrl + '?param=300y300'" alt="">
        </div>
        <div class="sheet-info">
            <p class="info-title">
                {{ sheet.name }}
            </p>
            <div class="info-user">
                <div class="user-avata">
                    <img :src="sheet.creator && sheet.creator.avatarUrl + '?param=35y35'" alt="">
                </div>
                <a href="#" class="user-name">{{sheet.creator &&  sheet.creator.nickname }}</a>
                <div class="create-info">{{formatDate(sheet.createTime)}} 创建</div>
            </div>
            <div class="info-operation">
                <span class="info-btn" @click="shoucangHandle"><Icon :type="subscribed ? 'yishoucang' : 'shoucang'" :size="14"/>{{subscribed?' 已收藏':'收藏'}}({{formatCount(sheet.subscribedCount)}})</span>
                <span class="info-btn"><Icon type='share' :size="14"/>分享({{formatCount(sheet.shareCount)}})</span>
                <span class="info-btn"><Icon type='download' :size="14"/>下载</span>
                <span class="info-btn"><Icon type='comment' :size="14"/>留言({{formatCount(sheet.commentCount)}})</span>
            </div>
            <div class="info-tags">
                标签：<span class="tag" v-for="tag in sheet.tags" :key="tag">{{ tag }}</span>
            </div>
            <p class="info-intorduce">
                介绍：{{ sheet.description }}
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import Icon from '@/components/Icon'
import { collectionSheet } from '@/axios/api'
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
  data () {
    return {
      subscribed: false
    }
  },
  mounted () {
    this.subscribed = this.sheet.subscribed
  },
  methods: {
    formatDate,
    // 数字转换
    formatCount (count) {
      if (count < 10000) return count
      return `${Math.floor(count / 10000)}万`
    },
    async shoucangHandle () {
      // 收藏 1:收藏 2:取消收藏
      await collectionSheet({
        t: this.subscribed ? 2 : 1,
        id: this.sheet.id
      })
      this.subscribed = !this.subscribed
    }
  }
}
</script>

<style lang="scss">
    @import './index.scss';
</style>

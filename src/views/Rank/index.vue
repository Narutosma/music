<!-- 歌单推荐排行页 -->
<template>
  <div class="rank-container">
      <BaseShow :loading="loading">
        <template slot="title">云音乐特色榜</template>
        <div class="sheet-wrap-list">
          <MCard v-for="list in topList.slice(0, 4)" :key="list.id" :sheet="list"/>
        </div>
      </BaseShow>
      <BaseShow>
        <template slot="title">全球媒体榜</template>
        <div class="sheet-wrap-list">
          <MCard v-for="list in topList.slice(4)" :key="list.id" :sheet="list"/>
        </div>
      </BaseShow>
  </div>
</template>

<script>
import BaseShow from '@/components/BaseShow'
import MCard from '@/components/MCard'

import { getTopList } from '@/axios/api'
export default {
  components: {
    BaseShow,
    MCard
  },
  data () {
    return {
      topList: [],
      loading: true
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    async getDate () {
      try {
        const top = await getTopList()
        this.topList = top.list.map(it => {
          return {
            id: it.id,
            name: it.name,
            playCount: it.playCount,
            picUrl: it.coverImgUrl
          }
        })
        // 改变loading
        this.loading = false
      } catch (e) {
        console.log('歌单排行榜数据异常， 加载失败')
      }
    }
  }
}
</script>

<style>

</style>

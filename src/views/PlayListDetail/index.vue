<!-- 歌单音乐详情  -->
<template>
  <transition name="fade" mode="out-in">
    <Loading v-if="loading"/>
    <div v-else class="play-list-container">
        <SongSheetDetail :sheet="songSheet"/>
        <PlayList :songs="songs"/>
    </div>
   </transition>
</template>

<script>
import { getSongSheetDetail } from '@/axios/api.js'
import SongSheetDetail from '@/components/SongSheetDetail'
import PlayList from '@/components/PlayList'
import Loading from '@/components/Loading'

export default {
  components: {
    SongSheetDetail,
    PlayList,
    Loading
  },
  created () {
    // 数据初始化
    this.getData()
  },
  data () {
    return {
      songSheet: [],
      songs: [],
      loading: true
    }
  },
  methods: {
    async getData () {
      // 得到歌单id项
      const { id } = this.$route.params
      try {
        const sheet = await getSongSheetDetail(id)
        this.songSheet = sheet.playlist
        console.log(this.songSheet)
        this.songs = this.songSheet.tracks.map(it => {
          return {
            id: it.id,
            name: it.name,
            arId: it.ar[0].id,
            arName: it.ar[0].name,
            alId: it.al.id,
            alName: it.al.name,
            picUrl: it.al.picUrl,
            dt: it.dt
          }
        })
        this.loading = false
      } catch (e) {
        console.log('歌单数据异常， 加载失败')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/common.scss';
    .play-list-container{
        margin: 15px 0;
        padding: 25px;
        border-radius: 5px;
        background: $white;
        font-size: 12px;
    }
    a{
      @include common-a;
    }
</style>

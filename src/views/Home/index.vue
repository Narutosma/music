<!-- 推荐页 -->
<template>
  <div class="home-container">
      <BaseShow :loading="sheetLoading">
        <template slot="title">推荐歌单</template>
        <div class="sheet-wrap-list">
          <MCard v-for="song in recommendSongSheet" :key="song.id" :sheet="song"/>
        </div>
      </BaseShow>
      <BaseShow :loading="songsLoading">
        <template slot="title">推荐新歌曲</template>
        <div class="singer-wrap-list">
          <NCard v-for="(song, i) in recommendNewSongs" :key="song.id" :songs="recommendNewSongs" :song="song" :index="i"/>
        </div>
      </BaseShow>
      <BaseShow :loading="singerLoading">
        <template slot="title">推荐歌手</template>
        <div class="singer-wrap-list">
          <SCard v-for="singer in recommendSinger" :key="singer.id" :singer="singer"/>
        </div>
      </BaseShow>
  </div>
</template>

<script>
import BaseShow from '@/components/BaseShow'
import SCard from '@/components/SCard'
import NCard from '@/components/NCard'
import MCard from '@/components/MCard'

// API
import { getRecommendNewSongs, getRecommendSinger, getRecommendSongSheet } from '@/axios/api'
export default {
  components: {
    BaseShow,
    SCard,
    NCard,
    MCard
  },
  data () {
    return {
      recommendNewSongs: [], // 推荐新歌
      recommendSinger: [], // 推荐歌手
      recommendSongSheet: [], // 推荐歌单
      songsLoading: true, // 推荐歌曲loading
      singerLoading: true, // 推荐歌手loading
      sheetLoading: true // 推荐歌单loading
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 数据初始化
    init () {
      // 获取数据
      this.getSongSheet() // 获取歌单
      this.getSongsData() // 获取歌曲
      this.getSingerData() // 获取歌手
    },
    // 推荐新歌
    async getSongsData () {
      try {
        let songs = await getRecommendNewSongs()
        // 数据太多了， 保存几个刚好能用上的
        songs = songs.result.map(it => {
          return {
            id: it.id,
            songName: it.name,
            songPic: it.picUrl,
            singer: it.song.artists[0].name,
            singerId: it.song.artists[0].id,
            album: it.song.album.name,
            albumId: it.song.album.id,
            duration: it.song.duration
          }
        })
        this.recommendNewSongs = songs
        this.songsLoading = false
      } catch (e) {
        console.log('推荐新歌曲数据异常， 加载失败')
      }
    },
    // 推荐歌手
    async getSingerData () {
      try {
        const singers = await getRecommendSinger()
        this.recommendSinger = singers.artists
        this.singerLoading = false
      } catch (e) {
        console.log('推荐歌手数据异常， 加载失败')
      }
    },
    // 推荐歌单
    async getSongSheet () {
      try {
        const songs = await getRecommendSongSheet()
        this.recommendSongSheet = songs.result
        this.sheetLoading = false
      } catch (e) {
        console.log('推荐歌单数据异常， 加载失败')
      }
    }
  }
}
</script>

<style lang="scss">
</style>

<!-- 搜索页面 -->
<template>
  <div class="search-page-container">
    <div class="search-page-banner">
      <input type="text" v-model="key">
    </div>
    <div class="search-page-content">
      <div class="search-result">
        <h4>搜索结果</h4>
        <span :class="{'active': type === 1}" @click="changeActive(1)">单曲</span>
        <span :class="{'active': type === 10}" @click="changeActive(10)">专辑</span>
        <span :class="{'active': type === 100}" @click="changeActive(100)">歌手</span>
        <span :class="{'active': type === 1000}" @click="changeActive(1000)">歌单</span>
        <span :class="{'active': type === 1004}" @click="changeActive(1004)">MV</span>
      </div>
      <div class="search-result-item">
        <transition-group name="fade" mode="out-in">
          <PlayList v-if="type === 1" key="songs" :songs="playList"/>
          <Albums v-else-if="type === 10" key="album" :albums="albums"/>
          <Singer v-else-if="type === 100" key="singer" :singers="singers"/>
          <Sheet v-else-if="type === 1000" key="sheet" :sheets="sheets"/>
          <Mv v-else-if="type === 1004" key="mv" :mvs="mvs"/>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from '@/axios/api'
import PlayList from '@/components/PlayList'
import Singer from './components/Singer.vue'
import Albums from './components/Albums.vue'
import Mv from './components/Mv.vue'
import Sheet from './components/Sheet.vue'
export default {
  components: {
    PlayList,
    Singer,
    Albums,
    Mv,
    Sheet
  },
  mounted () {
    // console.log(this.$route)
    this.key = this.$route.query.key
    // 如果搜索值没有的话就不需要调用
    if (!this.key) return null
    // 进入该页面的时候调用g
    this.getSearchResult()
  },
  data () {
    return {
      key: '',
      type: 1, // 1: 单曲   10: 专辑   100: 歌手   1000: 歌单   MV: 1004
      playList: [],
      singers: [],
      albums: [],
      mvs: [],
      sheets: []
    }
  },
  computed: {
    // 关键字搜索
  },
  methods: {
    // 改变选中样式
    changeActive (val) {
      this.type = val
      this.getSearchResult()
    },
    // 获取选中项得到的内容
    async getSearchResult () {
      const res = await getSearchResult(this.key, this.type)
      switch (this.type) {
        // 单曲
        case 1:
          this.playList = res.result.songs.map(it => {
            return {
              id: it.id,
              // picUrl: '',
              name: it.name,
              arId: it.artists[0].id,
              arName: it.artists[0].name,
              alId: it.album.id,
              alName: it.album.name,
              dt: it.duration
            }
          })
          break
        // 专辑
        case 10:
          this.albums = res.result.albums
          console.log(this.albums)
          break
        case 100:
          this.singers = res.result.artists
          break
        case 1000:
          this.sheets = res.result.playlists.map(it => {
            return {
              id: it.id,
              playCount: it.playCount,
              name: it.name,
              picUrl: it.coverImgUrl
            }
          })
          break
        case 1004:
          this.mvs = res.result.mvs
          break
        default:
          console.log('都没有匹配到')
      }
    }
  }

}
</script>

<style lang="scss">
@import "@/common.scss";
.search-page-container{
  .search-page-banner{
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    height: 300px;
    background:url('../../assets/images/personal.jpg');
    background-size: cover;
    background-position: top;
    background-attachment: fixed;
    input{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 34px;
      outline: none;
      padding: 0 8px;
    }
  }
  .search-page-content{
    background: $white;
    margin-top: 300px;
    padding: 30px 10px;
    .search-result{
      display: flex;
      span {
        margin-left: 12px;
        font-size: 12px;
        cursor: pointer;
        &.active{
          border-bottom: 2px solid $red;
        }
      }
    }
  }
}
</style>

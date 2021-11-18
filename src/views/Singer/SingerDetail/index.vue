<!-- 歌手详情页 -->
<template>
  <div class="singer-detail-container">
    <transition name="fade" mode="out-in">
      <Loading v-if="loading"/>
      <div v-else>
        <div class="singer-info">
        <div class="singer-top-mask">
            <div class="singer-avatar">
                <img :src="singer.picUrl + '?param=100y100'" alt="">
            </div>
            <span class="singer-name">
                {{ singer.name }}
            </span>
            <div class="singer-follow btn">
                +关注TA
            </div>
            <p class="singer-introduce">
                {{ singer.briefDesc }}
            </p>
            <div class="singer-songs-info">
                <div class="sing-word">
                    <span><a href="#">{{ singer.musicSize }}</a></span>
                    <span class="intro">单曲数</span>
                </div>
                <div class="sing-word">
                    <span><a href="#">{{ singer.albumSize }}</a></span>
                    <span class="intro">专辑数</span>
                </div>
                <div class="sing-word">
                    <span><a href="#">{{ singer.mvSize }}</a></span>
                    <span class="intro">MV数</span>
                </div>
                <div class="sing-word">
                    <span><a href="#">12</a></span>
                    <span class="intro">粉丝数</span>
                </div>
            </div>
        </div>
      </div>
      <div class="singer-content">
        <div class="singer-detail-taglist">
            <span @click="handle('songs')" :class="{'active': active === 'songs'}">作品</span>
            <span @click="handle('albums')" :class="{'active': active === 'albums'}">专辑</span>
            <span @click="handle('mv')" :class="{'active': active === 'mv'}">MV</span>
            <span @click="handle('detail')" :class="{'active': active === 'detail'}">歌手详情</span>
            <span @click="handle('same')" :class="{'active': active === 'same'}">相似歌手</span>
        </div>
        <div class="detail-content">
          <transition-group name="fade" mode="out-in">
            <PlayList v-if="active === 'songs'" key="songs" :songs="songs"/>
            <Alubms  v-else-if="active === 'albums'" key="albums" :albums="albums"/>
            <Mv v-else-if="active === 'mv'" key="mvs" :mvs="mvs"/>
            <Detail v-else-if="active === 'detail'" key="desc" :desc="desc"/>
            <SameSinger v-else-if="active === 'same'" key="same" :same="same"/>
          </transition-group>
        </div>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PlayList from '@/components/PlayList'
import Alubms from '../components/Albums'
import Mv from '../components/Mv'
import Detail from '../components/Detail'
import SameSinger from '../components/SameSinger'
import Loading from '@/components/Loading'
import { getSingerSongs, getSingerAlubms, getSingerMV, getSingerDetail, getSameSinger } from '@/axios/api'
export default {
  components: {
    PlayList,
    Alubms,
    Mv,
    Detail,
    SameSinger,
    Loading
  },
  created () {
    this.init()
  },
  data () {
    return {
      active: 'songs', // 当前选择
      singer: {}, // 歌手基本信息
      songs: [], // 歌手单曲
      albums: [], // 歌手专辑
      mvs: [], // mv
      desc: {}, // 歌手描述
      same: [], // 相似歌手
      loading: true // 加载
    }
  },
  methods: {
    // 数据初始化
    init () {
      const { id } = this.$route.params
      this.getSingerDesc(id)
      this.getSingerSongs(id)
      this.getAlubms(id)
      this.getSame(id)
      this.getMv(id)
      this.loading = false
    },
    async getSingerDesc (id) {
      // 获取歌手描述
      try {
        const descRes = await getSingerDetail(id)
        if (descRes.code === 200) {
          this.desc = {
            name: this.singer.name,
            introduction: descRes.introduction,
            briefDesc: descRes.briefDesc
          }
        }
      } catch (e) {
        console.log('歌手描述数据异常， 加载失败')
      }
    },
    // 获取到singer的热门单曲
    async getSingerSongs (id) {
      try {
        const singerRes = await getSingerSongs(id)
        if (singerRes.code === 200) {
          const { artist, hotSongs } = singerRes
          // 歌手基本信息
          this.singer = artist
          // 热门单曲
          this.songs = hotSongs.map(it => {
            return {
              id: it.id,
              name: it.name,
              arId: it.ar[0].id,
              arName: it.ar[0].name,
              alId: it.al.id,
              alName: it.al.name,
              alia: it.alia[0],
              dt: it.dt
            }
          })
        }
      } catch (e) {
        console.log('歌手热门单曲数据异常， 加载失败')
      }
    },
    async getAlubms (id) {
      // 获取到singer的专辑
      try {
        const alumbRes = await getSingerAlubms(id)
        if (alumbRes.code === 200) {
          const { hotAlbums } = alumbRes
          this.albums = hotAlbums
        }
      } catch (e) {
        console.log('歌手专辑数据异常， 加载失败')
      }
    },
    async getSame (id) {
      // 获取相似歌手
      try {
        const sameRes = await getSameSinger(id)
        if (sameRes.code === 200) {
          this.same = sameRes.artists
        }
      } catch (e) {
        console.log('相似歌手数据异常， 加载失败')
      }
    },
    async getMv (id) {
      // 获取singer的mv
      try {
        const mvRes = await getSingerMV(id)
        if (mvRes.code === 200) {
          const { mvs } = mvRes
          this.mvs = mvs.map(it => {
            return {
              id: it.id,
              cover: it.imgurl,
              artistName: it.artistName,
              playCount: it.playCount,
              duration: it.duration,
              name: it.name
            }
          })
        }
      } catch (e) {
        console.log('歌手mv数据异常， 加载失败')
      }
    },
    handle (val) {
      this.active = val
    }
  },
  watch: {
    $route () {
      this.init()
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>

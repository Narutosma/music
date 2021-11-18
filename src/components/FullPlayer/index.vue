<!-- 全屏播放器 -->
<template>
  <div class="full-player-container" :class="isFullPlay && 'full-box'">
      <div class="full-player-left">
        <div class="full-cover">
          <img :src="currentSong.picUrl + '?param=400y400'" alt="">
          <div class="cover-btn" :class="playing && 'playing'">
            <Icon @input="setPlaying" :value="playing"  :type="playing?'playFull':'playFill'" :size="playing?'20':'26'" color="#e02433"/>
          </div>
        </div>
        <div class="full-btns">
          <div class="full-btn">
            <Icon type="collect" size="22"/>
          </div>
          <div class="full-btn">
            <Icon type="delete"  size="26"/>
          </div>
          <div class="full-btn">
            <Icon type="downloadFull" size="20"/>
          </div>
          <div class="full-btn" @click="changeSong">
            <Icon type="nextEmpty"  size="22"/>
          </div>
        </div>
      </div>
      <div class="full-player-right">
        <h3>{{ currentSong.name }}</h3>
        <div class="full-song-info">
          <span class="full-info">专辑: <router-link :to="{name: 'albumplaylist', params: {id: currentSong.alId}}">{{ currentSong.alName }}</router-link></span>
          <span class="full-info">歌手: <router-link :to="{name: 'singerdetail', params: {id: currentSong.arId}}">{{ currentSong.arName }}</router-link></span>
          <span class="full-info">来源: <a href="#">我的喜欢</a></span>
        </div>
        <div class="full-song-word" ref="lyric">
          <span class="lyric"
                :class="{'active': lyricIndex === index}"
                v-for="(lyric, key, index) in lyrics"
                :key="key"
              >{{ lyric }}</span>
        </div>
      </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { getSongLyric } from '@/axios/api'
import { mapState } from 'vuex'
export default {
  props: ['current', 'duration'],
  components: {
    Icon
  },
  data () {
    return {
      lyrics: {}, // 歌词
      lyricIndex: 0 // 歌词位置
    }
  },
  computed: {
    ...mapState('player', {
      currentSong: state => state.currentSong,
      playing: state => state.playing,
      isFullPlay: state => state.isFullPlay
    }),
    currentTime () {
      return 1
    },
    id () {
      return this.currentSong.id
    },
    value () {
      return parseInt(this.current)
    }
  },
  watch: {
    id () {
      this.getSongLyricData()
    },
    value () {
      let i = 0
      // 遍历歌词将设置高亮歌词位置
      for (const key in this.lyrics) {
        if (Object.hasOwnProperty.call(this.lyrics, key)) {
          if (+key === this.value) {
            this.lyricIndex = i

            if (i > 5) {
              // 控制滚动条高度到歌词位置
              this.$refs.lyric.scrollTo({ top: 30 * (i - 5), behavior: 'smooth' })
            }
          }
          i++
        }
      }
    }
  },
  mounted () {
    this.getSongLyricData()
  },
  methods: {
    async getSongLyricData () {
      // 获取歌词数据
      const res = await getSongLyric(this.id)
      // 切割时间和歌词
      const reg = /(\[(.+?)\])(.*)/
      // 将字符串切割成数组
      const lyrics = res.lrc.lyric.split('\n')
      const lyrcObj = {}
      for (const key in lyrics) {
        if (Object.hasOwnProperty.call(lyrics, key)) {
          // 将字符串匹配正则
          const item = lyrics[key].match(reg)
          // 如果切割的歌词没有内容就不做任何处理
          if (!item) continue
          // 将时间字符转换成秒数作为对象的键， 歌词作为对象的值
          const temp = item[2].split(':')
          const m = parseInt(temp[0])
          const s = parseInt(temp[1])
          lyrcObj[m * 60 + s] = item[3]
        }
      }
      this.lyrics = lyrcObj
    },
    // 设置是否播放
    setPlaying (value) {
      this.$store.commit({
        type: 'player/setPlaying',
        value
      })
    },
    // 下一首
    changeSong () {
      this.$store.commit({
        type: 'player/changeSong',
        value: 'next'
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/common.scss";
.full-player-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 60px;
  z-index: 1000;
  padding: 20px;
  overflow: hidden;
  background: $white;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: all 0.3s;

  // 全屏播放
  &.full-box{
    transform: scaleY(100%);
  }

  .full-player-left{
    float: left;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 60px 20px;

    .full-cover{
      width: 350px;
      height: 350px;
      // border: 1px solid #ccc;
      margin: 0 auto;
      position: relative;
      border-radius: 5px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }

      .cover-btn{
        width: 60px;
        height: 60px;
        position: absolute;
        top: calc(50% - 30px);
        left: calc(50% - 30px);
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.75;
        transition: all 0.5s;

        &.playing{
          width: 40px;
          height: 40px;
          left: 85%;
          top: 85%;
        }

        .iconfont{
          margin: 0;
        }
      }
    }

    .full-btns{
      margin-top: 80px;
      display: flex;
      justify-content: space-around;

      .full-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background: #f5f5f5;
        cursor: pointer;

        &:hover{
          background: #d5d5d5;
        }

        .iconfont{
          margin: 0;
        }
      }
    }
  }
  .full-player-right{
    float: left;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;

    h3{
      font-size: 24px;
    }
    .full-song-info{
     margin: 10px 0 20px 0;
     .full-info{
       font-size: 14px;
       margin-right: 20px;
       a{
        @include common-a;
        color: $blue;
       }
     }
    }
    .full-song-word{
      height: 80%;
      box-shadow: inset -20px 0px 50px $white;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      color: #525151;
      font-size: 14px;
      transition: all 0.3s;
      .lyric{
        margin: 5px 0;
        &.active{
          color: $black;
          font-size: 16px;
        }
      }
      // 修改滚动条样式
        &::-webkit-scrollbar {
          display: none;
        }
    }
  }
}

</style>

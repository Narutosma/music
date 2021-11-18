<template>
  <div class="music-play-container">
      <div class="avatar">
          <img v-if="currentSong.picUrl" :src="currentSong.picUrl" alt="">
          <div class="avatar-mask" @click="openFull">
            <Icon :class=" isFullPlay && 'full-down'" type="shangla" size="24" color="#fff"/>
          </div>
      </div>
      <div class="music-info">
          <p>{{ currentSong.name }}</p>
          <p>{{ currentSong.arName }}</p>
      </div>
      <div class="btns">
        <span @click="changeSong('prev')"><Icon type="prev" size="30"/></span>
        <span>
          <!-- <Icon v-show="!playing" type="play" size="44"/> -->
          <Icon @input="changePlayBtn" :value="playing"  :type=" playing ? 'suspend': 'play'" size="44" />
        </span>
        <span @click="changeSong('next')"><Icon type="next" size="30"/></span>
      </div>
      <div class="progress">
          <span class="cur-time">{{ current | formatTime }}</span>
          <ProgBar :value="progress" @change="changeProgressActive" @mouseStart="handlerMouse('start')" @mouseEnd="handlerMouse('end')"/>
          <span class="total-time">{{ duration | formatTime  }}</span>
      </div>
      <div class="voice">
        <Icon type="voice" />
        <ProgBar :value="voice" @change="changeVoiceActive"/>
      </div>
      <div class="oper">
        <span @click="changePlayMode"><Icon :type="iconType" size="20"/></span>
        <Icon type="word" size="20"/>
        <div class="listicont" @click="openList">
          <Icon type="list" size="20"/>
          <ul class="song-list" :class="open && 'openlist'">
            <li v-for="(play, i) in playList" :class="play.id === currentSong.id && 'active'" :key="play.id" @click="changeIndex(i)">{{ play.name }}</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import ProgBar from '@/components/ProgBar'
import { timeToMinute } from '@/utils'
import { mapState } from 'vuex'
export default {
  props: ['current', 'duration', 'progress', 'voice'],
  components: {
    Icon,
    ProgBar
  },
  data () {
    return {
      open: false
    }
  },
  filters: {
    // 过滤器
    formatTime (val) {
      const m = Math.floor(val / 60).toString().padStart(2, 0)
      const s = Math.floor(val % 60).toString().padStart(2, 0)
      return `${m}:${s}`
    }
  },
  methods: {
    timeToMinute,
    // 切换播放/暂停按钮
    changePlayBtn (value) {
      this.$store.commit({
        type: 'player/setPlaying',
        value
      })
    },
    // 拖动滚动条改变滚动条状态
    changeProgressActive (e) {
      this.$emit('change', e)
    },
    // 拖动进度条改变声音大小
    changeVoiceActive (e) {
      this.$emit('changeVoice', e)
    },
    // 鼠标按下或者松开
    handlerMouse (val) {
      this.$emit('progUpdata', val)
    },
    // 更换播放模式
    changePlayMode () {
      this.$store.commit('player/changePlayerMode')
    },
    // 歌曲切换
    changeSong (value) {
      this.$store.commit({ type: 'player/changeSong', value })
    },
    // 设置全屏播放
    openFull () {
      this.$store.commit({
        type: 'player/setFullPlayer'
      })
    },
    // 打开音乐列表
    openList () {
      this.open = !this.open
    },
    changeIndex (index) {
      this.$store.commit({
        type: 'player/setCurrentIndex',
        value: index
      })
    }
  },
  computed: {
    ...mapState('player', {
      playing: state => state.playing,
      mode: state => state.mode,
      currentSong: state => state.currentSong,
      isFullPlay: state => state.isFullPlay,
      playList: state => state.playList
    }),
    iconType () {
      switch (this.mode) {
        case 0:
          return 'order'
        case 1:
          return 'random'
        case 2:
          return 'single'
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>

<!-- 音乐播放 -->
<template>
  <div class="player-container">
        <FullPlayer :current="currentTime" :duration="duration"/>
        <MusicPlay :current="currentTime"
                   :duration="duration"
                   :progress="progress"
                   :voice="voice"
                   @changeVoice="changeVoice"
                   @change="changeProgress"
                   @progUpdata="progUpdata"/>
    <audio ref="audio"
           :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"/>
  </div>
</template>

<script>
import MusicPlay from '@/components/MusicPlay'
import FullPlayer from '@/components/FullPlayer'
// import { getCheckMusic } from '@/axios/api'
import { mapState } from 'vuex'
export default {
  components: {
    MusicPlay,
    FullPlayer
  },
  data () {
    return {
      currentTime: 0,
      duration: 0,
      flag: false,
      voice: 0.8,
      isPlay: false
    }
  },
  mounted () {
    // 获取audio标签的dom
    this.audio = this.$refs.audio
    this.audio.play()
    // 设置声音初始化
    this.audio.volume = this.voice

    this.audio.addEventListener('timeupdate', () => {
      // 当鼠标按下或者拖动期间不进行修改当前时间
      if (this.flag) return
      this.currentTime = this.audio.currentTime
    })

    this.audio.addEventListener('canplay', () => {
      this.duration = this.audio.duration
    })

    this.audio.addEventListener('ended', () => {
      console.log('播放完了')
      // 播放结束后看播放状态

      // 顺序播放 0  索引 + 1
      // 随意播放 1  索引+ 1
      if (this.mode === 0 || this.mode === 1) {
        this.$store.commit({ type: 'player/changeSong', value: 'next' })
      }

      // 单曲循环 2  索引不变, 重新播放当前歌曲
      if (this.mode === 2) {
        console.log('单曲循环')
        this.audio.load()
        this.audio.play()
      }
    })
  },
  computed: {
    ...mapState('player', {
      playing: state => state.playing,
      currentSong: state => state.currentSong,
      mode: state => state.mode
    }),
    // 歌曲id
    id () {
      return this.currentSong.id
    },
    // 进度条
    progress () {
      const result = this.currentTime / this.duration
      return isNaN(result) ? 0 : result
    }
  },
  watch: {
    // 监听播放状态
    playing (newVal) {
      this.$nextTick(() => {
        if (newVal) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      })
    },
    id (newVal, oldVal) {
      // this.isPlayMusic()
      if (!oldVal) return
      this.$nextTick(() => {
        this.audio.load()
        this.audio.play()
      })
    }
  },
  methods: {
    // 修改进度条的时候不能直接修改计算属性progress。直接修改他的依赖
    changeProgress (newVal) {
      this.currentTime = newVal * this.duration
    },
    // 控制音乐声音
    changeVoice (newVal) {
      this.audio.volume = newVal
      this.voice = newVal
    },
    // 进度条发生变化时在获取自组件获取鼠标状态
    progUpdata (val) {
      // 当鼠标松开时在更新播放时间
      if (val === 'start') {
        this.flag = true
      } else if (val === 'end') {
        // 放下鼠标才更新当前播放时间
        this.flag = false
        this.audio.currentTime = this.currentTime
      }
    }
    // 判断是否能够播放
    // async isPlayMusic () {
    //   try {
    //     const res = await getCheckMusic(this.id)
    //     this.isPlay = res
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }
}
</script>

<style>

</style>

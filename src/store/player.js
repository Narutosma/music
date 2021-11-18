// 得到播放列表
const getPlayList = (mode, sequentialList) => {
  // 顺序播放
  if (mode === 0) {
    return [...sequentialList]
  } else if (mode === 2) {
    // 单曲循环也不需要打乱顺序
    return [...sequentialList]
  } else if (mode === 1) {
    // 随机播放就需要打乱顺序了
    const newArr = [...sequentialList]
    let i = sequentialList.length
    while (i) {
      const j = Math.floor(Math.random() * i--)
      const temp = newArr[i]
      newArr[i] = sequentialList[j]
      newArr[j] = temp
    }
    return newArr
  }
}
// 播放器的相关数据
export default {
  namespaced: 'player',
  state: {
    isFullPlay: false,
    playing: false, // 播放状态
    sequentialList: [], // 播放顺序列表
    currentIndex: -1, // 播放索引
    mode: 0, // 播放模式： 0：顺序播放， 1：随机播放，2：单曲循环
    playList: [], // 播放列表
    currentSong: {} // 当前播放音乐信息
  },
  getters: {
    // 当前歌曲信息
    // currentSong (state) {
    //   if (state.currentIndex >= 0 && state.currentIndex < state.playList.length) {
    //     return state.playList[state.currentIndex]
    //   } else {
    //     return {}
    //   }
    // }
  },
  mutations: {
    // 点击歌曲
    selectByIndex (state, playload) {
      state.sequentialList = [...playload.songs]
      state.currentIndex = playload.index
      // 修改当前歌曲列表信息
      state.playList = getPlayList(state.mode, state.sequentialList)
      // 根据当前列表获取当前歌曲信息
      state.currentSong = state.sequentialList[state.currentIndex]
      state.currentIndex = state.playList.findIndex(it => it.id === state.currentSong.id)
      state.currentSong = state.playList[state.currentIndex]
      // 播放
      state.playing = true
    },
    // 播放 / 暂停
    setPlaying (state, { value }) {
      console.log('set')
      state.playing = value
    },
    // 设置播放的索引
    // setCurrentIndex (state, { value }) {
    //   state.currentIndex = value
    // },
    // 切换播放模式
    changePlayerMode (state) {
      state.mode = (state.mode + 1) % 3

      // 修改 播放列表的数据
      state.playList = getPlayList(state.mode, state.sequentialList)

      // 修改了播放列表也需要把 播放的索引跟着一起改变
      state.currentIndex = state.playList.findIndex(it => it.id === state.currentSong.id)

      state.currentSong = state.playList[state.currentIndex]
    },
    // 歌曲切换
    changeSong (state, { value }) {
      // 上一首
      if (value === 'prev') {
        state.currentIndex--
      }
      // 下一首
      if (value === 'next') {
        state.currentIndex++
      }
      console.log('ended')
      state.currentSong = state.playList[state.currentIndex]
      state.playing = true
    },
    // 设置是否全屏
    setFullPlayer (state) {
      state.isFullPlay = !state.isFullPlay
    },
    // 歌曲切换index
    setCurrentIndex (state, { value }) {
      console.log(state.currentIndex)
      state.currentIndex = value
      state.currentSong = state.playList[state.currentIndex]
      state.playing = true
    }
  },
  actions: {
  }
}

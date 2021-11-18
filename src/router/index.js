import Vue from 'vue'
import VueRouter from 'vue-router'
// import PlayList from '@/views/PlayListDetail'
// import Rank from '@/views/Rank'
// import SongSheet from '@/views/SongSheet'
// import Singer from '@/views/Singer'
// import MV from '@/views/MV'
// import SingerDetail from '@/views/Singer/SingerDetail'
// import AlbumPlayList from '@/views/AlbumPlayList'
// import MVDetail from '@/views/MV/MVDetail'

Vue.use(VueRouter)

const routes = [
  {
    // 主页面
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    // 排行榜
    path: '/rank',
    name: 'rand',
    component: () => import('@/views/Rank')
  },
  {
    // 歌单
    path: '/songs',
    name: 'songs',
    component: () => import('@/views/SongSheet')
  },
  {
    // 歌手
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/Singer')
  },
  {
    // MV
    path: '/mv',
    name: 'mv',
    component: () => import('@/views/MV')
  },
  {
    // 歌单列表
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('@/views/PlayListDetail')
  },
  {
    // 歌手详情页
    path: '/singer/detail/:id',
    name: 'singerdetail',
    expect: true,
    component: () => import('@/views/Singer/SingerDetail')
  },
  {
    // MV详情页
    path: '/mv/detail/:id',
    name: 'mvdetail',
    component: () => import('@/views/MV/MVDetail')
  },
  {
    // 专辑播放列表
    path: '/albumlist/:id',
    name: 'albumplaylist',
    expect: true,
    component: () => import('@/views/AlbumPlayList')
  },
  {
    // 登陆页面
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    // 我的主页
    path: '/myhome',
    name: 'my',
    component: () => import('@/views/My')
  },
  {
    // 搜索详情
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router

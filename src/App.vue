<template>
  <div id="app">
    <Layout :class="isSearch && 'blur'">
      <template slot="header">
        <Header @setSearch="setSearch"/>
      </template>
       <transition name="fade-transform" mode="out-in">
        <router-view/>
       </transition>
    </Layout>
    <SearchBox v-if="isSearch" @setSearch="setSearch"/>
    <!-- <MusicPlay v-if="currentIndex >= 0"/> -->
      <Player v-if="currentIndex >= 0"/>
  </div>
</template>

<script>
// 布局
import Layout from '@/components/Layout'
// 导航栏组件
import Header from '@/components/Header'
// 音乐播放组件
import Player from './views/Player'
// 搜索栏组件
import SearchBox from './components/SearchBox'
import { mapState } from 'vuex'
export default {
  components: {
    Layout,
    Header,
    Player,
    SearchBox
  },
  data () {
    return {
      isSearch: false
    }
  },
  methods: {
    setSearch (flag) {
      this.isSearch = flag
    }
  },
  computed: {
    ...mapState('player', {
      currentIndex: state => state.currentIndex
    })
  },
  mounted () {
    const account = localStorage.getItem('account')
    const password = localStorage.getItem('password')
    if (account && password) {
      console.log('自动登录')
      this.$store.dispatch({ type: 'login/loging', value: { account, password } })
    }
  }
}
</script>

<style lang="scss">
    // .v-enter,
    // .v-leave-to {
    //   opacity: 0;
    //   transform: translateX(150px);
    // }

    // /* v-enter-active 【入场动画的时间段】 */
    // /* v-leave-active 【离场动画的时间段】 */
    // .v-enter-active,
    // .v-leave-active{
    //   transition: all 0.8s ease;
    // }

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* breadcrumb transition */
// .breadcrumb-enter-active,
// .breadcrumb-leave-active {
//   transition: all .5s;
// }

// .breadcrumb-enter,
// .breadcrumb-leave-active {
//   opacity: 0;
//   transform: translateX(20px);
// }

// .breadcrumb-move {
//   transition: all .5s;
// }

// .breadcrumb-leave-active {
//   position: absolute;
// }

</style>

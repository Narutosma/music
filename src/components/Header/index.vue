<!-- 导航栏组件 -->
<template>
  <div class="header-container">
      <div class="header-wrapper">
        <h1 class="h-logo">
            <!-- <a hidefocus="true" href="#">网易云音乐</a> -->
            <router-link to="/">云音乐</router-link>
        </h1>
        <ul class="h-list">
            <li :class="{'active': activeLink === list.to}" v-for="list of lists" :key="list.id">
                <router-link :to="list.to" href="#">{{list.title}}</router-link>
            </li>
        </ul>
        <div class="h-user">
            <router-link to="login" class="user-login" v-if="userId === -1">登陆</router-link>
            <div v-else class="h-login">
              <img :src="person && person.avatarUrl + '?param=30y30'" alt="">
              <router-link :to="{name: 'my'}" class="u-nickname">{{ person && person.nickname }}</router-link>
              <span @click.stop="handle"><Icon type="xiajiantou"/></span>
              <ul class="h-user-oper" :class="infoShow && 'show'">
                <li>
                  <Icon type="user"/>
                  <router-link :to="{name: 'my'}" href="#">我的主页</router-link>
                </li>
                <li>
                  <Icon type="guanji"/>
                  <a @click="logoutHandle" href="#">退出登陆</a>
                </li>
              </ul>
            </div>
        </div>
        <div class="h-search">
            <!-- <input type="text" placeholder="音乐/视频/电台/用户"> -->
            <span @click="searchHandle"><Icon type="search" :size="24"/></span>
        </div>
      </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { logoutAccount } from '@/axios/user'
import { mapState } from 'vuex'
export default {
  components: {
    Icon
  },
  data () {
    return {
      lists: [{
        id: 1,
        to: '/',
        title: '推荐'
      }, {
        id: 2,
        to: '/rank',
        title: '排行榜'
      }, {
        id: 3,
        to: '/songs',
        title: '歌单'
      }, {
        id: 4,
        to: '/singer',
        title: '歌手'
      }, {
        id: 5,
        to: '/mv',
        title: 'MV'
      }],
      activeLink: '',
      infoShow: false
    }
  },
  mounted () {
    // 点击其他地方也将这个弹框隐藏
    addEventListener('click', () => {
      this.infoShow = false
    })
  },
  computed: {
    ...mapState('login', {
      person: state => state.person,
      userId: state => state.userId
    })
  },
  methods: {
    // 显示或者展示弹框
    handle () {
      this.infoShow = !this.infoShow
    },
    // 退出登陆
    async logoutHandle () {
      const res = await logoutAccount()
      if (res.code === 200) {
        // 将登陆的个人信息置空
        this.$store.commit({
          type: 'login/setPerson',
          value: null
        })
        // id 清除
        this.$store.commit({
          type: 'login/setUserId',
          value: -1
        })
        // 路由跳转到主页
        this.$router.push({
          name: 'home'
        })
      }
    },
    // 打开搜索框
    searchHandle () {
      this.$emit('setSearch', true)
    }
  },
  created () {
    // 初始化选中标签样式
    this.activeLink = '/' + this.$route.path.split('/')[1]
  },
  watch: {
    $route () {
      // 当路由发生改变时修改选中标签样式
      this.activeLink = '/' + this.$route.path.split('/')[1]
    }
  }
}
</script>

<style lang="scss">
    @import "@/common.scss";
    .header-container{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 70px;
        background: $white;
        box-shadow: 0px 0px 10px #999;
    }

    .header-wrapper{
        width: 1100px;
        height: 100%;
        margin: 0 auto;
    }

    .h-logo{
        float: left;
        padding-right: 20px;
        line-height: 70px;
        a{
            color: $black;
            text-decoration: none;
        }
    }

    .h-list{
        float: left;
        list-style: none;
        display: flex;
        height: 100%;

        li{
            height: 100%;
            a{
                width: 100%;
                height: 100%;
                display: block;
                padding: 0 20px;
                box-sizing: border-box;
                text-decoration: none;
                color: $drak;
                line-height: 70px;
                font-size: 14px;
            }

            &.active,
            &:hover{
                a{
                    color: $red;
                }
            }
        }
    }

    .h-user{
        float: right;
        margin: 19px 0 0 20px;
        .user-login{
            @include common-a;
            color: #787878;
            font-size: 12px;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
        .h-login{
          display: flex;
          align-items: center;
          position: relative;
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 12px;
          }
          .u-nickname{
            font-size: 14px;
            line-height: 30px;
            margin-right: 8px;
          }
          .h-user-oper{
            transform: scaleY(0);
            transition: all 0.3s;
            transform-origin: top;
            position: absolute;
            left: 35px;
            top: 35px;
            list-style: none;
            font-size: 12px;
            padding: 8px;
            border-radius: 5px;
            box-sizing: border-box;
            box-shadow: 0 0 4px $gray;
            background: $white;

            &.show{
              transform: scaleY(100%);
            }

            li:nth-last-child(1){
              margin-top: 10px;
            }
          }
        }
    }

    .h-search{
        float: right;
        margin-top: 20px;
    }
</style>

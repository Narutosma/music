<!-- 我的主页 -->
<template>
  <div class="my-container">
    <div class="my-banner" />
    <div class="my-content">
        <div class="my-left">
            <div class="left-banner" :style="{'backgroundImage': `url(${person.backgroundUrl})`}"/>
            <div class="my-info">
                <div class="my-avatar">
                    <img :src="person.avatarUrl" alt="">
                    <span class="my-name">{{ person.nickname }}</span>
                </div>
                <ul class="my-base">
                    <li>等级：{{ person.level }}</li>
                    <li>年龄：{{ birthday }}</li>
                    <li>地区：</li>
                </ul>
                <div class="my-dongtai">
                    <div class="dongtai-item">
                        <span>动态</span>
                        <span>{{ person.eventCount }}</span>
                    </div>
                     <div class="dongtai-item">
                        <span>关注</span>
                        <span>{{ person.follows }}</span>
                    </div>
                     <div class="dongtai-item">
                        <span>粉丝</span>
                        <span>{{ person.followeds }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-middle">
            <div class="my-listen-rank">
                <span>听歌排行({{person.listenSongs}})</span>
                <div class="right-rank">
                    <span :class="+type === 0 && 'active'" @click="changeHandle(0)">最近一周</span>
                    |
                    <span :class="+type === 1 && 'active'" @click="changeHandle(1)">所有时间</span>
                </div>
            </div>
            <PlayList :songs="recordList"/>
        </div>
        <div class="my-right">
            <p class="my-right-title">我创建的歌单({{myPlayList.length}})</p>
            <div class="my-list">
                <PlaySheet v-for="list in myPlayList" :key="list.id" :sheet="list"/>
            </div>
             <p class="my-right-title">我收藏的歌单({{collectionList.length}})</p>
            <div class="my-list">
                <PlaySheet v-for="list in collectionList" :key="list.id" :sheet="list"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import PlayList from '@/components/PlayList'
import PlaySheet from './components/PlaySheet.vue'
import { getUserPlayList, getRecord } from '@/axios/user'
import { mapState } from 'vuex'
export default {
  components: {
    PlayList,
    PlaySheet
  },
  computed: {
    ...mapState('login', {
      person: state => state.person,
      userId: state => state.userId
    }),
    // 听歌排行种类
    type () {
      return this.$route.query.type || 0
    },
    // 将birthday时间戳转换成 xx后-（星座）
    birthday () {
      const date = new Date(this.person.birthday)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      let value = ''
      if (year >= 1960) value = '60后-'
      if (year >= 1970) value = '70后-'
      if (year >= 1980) value = '80后-'
      if (year >= 1990) value = '90后-'
      if (year >= 1995) value = '95后-'
      if (year >= 2000) value = '00后-'
      if ((month === 1 && day >= 20) || (month === 2 && date <= 18)) { value += '水瓶座' }
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) { value += '双鱼座' }
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) { value += '白羊座' }
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) { value += '金牛座' }
      if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) { value += '双子座' }
      if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) { value += '巨蟹座' }
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) { value += '狮子座' }
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) { value += '室女座' }
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) { value += '天秤座' }
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) { value += '天蝎座' }
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) { value += '人马座' }
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) { value += '摩羯座' }
      return value
    }
  },
  data () {
    return {
      myPlayList: [], // 我创建的歌单
      collectionList: [], // 我收藏的歌单
      recordList: [] // 听歌排行
    //   type: 1
    }
  },
  mounted () {
    this.getUserSheet()
    this.getRecordList()
  },
  methods: {
    // 获取我的歌单
    async getUserSheet () {
      try {
        const res = await getUserPlayList(this.userId)
        if (res.code === 200) {
          // 我创建的歌单
          this.myPlayList = res.playlist.filter(it => !it.subscribed).map(it => {
            return {
              id: it.id,
              name: it.name,
              playCount: it.playCount,
              picUrl: it.coverImgUrl
            }
          })
          // 我收藏的歌单
          this.collectionList = res.playlist.filter(it => it.subscribed).map(it => {
            return {
              id: it.id,
              name: it.name,
              playCount: it.playCount,
              picUrl: it.coverImgUrl
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 获取历史播放
    async getRecordList () {
      const res = await getRecord(this.userId, this.type)
      if (res.code === 200) {
        console.log(res)
        if (+this.type === 0) {
          this.recordList = res.allData.map(it => it.song).map(it => {
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
        } else if (+this.type === 1) {
          this.recordList = res.weekData.map(it => it.song).map(it => {
            return {
              id: it.id,
              name: it.name,
              ar: it.ar[0],
              al: it.al,
              alia: it.alia[0],
              dt: it.dt
            }
          })
        }
      }
    },
    // 切换听歌排行
    changeHandle (type) {
      if (this.type === type) return
      this.$router.push({
        name: 'my',
        query: {
          type
        }
      })
      this.getRecordList()
    }
  }

}
</script>

<style lang="scss">
@import "@/common.scss";
.my-banner{
    height: 350px;
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    background-image: url('../../assets/images/personal.jpg');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}

.my-content{
    min-width: 1100px;
    margin-top: 380px;
    display: flex;

    .my-left{
        width: 280px;
        height: 350px;
        border-radius: 5px;
        transform: translateY(-25%);
        background: $white;
        box-shadow: 0 0 5px #888;
        overflow: hidden;

        .left-banner{
            width: 100%;
            height: 120px;
            // background-image: url('http://p1.music.126.net/k5HpXeMB57gzvFRl-JBrFA==/19096317951779739.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            // border-radius: 5px;
            // background-position: top;
        }

        .my-info{
            background: $white;
            padding: 0 30px;
            .my-avatar{
                display: flex;
                // justify-content: center;
                align-items: center;
                font-size: 14px;
                img{
                    transform: translateY(-25%);
                    width: 55px;
                    height: 55px;
                    margin-right: 10px;
                    border-radius: 5px;
                    border: 1px solid $white;
                }
            }
            .my-base{
                list-style: none;
                font-size: 14px;
                li::before{
                    content: "\02022";
                    color: $red;
                    margin-right: 8px;
                }
            }
            .my-dongtai{
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: space-around;
                font-size: 14px;
                color: $gray;
                span{
                    display: block;
                    text-align: center;
                    margin-top: 3px;
                }
            }
        }
    }
    .my-middle{
        border-radius: 5px;
        background: $white;
        margin: 0 15px;
        flex: 1;
        padding: 10px;
        .my-listen-rank{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            border-left: 2px solid $red;
            padding-left: 10px;
            .right-rank{
                span{
                    cursor: pointer;
                    &.active{
                        color: $red;
                    }
                }
            }
        }
    }
    .my-right{
        width: 280px;
        border-radius: 5px;
        background: $white;
        padding: 10px;
        box-sizing: border-box;
        font-size: 12px;
        .my-right-title{
            border-left: 2px solid $red;
            padding-left: 10px;
        }
    }
    .my-list{
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
    }
}
</style>

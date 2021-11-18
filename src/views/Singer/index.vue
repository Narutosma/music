<!-- 歌手页 -->
<template>
  <div class="singer-container">
      <div class="screen">
        <div class="screen-area">
           <span :class="{'select': t.type === +type}" @click="handle('type', t.type)" v-for="t in types" :key="t.id">{{ t.name }}</span>
        </div>
        <div class="screen-area">
            <span :class="{'select': a.type === area}" @click="handle('area', a.type)" v-for="a in areas" :key="a.id">{{ a.name }}</span>
        </div>
        <div class="screen-area">
            <span :class="{'select': word.type === initial}" @click="handle('initial', word.type)" v-for="word in letter" :key="word.id">{{ word.name }}</span>
        </div>
      </div>
      <BaseShow :loading="loading">
        <div class="singer-wrap-list">
          <SCard v-for="singer in singers" :key="singer.id" :singer="singer"/>
        </div>
      </BaseShow>
  </div>
</template>

<script>
import BaseShow from '@/components/BaseShow'
import SCard from '@/components/SCard'
import { getSingerCategory } from '@/axios/api'
export default {
  components: {
    BaseShow,
    SCard
  },
  created () {
    // 获得数据
    this.getData()
  },
  mounted () {
    // 滚动条到底部加载数据
    window.addEventListener('scroll', this.isRefresh)
  },
  destroyed () {
    window.removeEventListener('scroll', this.isRefresh)
  },
  data () {
    return {
      types: [{
        id: 99901,
        name: '全部',
        type: -1
      },
      {
        id: 99902,
        name: '男歌手',
        type: 1
      },
      {
        id: 99903,
        name: '女歌手',
        type: 2
      },
      {
        id: 99904,
        name: '乐队',
        type: 3
      }],
      areas: [{
        id: 99905,
        name: '全部',
        type: -1
      },
      {
        id: 99906,
        name: '华语',
        type: 7
      },
      {
        id: 99907,
        name: '欧美',
        type: 96
      },
      {
        id: 99908,
        name: '日本',
        type: 8
      },
      {
        id: 99909,
        name: '韩国',
        type: 16
      },
      {
        id: 99910,
        name: '其他',
        type: 0
      }],
      letter: [
        {
          id: 99911,
          name: '热门',
          type: -1
        },
        {
          id: 99912,
          name: 'A',
          type: 'A'
        },
        {
          id: 99913,
          name: 'B',
          type: 'B'
        },
        {
          id: 99914,
          name: 'C',
          type: 'C'
        },
        {
          id: 99915,
          name: 'D',
          type: 'D'
        },
        {
          id: 99916,
          name: 'E',
          type: 'E'
        },
        {
          id: 99917,
          name: 'F',
          type: 'F'
        },
        {
          id: 99918,
          name: 'G',
          type: 'G'
        },
        {
          id: 99919,
          name: 'H',
          type: 'H'
        },
        {
          id: 99920,
          name: 'I',
          type: 'I'
        },
        {
          id: 99921,
          name: 'J',
          type: 'J'
        },
        {
          id: 99922,
          name: 'K',
          type: 'K'
        },
        {
          id: 99923,
          name: 'L',
          type: 'L'
        },
        {
          id: 99924,
          name: 'M',
          type: 'M'
        },
        {
          id: 99925,
          name: 'N',
          type: 'N'
        },
        {
          id: 99926,
          name: 'O',
          type: 'O'
        },
        {
          id: 99927,
          name: 'P',
          type: 'P'
        },
        {
          id: 99928,
          name: 'Q',
          type: 'Q'
        },
        {
          id: 99929,
          name: 'R',
          type: 'R'
        },
        {
          id: 99930,
          name: 'S',
          type: 'S'
        },
        {
          id: 99931,
          name: 'T',
          type: 'T'
        },
        {
          id: 99932,
          name: 'U',
          type: 'U'
        },
        {
          id: 99933,
          name: 'V',
          type: 'V'
        },
        {
          id: 99934,
          name: 'W',
          type: 'W'
        },
        {
          id: 99935,
          name: 'X',
          type: 'X'
        },
        {
          id: 99936,
          name: 'Y',
          type: 'Y'
        },
        {
          id: 99937,
          name: 'Z',
          type: 'Z'
        }
      ],
      singers: [],
      limit: 50, //
      // 当前页码
      curPage: 1,
      loading: true, // loading
      more: false, // 是否能加载更多
      isRefreshBool: true // 限制游览器达到底部时多次加载数据
    }
  },
  computed: {
    // 性别分类
    type () {
      return +this.$route.query.type || -1
    },
    // 地区分类
    area () {
      // 这里有个小坑， 其他 的type为0， 所以会一直选不到其他这个选项
      if (this.$route.query.area === 0 || this.$route.query.area) {
        return +this.$route.query.area
      } else {
        return -1
      }
    },
    // 字母分类
    initial () {
      // 因为从路由上获取下来的是字符串， 转换也需要考虑其他的字母， 所以单独处理
      if (this.$route.query.initial === '-1') return -1
      else return this.$route.query.initial || -1
    },
    params () {
      return {
        type: this.type,
        area: this.area,
        initial: this.initial
      }
    },
    // 总页码
    offset () {
      return (this.curPage - 1) * this.limit
    }
  },
  methods: {
    async getData () {
      try {
        const singer = await getSingerCategory(this.type, this.area, this.initial, this.offset, this.limit)
        this.singers = this.singers.concat(singer.artists)
        this.more = singer.more
        this.loading = false
        this.isRefreshBool = true
      } catch (e) {
        console.log('歌手数据异常， 加载失败')
      }
    },
    handle (type, val) {
      this.params[type] = val
      if (this[type] === val) return
      // 获取数据时加载显示loading
      this.loading = true
      // 根据导航栏的参数来切换分类
      this.$router.push({
        name: 'singer',
        query: {
          ...this.params
        }
      })
      this.singers = []
      this.getData()
    },
    // 滚动条达到底部增加数据
    isRefresh () {
      // 滚动条总高度
      const height = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条的top值
      const top = document.documentElement.scrollTop || document.body.scrollTop
      // 当前游览器窗口大小
      const client = document.documentElement.clientHeight || document.body.clientHeight
      if (top + client >= height - 50 && this.isRefreshBool && this.more) {
        this.isRefreshBool = false
        this.curPage += 1 // 页码增加
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/common.scss";
    .singer-container{
        margin: 20px 0;
        font-size: 12px;
    }

    .screen{
      margin: 30px 0;
    }

    .screen-area{
        margin-bottom: 15px;

        span{
            margin-right: 8px;
            padding: 2px 12px;
            border-radius: 20px;
            background: #e2e2e2;
            cursor: pointer;
            &.select{
                background: $red;
                color: $white;
            }
        }
    }
</style>

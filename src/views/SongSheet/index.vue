<!-- 歌单视图 -->
<template>
  <div class="song-sheet-container">
    <div class="tags">
        <div class="tag-select">
          <span @click="toggleTags" class="all">{{ cat }}<Icon type="down" class="down" :class="{'active': toggle}"/></span>
          <ul class="all-tags"  :class="{'show': toggle}">
            <li class="category-tag" v-for="category in allTags" :key="category.name">
              <p>
                <template v-if="category.name === '语种'"><Icon type="language" size='14'/></template>
                <template v-else-if="category.name === '风格'"><Icon type="style" size='14'/></template>
                <template v-else-if="category.name === '场景'"><Icon type="coffee" size='14'/></template>
                <template v-else-if="category.name === '情感'"><Icon type="emotion" size='14'/></template>
                <template v-else-if="category.name === '主题'"><Icon type="theme" size='14'/></template>{{ category.name }}</p>
              <div class="ts">
                <span :class="{'active': tag.name === cat}" v-for="tag in category.tags" :key="tag.name"  @click="changeTag(tag.name)">{{ tag.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      <div class="m-t">
          <span class="hot">热门标签:</span>
          <ul class="tag-list">
              <li v-for="tag in hotCategory" :key="tag.id" @click="changeTag(tag.name)"><a href="#">{{ tag.name }}</a></li>
          </ul>
          <div class="right-tag">
              <span class="btn" :class="{'active': order === 'hot'}" @click="changeOrder('hot')">最热</span>
              <span class="btn" :class="{'active': order === 'new'}" @click="changeOrder('new')">最新</span>
          </div>
      </div>
    </div>
    <BaseShow :loading="loading">
      <div class="sheet-wrap-list">
        <MCard v-for="sheet in songsSheet" :key="sheet.id" :sheet="sheet"/>
      </div>
    </BaseShow>
  </div>
</template>

<script>
import { getHotSongsCategory, getSongsSheetCategory, getAllCategory } from '@/axios/api'
import BaseShow from '@/components/BaseShow'
import MCard from '@/components/MCard'
import Icon from '@/components/Icon'
export default {
  components: {
    BaseShow,
    MCard,
    Icon
  },
  created () {
    // 数据初始化
    this.init()
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
      hotCategory: [], // 热门分类
      songsSheet: [], // 歌单
      allTags: [], // 所有标签
      toggle: false, // 显示/隐藏分类框
      order: 'hot', // 最热/最新 选项
      limit: 30,
      curPage: 1,
      more: false, // 是否还能加载更多
      loading: false, // loading
      isRefreshBool: true // 限制游览器达到底部时多次加载数据
    }
  },
  computed: {
    cat () {
      return this.$route.query.cut || '全部'
    },
    offset () {
      return (this.curPage - 1) * this.limit
    }
  },
  methods: {
    // 数据初始化
    init () {
      this.getHotCategory() // 获取热门分类
      this.getSongsSheet() // 获取歌单列表
      this.getAllCategory() // 获取所有分类
    },
    // 获取热门分类标签
    async getHotCategory () {
      try {
        const hot = await getHotSongsCategory()
        this.hotCategory = hot.tags
      } catch (e) {
        console.log('热门分类数据异常， 加载失败')
      }
    },
    // 获取所有分类标签
    async getAllCategory () {
      try {
        const all = await getAllCategory()
        const allTags = []
        // 将分类和标签怼到一个数组里面
        for (const category in all.categories) {
          const obj = {}
          obj.name = all.categories[category]
          obj.tags = all.sub.filter(it => it.category === +category)
          allTags.push(obj)
        }
        this.allTags = allTags
      } catch (e) {
        console.log('所有分类标签数据异常， 加载失败')
      }
    },
    // 获取分类歌单
    async getSongsSheet () {
      try {
        const res = await getSongsSheetCategory(this.order, this.cat, this.offset, this.limit)
        this.more = res.more
        const sheet = res.playlists.map(it => {
          return {
            id: it.id,
            name: it.name,
            playCount: it.playCount,
            picUrl: it.coverImgUrl
          }
        })
        this.songsSheet = this.songsSheet.concat(sheet)
        this.loading = false
        this.isRefreshBool = true
      } catch (e) {
        console.log('分类歌单数据异常， 加载失败')
      }
    },
    // 显示/隐藏全部标签栏
    toggleTags () {
      this.toggle = !this.toggle
    },
    // 修改最热/最新
    changeOrder (sel) {
      if (this.order === sel) return
      this.order = sel
      this.songsSheet = []
      this.getSongsSheet()
    },
    // 修改标签
    changeTag (val) {
      // 点击相同的标签不做任何处理
      if (this.cat === val) return
      this.loading = true
      this.$router.push({
        name: 'songs',
        query: {
          cut: val
        }
      })
      this.toggle = false
      this.songsSheet = []
      this.getSongsSheet()
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
        this.getSongsSheet()
      }
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>

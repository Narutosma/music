<!-- MV -->
<template>
  <div class="mv-container">
      <div class="mv-screen">
        <div class="screen-area">
            <span :class="{'select': a.type === area}" @click="handle('area' ,a.type)" v-for="a in areas" :key="a.id">{{ a.name }}</span>
        </div>
        <div class="screen-area">
           <span :class="{'select': t.type === type}" @click="handle('type', t.type)" v-for="t in types" :key="t.id">{{ t.name }}</span>
        </div>
        <div class="screen-area">
            <span :class="{'select': word.type === order}" @click="handle('order', word.type)" v-for="word in orders" :key="word.id">{{ word.name }}</span>
        </div>
      </div>
      <BaseShow :loading="loading">
        <div class="mv-wrap-list">
          <VCard v-for="mv in allMV" :key="mv.id" :mv="mv"/>
        </div>
      </BaseShow>
      <Page :total="total" :curPage="curPage" :changePage="changePage"/>
  </div>
</template>

<script>
import BaseShow from '@/components/BaseShow'
import VCard from '@/components/VCard'
import { getAllMV } from '@/axios/api'
import Page from '@/components/Page'
export default {
  components: {
    BaseShow,
    VCard,
    Page
  },
  data () {
    return {
      areas: [{
        id: 10086,
        type: '',
        name: '全部'
      },
      {
        id: 10087,
        type: '内地',
        name: '内地'
      },
      {
        id: 10088,
        type: '港台',
        name: '港台'
      },
      {
        id: 10089,
        type: '欧美',
        name: '欧美'
      },
      {
        id: 10090,
        type: '日本',
        name: '日本'
      },
      {
        id: 10091,
        type: '韩国',
        name: '韩国'
      }],
      types: [{
        id: 10092,
        type: '',
        name: '全部'
      },
      {
        id: 10093,
        type: '官方版',
        name: '官方版'
      },
      {
        id: 10094,
        type: '原生',
        name: '原生'
      },
      {
        id: 10095,
        type: '现场版',
        name: '现场版'
      },
      {
        id: 10096,
        type: '网易出品',
        name: '网易出品'
      }],
      orders: [{
        id: 10097,
        type: '',
        name: '上升'
      },
      {
        id: 10098,
        type: '最热',
        name: '最热'
      },
      {
        id: 10099,
        type: '最新',
        name: '最新'
      }],
      allMV: [],
      total: 0, // 总页码
      limit: 48, // 每页数量
      loading: true
    }
  },
  computed: {
    area () {
      return this.$route.query.area || ''
    },
    type () {
      return this.$route.query.type || ''
    },
    order () {
      return this.$route.query.order || ''
    },
    // 获得当前的分类选项
    params () {
      return {
        area: this.area,
        type: this.type,
        order: this.order
      }
    },
    curPage () {
      return this.$route.query.page || 1
    }, // 当前页码
    offset () {
      return (this.curPage - 1) * this.limit
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      try {
        const all = await getAllMV(this.area, this.type, this.order, this.offset, this.limit)
        this.allMV = all.data
        // 因为这个api再次请求的时候就没有count这个参数了
        this.total = all.count ? Math.ceil(all.count / this.limit) : this.total
        this.loading = false
      } catch (e) {
        console.log('mv数据异常， 加载失败')
      }
    },
    // 修改选择的分类
    handle (type, val) {
      this.params[type] = val
      if (this[type] === val) return
      this.loading = true
      this.$router.push({
        name: 'mv',
        query: {
          ...this.params
        }
      })
      this.getData()
    },
    // 修改页码
    changePage (page) {
      if (page === this.curPage) return
      this.$router.push({
        name: 'mv',
        query: {
          page,
          ...this.params
        }
      })
      this.getData()
    }
  }
}
</script>

<style lang='scss'>
@import '@/common.scss';
.mv-container{
    margin: 30px 0;
    font-size: 12px;
}
.mv-screen{
    margin: 30px 0;
    .screen-area{
    margin-bottom: 15px;
    span{
        margin-right: 12px;
        padding: 2px 12px;
        border-radius: 20px;
        background: #e2e2e2;
        transition: all 0.3s;
        cursor: pointer;
        &.select{
            background: $red;
            color: $white;
        }
    }
}
}

</style>

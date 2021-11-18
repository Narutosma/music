<!-- 分页组件 -->
<template>
  <div class="page-container">
      <span class="ym" @click="handle(curPage - 1)">上一页</span>
       <span class="ym" @click="handle(1)" v-if="minPage !== 1">1</span>
       <span class="ym dian" v-if="minPage !== 1 && minPage !== 2">...</span>
        <a class="ym"
            v-for="i in pages"
            :key="i"
            :class="{'active': i === curPage}"
            @click="handle(i)"
            >{{ i }}</a>
        <span class="ym dian" v-if="maxPage !== total && maxPage !== total - 1">...</span>
        <span class="ym" @click="handle(total)" v-if="maxPage !== total">{{ total }}</span>
      <span class="ym" @click="handle(curPage + 1)">下一页</span>
  </div>
</template>

<script>
export default {
  props: ['curPage', 'total', 'changePage'],
  computed: {
    // 最小边界
    minPage () {
      // 在当前页码小于 5 的时候一直让他显示5个格子
      if (this.curPage < 5) return 1
      // 在当前页码快接近最后一页的时候也让他显示5个格子
      if (this.total - this.curPage < 2) return this.total - 4
      return this.curPage - 2 < 1 ? 1 : this.curPage - 2
    },
    // 最大页码边界
    maxPage () {
      if (this.curPage < 5 && this.total >= 5) return 5
      return this.curPage + 2 > this.total ? this.total : this.curPage + 2
    },
    // 显示的页码
    pages () {
      const arr = []
      for (let i = this.minPage; i <= this.maxPage; ++i) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    // 切换页码
    handle (page) {
      if (page < 1) {
        this.changePage(1)
        return
      }
      if (page > this.total) {
        this.changePage(this.total)
        return
      }

      this.changePage(page)
    }
  }
}
</script>

<style lang="scss">
@import "@/common.scss";
 .ym{
        color: $drak;
        cursor: pointer;
        text-align: center;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #ddd;
        background-image: none;
        // transition: all .2s;
        font-size: 14px;
        min-width: 15px;
        margin: 0 2px;
        padding: 0 10px;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        text-decoration: none;
        &.dian{
            border: none;
            background: transparent;
            cursor: text
        }
        &.active{
            background: $red;
            color: #fff;
            border: 1px solid $red;
        }
        &.disable{
            cursor: not-allowed;
            color: $gray;
        }
    }

    // 取消双击选中字体
    div{
        -moz-user-select:none;/*火狐*/
        -webkit-user-select:none;/*webkit浏览器*/
        -ms-user-select:none;/*IE10*/
        -khtml-user-select:none;/*早期浏览器*/
        user-select:none;
    }
</style>

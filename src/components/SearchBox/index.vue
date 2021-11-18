<!-- 搜索框板块 -->
<template>
  <div class="search-box-container">
      <div class="search-box">
        <div class="search-input">
            <input v-model="keyWord" type="text" placeholder="请输入关键字进行搜索">
        </div>
        <div class="search-other">
            <div class="search-list-wrap" v-if="historySearch">
                <h3>历史记录<span class="search-history-clean" @click="cleanHandle">清空</span></h3>
                <div class="search-list">
                    <span class="search-item btn" v-for="key in historySearch" :key="key.id">
                        {{ key.key }}
                        <Icon type="close" :size="14"/>
                    </span>
                </div>
            </div>
            <div class="search-list-wrap">
                <h3>热门搜索</h3>
                <div class="search-list">
                    <span class="search-item btn" v-for="item in hotSerch" :key="item.first">
                        {{ item.first }}
                    </span>
                </div>
            </div>
        </div>
      </div>
      <div class="search-mask" @click="closeSearch"></div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { getHotSearch } from '@/axios/api'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {
    Icon
  },
  data () {
    return {
      hotSerch: [], // 热搜推荐
      historySearch: [], // 搜索的历史记录
      keyWord: '' // 搜索关键字
    }
  },
  mounted () {
    // 按下回车进行搜索
    addEventListener('keydown', this.keyDownSearch)
    // 获取热门搜索
    this.getHotSearchList()

    // 获取搜索历史
    const history = JSON.parse(localStorage.getItem('historySearch'))
    this.historySearch = history
  },
  destroyed () {
    removeEventListener('keydown', this.keyDownSearch)
  },
  methods: {
    // 获取热搜列表
    async getHotSearchList () {
      const res = await getHotSearch()
      if (res.code === 200) {
        this.hotSerch = res.result.hots
      }
    },
    // 获取到搜索到的数据
    // async getSearchData (key) {
    //   const res = await getSearchResult(key)
    //   console.log(res)
    // },
    // 回车搜索
    keyDownSearch (e) {
      if (e.key === 'Enter') {
        const key = this.keyWord.trim()
        if (!key) return
        // this.getSearchData(key)
        if (!localStorage.getItem('historySearch')) {
          // 不存在就新增
          localStorage.setItem('historySearch', JSON.stringify([]))
        }
        // 往里面添加数据
        let historyArr = JSON.parse(localStorage.getItem('historySearch'))
        // 过滤掉重复的搜索值
        historyArr = historyArr.filter(it => {
          return it.key !== key
        })
        // 在数组头部新增数据
        historyArr.unshift({
          id: uuidv4(),
          key
        })
        this.historySearch = historyArr
        // 设置缓冲
        localStorage.setItem('historySearch', JSON.stringify(historyArr))
        this.keyWord = ''
        this.$router.push(`/search?key=${key}`)
        this.$emit('setSearch', false)
      }
    },
    // 清空搜索记录
    cleanHandle () {
      localStorage.removeItem('historySearch')
      this.historySearch = []
    },
    // 关闭搜索框
    closeSearch () {
      this.$emit('setSearch', false)
    }
  }
}
</script>

<style lang="scss">
@import "@/common.scss";
.search-box-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    .search-mask{
      height: 100%;
    }
    .search-box{
        width: 650px;
        height: 400px;
        box-shadow: 0 0 4px #000;
        position: absolute;
        left: calc(50% - 325px);
        top: calc(50% - 200px);
    }

    .search-input{
        width: 100%;
        height: 150px;
        background-image: url('../../assets/images/personal.jpg');
        background-size: cover;
        position: relative;
        &::after{
            position: absolute;
            top: 0;
            content: "";
            display: block;
            width: 100%;
            height: inherit;
            background: inherit;
            filter: blur(2px);
        }
        input{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            outline: none;
            width: 85%;
            height: 34px;
            padding: 0 12px;
            font-size: 14px;
            z-index: 1;
            border-radius: 5px;
            border: none;
            background: rgba(255, 255, 255, 0.2);
            color: $white;
            text-align: center;
            &::placeholder{
                color: #f0f0f0;
            }
        }
    }

    .search-other{
        background: $white;
        height: 250px;
        padding: 15px 30px;
        box-sizing: border-box;
        .search-list-wrap{
            margin-bottom: 40px;
            h3{
                font-size: 14px;
                .search-history-clean{
                    font-weight: 400;
                    float: right;
                    font-size: 12px;
                    cursor: pointer;
                    color: $red;
                }
            }
        }
        .search-list{
            display: flex;
            flex-wrap: wrap;
            font-size: 12px;
            .search-item{
                //
                padding: 2px 8px;
                background: #e2e2e2;
                border-radius: 4px;
                margin: 8px 8px 0 0;
                color: $drak;
                cursor: pointer;
            }
        }
    }
}
</style>

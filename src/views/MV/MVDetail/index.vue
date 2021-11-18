<!-- mv详情页 -->
<template>
  <transition name="fade" mode="out-in">
    <Loading v-if="loading"/>
    <div v-else  class="mv-detail">
      <div class="mv-detail-left">
      <div class="mv-video">
        <div class="video-content">
          <span v-if="!startPlay" class="video-play" @click="startMvPlayHandle"><Icon type="playFill" size="32"/></span>
          <img v-if="!startPlay" :src="mvDetail.cover + '?param=500y300'" alt="">
          <video ref="video" controls>
            <source :src="mvUrl"/>
          </video>
        </div>
        <div class="video-info">
          <p class="mv-title">{{ mvDetail.name }}</p>
          <p class="mv-tags"><span v-for="tag in mvDetail.videoGroup" :key="tag.id">#{{tag.name}}</span></p>
          <p class="mv-time">发布：{{ mvDetail.publishTime }} 播放次数：{{ mvDetail.playCount }}</p>
          <div class="info-operation">
              <span class="info-btn"><Icon type='shoucang' :size="14"/>{{ mvInfo.likedCount }}</span>
              <span class="info-btn"><Icon type='share' :size="14"/>{{ mvInfo.shareCount }}</span>
              <span class="info-btn"><Icon type='download' :size="14"/>{{ mvInfo.commentCount }}</span>
          </div>
        </div>
      </div>
      </div>
      <div class="mv-detail-right">
        <div class="mv-syno">
          <h4>视频简介</h4>
          <div class="author-info">
            <img :src="mvInfo.avatar + '?param=30y30'" alt="">
            <span>{{ mvDetail.artistName }}</span>
          </div>
          <p class="mv-jj">{{ mvDetail.desc }}</p>
        </div>
        <div class="mv-recommend">
          <h4>相关推荐</h4>
          <div class="mv-recommend-item" v-for="mv in simi" :key="mv.id">
            <div class="video-recommend">
              <router-link class="m-cover" :to="{name: 'mvdetail', params: {id: mv.id}}">
                <img :src="mv.cover + '?param=200y100'" alt="">
              </router-link>
            </div>
            <p>{{ mv.name }}</p>
            <router-link :to="{name: 'singerdetail', params: {id: mv.artistId}}" class="v-author">by {{ mv.artistName }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from '@/components/Loading'
import { getSimiMv, getMvDetailInfo, getMvDetail, getSingerSongs, getMvUrl } from '@/axios/api'
import Icon from '@/components/Icon'
export default {
  components: {
    Icon,
    Loading
  },
  created () {
    this.init()
  },
  mounted () {
    this.video = this.$refs.video
  },
  data () {
    return {
      simi: [], // 相似MV
      mvInfo: {}, // 喜欢 分享 评论数
      mvDetail: {}, // mv详情资料
      loading: true, // 加载动画
      startPlay: false,
      mvUrl: ''
    }
  },
  methods: {
    // 初始化
    init () {
      const { id } = this.$route.params
      this.getMvDetail(id)
      this.getMvInfo(id)
      this.getSimi(id)
    },
    async getMvDetail (id) {
      // 获取mv详情
      try {
        const mvDetailRes = await getMvDetail(id)
        if (mvDetailRes.code === 200) {
          this.mvDetail = mvDetailRes.data
        }
        this.loading = false
      } catch (e) {
        console.log('mv详情数据异常， 加载失败')
      }
    },
    async getMvInfo (id) {
      // 获取mv信息
      try {
        const mvInfoRes = await getMvDetailInfo(id)
        if (mvInfoRes.code === 200) {
          // 获取到用户头像
          const res = await getSingerSongs(this.mvDetail.artistId)
          this.mvInfo = Object.assign({}, mvInfoRes, { avatar: res.artist.picUrl })
        }
      } catch (e) {
        console.log('mv信息数据异常， 加载失败')
      }
    },
    async getSimi (id) {
      // 获取相似mv
      try {
        const SimiRes = await getSimiMv(id)
        if (SimiRes.code === 200) {
          this.simi = SimiRes.mvs
        }
      } catch (e) {
        console.log('相似mv数据异常， 加载失败')
      }
    },
    // 点击开始播放按钮
    async startMvPlayHandle () {
      // 关闭蒙层
      this.startPlay = true
      // 开始加载播放MV
      const { id } = this.$route.params
      const res = await getMvUrl(id)
      if (res.code === 200) {
        this.mvUrl = res.data.url
        this.$refs.video.load()
        this.$refs.video.play()
      }
    }
  },
  watch: {
    $route () {
      this.init()
      this.startPlay = false
    }
  }

}
</script>

<style lang="scss">
@import "@/common.scss";

.mv-detail{
  display: flex;
  max-width: 1100px;
  margin-top: 20px;
  .mv-detail-left{
    flex: 70%;
    padding: 10px;
    background: $white;
    border-radius: 5px;

    .mv-video{
      .video-content{
        width: 100%;
        height: 400px;
        position: relative;

        .video-play{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          color: $red;
          background: $white;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.8;
          cursor: pointer;
        }
        video,
        img{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
        }

        img{
          z-index: 2;
        }
      }
    }

    .video-info{
      margin: 12px 0;
      font-size: 12px;
      .mv-title{
        font-size: 16px;
      }
      .mv-tags{
        color: $red;
        margin: 5px 0;
        span{
          margin-right: 5px;
        }
      }

      .mv-time{
        color: $gray;
      }
    }

    .info-operation{
      margin-top: 5px;
      .info-btn{
          display: inline-block;
          padding: 3px 10px;
          border-radius: 10px;
          margin-right: 8px;
          box-sizing: border-box;
          cursor: pointer;
          background: $background;

          &:hover{
              background: $white;
          }
      }
    }
  }

  .mv-detail-right{
    flex: 29%;
    margin-left: 1%;

    .mv-syno{
      border-radius: 5px;
      background: $white;
      padding: 10px;
      h4{
        padding-left: 8px;
        border-left: 2px solid $red;
        font-size: 14px;
      }

      .author-info{
        margin: 5px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: $gray;
        img{
          margin-right: 3px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .mv-jj{
      font-size: 12px;
      color: $gray;
      line-height: 24px;
      // @include text-wrap(2);
    }
  }

  .mv-recommend{
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    background: $white;
    h4{
      padding-left: 8px;
      border-left: 2px solid $red;
      font-size: 14px;
    }

    .mv-recommend-item{
      .video-recommend{
        width: 100%;
        height: 160px;
        margin-top: 20px;
        border-radius: 5px;
        .m-cover{
          display: block;
          width: 100%;
          height: 100%;
        }
        img{
          border-radius: 5px;
          width: 100%;
          height: 100%;
        }
      }
    }

    p{
      margin-top: 8px;
      font-size: 14px;
    }
    .v-author{
      color: $gray;
      font-size: 12px;
    }
  }
}

</style>

<!-- 专辑 -->
<template>
 <transition name="fade" mode="out-in">
   <Loading v-if="loading"/>
  <div v-else class="mv-playlist-container">
       <div class="song-mv-title">
        <div class="mv-cover">
            <img :src="album.picUrl + '?param=300y300'" alt="">
        </div>
        <div class="mv-info">
            <p class="info-title">
                {{ album.name }}
            </p>
            <div class="info-user">
                <div class="user-avata">
                    <img :src="album.artist && album.artist.picUrl + '?param=35y35'" alt="">
                </div>
                <a href="#" class="user-name">{{album.artist &&  album.artist.name }}</a>
                <div class="create-info">{{formatDate(album.publishTime)}} 创建</div>
            </div>
            <div class="info-tags">
                发行公司：{{ album.company }}
            </div>
             <div class="info-operation">
                <span class="info-btn"><Icon type='shoucang' :size="14"/>收藏</span>
                <span class="info-btn"><Icon type='share' :size="14"/>分享</span>
                <span class="info-btn"><Icon type='download' :size="14"/>下载</span>
                <span class="info-btn"><Icon type='comment' :size="14"/>留言</span>
            </div>
        </div>
    </div>
    <div class="album-introduce">
          <h2>专辑介绍</h2>
          <p>{{ album.description }}</p>
        </div>
        <PlayList :songs="songs"/>
  </div>
   </transition>
</template>

<script>
import { formatDate } from '@/utils'
import Icon from '@/components/Icon'
import PlayList from '@/components/PlayList'
import Loading from '@/components/Loading'
import { getAlbumDetail } from '@/axios/api'
export default {
  components: {
    Icon,
    PlayList,
    Loading
  },
  created () {
    this.getData()
  },
  data () {
    return {
      album: {}, // 专辑信息
      songs: [], // 专辑音乐
      sheet: {},
      loading: true
    }
  },
  methods: {
    formatDate,
    // 数字转换
    formatCount (count) {
      if (count < 10000) return count
      return `${Math.floor(count / 10000)}万`
    },
    async getData () {
      try {
        const { id } = this.$route.params
        const { code, album, songs } = await getAlbumDetail(id)
        if (code === 200) {
          this.album = album
          this.songs = songs.map(it => {
            return {
              id: it.id,
              name: it.name,
              ar: it.ar[0],
              al: it.al,
              alia: it.alia[0],
              dt: it.dt
            }
          })
          this.loading = false
        }
      } catch (e) {
        console.log('专辑数据异常， 加载失败')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/common.scss';
    .mv-playlist-container{
        margin: 15px 0;
        padding: 25px;
        border-radius: 5px;
        background: $white;
        font-size: 12px;

        .album-introduce{
          margin-top: 20px;
          h2{
            font-size: 12px;
          }
          p{
            padding-left: 30px;
            color: $gray;
          }
        }
    }

    .song-mv-title{
        display: flex;

        .mv-cover{
            // padding: 8px;
            width: 200px;
            height: 200px;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }

        .mv-info{
            flex: 1;
            margin-left: 30px;
            // 标题
            .info-title{
                font-size: 20px;
                margin-bottom: 20px
            }
            // 信息
            .info-user{
                @include flex-center(ver);
                margin-bottom: 20px;

                .user-avata{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }

                .user-name{
                    @include common-a;
                    color: $blue;
                    margin: 0 10px;
                }

                .create-info{
                    color: $gray;
                }
            }
        }

        .info-operation{
          margin-top:20px;
          .info-btn{
              display: inline-block;
              border: 1px solid $gray;
              padding: 3px 10px;
              border-radius: 5px;
              margin-right: 8px;
              box-sizing: border-box;
              cursor: pointer;
              background: $background;

              &:hover{
                  background: $white;
              }
          }
        }

        .info-tags{
            .tag{
                display: inline-block;
                padding: 2px 12px;
                border: 1px solid $color;
                border-radius: 12px;
                margin-right: 10px;
                cursor: pointer;
                color: $gray;
                background: $background;
                text-shadow: 0 1px #fdfdfd;

                &:hover{
                    background: $white;
                }
            }
        }

        .info-intorduce{
            line-height: 18px;
            height: 36px;
            @include text-wrap(2);
        }
    }
</style>

<template>
  <div class="play-list-detail-container">
        <div class="play">
          <span @click="playAll"><Icon type="playFill" size="12"/>播放全部</span>
        </div>
        <table cellspacing="0">
          <tr>
            <th style="width: 10%; textAlign: center">序号</th>
            <th style="width: 38%">歌曲</th>
            <th style="width: 24%">歌手</th>
            <th style="width: 18%">专辑</th>
            <th style="width: 10%">时长</th>
          </tr>
          <tr v-for="(song, i) in songs" :key="song.id">
            <td class="frist-item" :class="{'playing': currentSong.id === song.id}">
              <div class="play-icon">
                <div class="line" style="animation-delay: -1.2s;"></div>
                <div class="line"></div>
                <div class="line" style="animation-delay: -1.5s;"></div>
                <div class="line" style="animation-delay: -0.9s;"></div>
                <div class="line" style="animation-delay: -0.6s;"></div>
              </div>
              <span class="play-icon-bofang" @click="songClickHandle(i)"><Icon type="bofang" color="#e02433"/></span>
              <span class="play-num">{{ (i + 1).toString().padStart(2, 0) }}</span>
            </td>
            <td class="pic">
              <img v-if="song.picUrl" :src="song.picUrl + '?param=25y25'" alt="">
              <span class="pic-name play-list-item"  @click="songClickHandle(i)">{{ song.name }}</span>
            </td>
            <td> <router-link class="play-list-item" :to="{name: 'singerdetail', params: {id: song.arId}}">{{ song.arName }}</router-link></td>
            <td> <router-link class="play-list-item" :to="{name: 'albumplaylist', params: {id: song.alId}}">{{ song.alName }}</router-link></td>
            <td>{{ timeToMinute(song.dt) }}</td>
          </tr>
        </table>
      </div>
</template>

<script>
import Icon from '@/components/Icon'
import { timeToMinute } from '@/utils'
import { mapState } from 'vuex'
export default {
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  components: {
    Icon
  },
  computed: {
    ...mapState('player', {
      currentSong: state => state.currentSong
    })
  },
  methods: {
    timeToMinute,
    songClickHandle (i) {
      // 切换歌曲
      this.$store.commit({
        type: 'player/selectByIndex',
        index: i,
        songs: this.songs
      })
    },
    playAll () {
      // 切换歌曲
      this.$store.commit({
        type: 'player/selectByIndex',
        index: 0,
        songs: this.songs
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/common.scss';
     .play-list-detail-container{
      padding: 10px;
      border-radius: 5px;
      background: $white;
    }

    .play{
      text-align: right;
      margin: 20px 0;
      span{
        background: $red;
        color: $white;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: 12px;
        cursor: pointer;

        .iconfont{
          vertical-align: baseline;
        }

        &:hover{
          opacity: 0.9;
        }
      }
    }

    table{
      width: 100%;
      font-size: 12px;

      th{
        color: $gray;
        text-align: left;
      }
      tr{
        height: 40px;
        cursor: pointer;
        .play-icon-bofang{
          display: none;
        }
        &:hover{
          .play-icon-bofang{
            display: block;
          }
          .play-num{
            display: none;
          }
        }
      }

      td.pic{
        img{
          width: 25px;
          height: 25px;
          border-radius: 3px;
          margin-right: 8px;
          float: left;
        }
        .pic-name{
          line-height: 25px;

          &:hover{
            text-decoration: underline;
          }
        }
      }
      .play-list-item{
        @include text-wrap(1);
      }
      th,
      td{
        // &:nth-child(1),
        &:nth-child(5){
          text-align: center;
        }
      }
      td.frist-item{
          text-align: center;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          &.playing{
            .play-icon {
                display: flex;
            }
            .play-num{
                display: none;
            }
            .play-icon-bofang{
              display: none;
            }
          }
        }
      td{
        a{
            // @include text-wrap(1);
            @include common-a;
        }
      }

      tr:nth-child(odd){
        background: #f5f5f5;
      }

      tr:hover{
        background: #f0f0f0;
      }
    }
</style>

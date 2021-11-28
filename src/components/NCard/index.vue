<template>
  <div class="n-card-container">
      <div class="n-card-play" :class="{'playing': currentSong.id === song.id}">
          <div class="play-icon">
            <div class="line" style="animation-delay: -1.2s;"></div>
            <div class="line"></div>
            <div class="line" style="animation-delay: -1.5s;"></div>
            <div class="line" style="animation-delay: -0.9s;"></div>
            <div class="line" style="animation-delay: -0.6s;"></div>
        </div>
        <span class="play-icon-bofang"><Icon type="bofang" color="#e02433"/></span>
        <span class="play-num">{{ (index + 1).toString().padStart(2, 0) }}</span>
      </div>
      <img :src="song.songPic + '?param=50y50'" alt="">
      <div class="song-info">
          <a class="song" @click="songClickHandle(index)">{{ song.songName }}</a>
          <router-link :to="{name: 'singerdetail', params: {id: song.singerId}}" class="sing">{{ song.singer}}</router-link>
      </div>
      <router-link :to="{name: 'albumplaylist', params: {id: song.albumId}}" class="alubm">{{ song.album }}</router-link>
      <div class="song-time">{{ timeToMinute(song.duration) }}</div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { timeToMinute } from '@/utils'
import { mapState } from 'vuex'
export default {
  props: ['song', 'index', 'songs'],
  components: {
    Icon
  },
  methods: {
    timeToMinute,
    songClickHandle (i) {
    //   console.log(this.songs)
    //   console.log(this.songs)
    //   // 切换歌曲
    //   this.$store.commit({
    //     type: 'player/selectByIndex',
    //     index: i,
    //     songs: this.songs
    //   })
    }
  },
  computed: {
    ...mapState('player', {
      currentSong: state => state.currentSong
    })
  }
}
</script>

<style lang="scss">
@import "@/common.scss";
    .n-card-container{
        grid-column-end: span 5;
        width: 530px;
        height: 50px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 5px;
        padding: 5px 20px;
        @include flex-center('ver');
        font-size: 12px;
        box-shadow: 0px 0px 8px #999;

        &:nth-child(2n){
            margin-right: 0;
        }
        &:hover .n-card-play{
            .play-num{
                display: none;
            }
            .play-icon-bofang{
                display: block;
            }
        }

        .n-card-play{
            width: 30px;
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
            .play-icon-bofang{
                display: none;
            }
        }

        img{
            width: 40px;
            height: 40px;
        }

        .song-info{
            margin-left: 20px;
            width: 65px;
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .song{
                font-size: 12px;
                font-weight: 500;
                @include common-a;
                @include text-wrap(1);

            }

            .sing{
                font-size: 12px;
                font-weight: 200;
                @include common-a;
                @include text-wrap(1);
                color: $gray;
            }
        }
        .alubm{
            flex: 1;
            @include common-a;
            @include text-wrap(1);
            text-align: center;
        }
    }

</style>

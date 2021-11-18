<!-- 推荐推单组件 -->
<template>
  <div class="recommend-container">
      <h2>
          <slot name="title"></slot>
      </h2>
      <div class="recommend-wrap">
        <transition name="fade" mode="out-in">
          <Loading v-if="loading"/>
          <slot v-else ></slot>
            <!-- <div class="music-list">
            </div> -->
        </transition>
      </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  props: ['loading'],
  components: {
    Loading
  }
}
</script>

<style>
    h2{
        font-size: 16px;
        margin: 12px 0 !important;
    }
    .recommend-wrap{
        min-height: 200px;
        position: relative;
    }

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  font-size: 30px;
  color: rgba(255, 51, 51, 0.5);
  padding: 1em;
  -webkit-transition: 0.3s color, 0.3s border;
  transition: 0.3s color, 0.3s border;
}
</style>

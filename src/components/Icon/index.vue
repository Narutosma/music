<!-- 图标组件 -->
<template>
  <i class="iconfont"
    :class="types[type]"
    :style="{fontSize: size+'px', color: color}"
    @click="handle"></i>
</template>

<script>
export default {
  props: ['size', 'type', 'value', 'color'],
  data () {
    return {
      types: {
        share: 'icon-fenxiang_2',
        download: 'icon-xiazai',
        shoucang: 'icon-shoucang-yishoucang',
        comment: 'icon-liuyan',
        playFill: 'icon-1_music81',
        prev: 'icon-icon-4',
        next: 'icon-icon-2',
        play: 'icon-icon-1',
        suspend: 'icon-icon-5',
        voice: 'icon-icon-3',
        single: 'icon-icon-6',
        order: 'icon-icon-7',
        random: 'icon-icon-9',
        word: 'icon-geci',
        list: 'icon-yinleliebiao',
        theme: 'icon-zhuti',
        coffee: 'icon-kafei',
        down: 'icon-xiala',
        language: 'icon-yuyan',
        emotion: 'icon-qinggan',
        style: 'icon-fengge',
        bofang: 'icon-bofang',
        shangla: 'icon-shangla',
        nextFull: 'icon-next',
        downloadFull: 'icon-xiazai1',
        delete: 'icon-shanchu',
        playFull: 'icon-bofangzanting',
        collect: 'icon-56aixin',
        fillCollect: 'icon-aixin',
        nextEmpty: 'icon-xiayigexiayishou',
        xiajiantou: 'icon-xiajiantouhui',
        user: 'icon-yonghu',
        guanji: 'icon-guanji1',
        search: 'icon-icon-8',
        close: 'icon-close',
        yishoucang: 'icon-yishoucang'
      }
    }
  },
  methods: {
    handle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
    @import '//at.alicdn.com/t/font_2876380_xvlnrcrm74d.css';
    .iconfont{
      margin-right: 5px;
      vertical-align: text-bottom;
      cursor: pointer;
    }
</style>

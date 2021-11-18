<template>
    <div class="progress-bar" ref="prog">
        <div class="fill-bar" ref="fill"/>
        <div class="dot" ref="dot"/>
    </div>
</template>

<script>
export default {
  props: ['value'],
  watch: {
    value: {
      handler () {
        // 等加载完毕设置值
        this.$nextTick(() => {
          this.$refs.fill.style.width = `${this.maxWidth * this.value}px`
          this.$refs.dot.style.transform = `translate(${this.maxWidth * this.value}px, -60%)`
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.drag()
  },
  methods: {
    drag () {
      this.prog = this.$refs.prog
      this.dot = this.$refs.dot
      this.fill = this.$refs.fill
      this.clickMouse()
      this.moveMouse()
    },
    // 点击改变进度条
    clickMouse () {
      // 进度条最大长度
      const maxWidth = this.prog.offsetWidth - this.dot.offsetWidth
      this.maxWidth = maxWidth
      // 初始化样式
      this.fill.style.width = `${this.maxWidth * this.value}px`
      this.dot.style.transform = `translate(${this.maxWidth * this.value}px, -60%)`

      this.prog.addEventListener('mousedown', e => {
        const offsetX = e.clientX - this.prog.offsetLeft - this.dot.offsetWidth / 2
        this.changeStyle(offsetX)
      })
    },
    moveMouse () {
      // 拖动进度条进度
      this.dot.addEventListener('mousedown', e => {
        // 鼠标按下时
        this.$emit('mouseStart')
        // 按下位置
        const start = e.clientX
        // 初始化位置
        const x = this.maxWidth * this.value
        const moveCallback = e => {
        // 移动距离
          let offsetX = e.clientX - start + x
          if (offsetX < 0) {
            offsetX = 0
          }

          if (offsetX > this.maxWidth) {
            offsetX = this.maxWidth
          }
          this.changeStyle(offsetX)
        }

        const endCallback = () => {
          // 鼠标松开时
          this.$emit('mouseEnd')
          document.removeEventListener('mousemove', moveCallback)
          document.removeEventListener('mouseup', endCallback)
        }
        // 移动进度条事件
        document.addEventListener('mousemove', moveCallback)
        document.addEventListener('mouseup', endCallback)
      })
    },
    // 更改进度条样式
    changeStyle (offsetX) {
      // 设置进度条样式
      this.fill.style.width = `${offsetX}px`
      this.dot.style.transform = `translate(${offsetX}px, -60%)`
      // 修改数据后将初始数据改变为百分比
      const progress = offsetX / this.maxWidth
      this.$emit('input', progress)
      this.$emit('change', progress)
    }
  }
}
</script>

<style lang='scss'>
@import "@/common.scss";
  .progress-bar{
      flex: 1;
      height: 2px;
      background-color: #f0f0f0;
      margin: 0 15px;
      border-radius: 2px;
      cursor: pointer;
    }

  .fill-bar{
    width: 20%;
    background: $red;
    height: 100%;
  }

  .dot{
    width: 5px;
    height: 5px;
    background: $white;
    border-radius: 50%;
    border: 2px solid $red;
    transform: translate(0, -60%);
  }
</style>

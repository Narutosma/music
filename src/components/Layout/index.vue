<!-- 主页布局组件 -->
<template>
  <div class="layout-container">
      <header class="header">
          <slot name="header"></slot>
      </header>
      <div class="main">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
    .layout-container{
        background: #f3f3f3;
        padding: 70px 0;

        &.blur{
            filter: blur(4px);
        }
    }
    .header{
        width: 100%;
        height: 100%;
    }

    .main{
        width: 1100px;
        min-height: 400px;
        height: 100%;
        margin: 0 auto;
    }
</style>

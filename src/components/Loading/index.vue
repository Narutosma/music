<!-- 加载图标 -->
<template>
  <div class="loading-container">
    <div class="loading">
        <div class="loader"></div>
      </div>
  </div>
</template>

<script>
export default {}
</script>

<style>

.loader {
  background: currentcolor;
  position: relative;
  -webkit-animation: loader 1s ease-in-out infinite;
  animation: loader 1s ease-in-out infinite;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  width: 0.25em;
  height: 0.5em;
}

.loader:after,
.loader:before {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  background: inherit;
  -webkit-animation: inherit;
  animation: inherit;
}

.loader:before {
  right: 0.5em;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.loader:after {
  left: 0.5em;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

@-webkit-keyframes loader {
  0%,
  100% {
    box-shadow: 0 0 0 currentcolor, 0 0 0 currentcolor;
  }

  50% {
    box-shadow: 0 -0.25em 0 currentcolor, 0 0.25em 0 currentcolor;
  }
}

@keyframes loader {
  0%,
  100% {
    box-shadow: 0 0 0 currentcolor, 0 0 0 currentcolor;
  }

  50% {
    box-shadow: 0 -0.25em 0 currentcolor, 0 0.25em 0 currentcolor;
  }
}
</style>

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 初始化样式引入
import '@/init.css'

// axios
import '@/axios/instance.js'

// 自定义指令
import Lazy from '@/directives/lazy'
Vue.directive('lazy', Lazy)

// event bus
// mainScroll 当滚动条滑倒底部时候
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

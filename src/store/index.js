import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    player,
    login
  }
})

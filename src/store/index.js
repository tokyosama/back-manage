import Vue from 'vue'
import Vuex from 'vuex'
//  引入简单布尔开关tab,通过 modules直接注入，就不用自己再写state,mutations了
import Tab from './easyBool/tab.js'
import user from './easyBool/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Tab,
    user
  }
})

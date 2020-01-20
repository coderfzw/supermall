import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
//安装插件
Vue.use(Vuex)

// 抽取state
const state = {
  cartList: []
}

//创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
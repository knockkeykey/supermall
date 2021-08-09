import Vue from "vue";
import Vuex from "vuex"
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
// 1. 安装插件
Vue.use(Vuex)

const state = {
  //state 方便在其他组件标记用的是哪个mutations中的方法 在其他组件传入方法名
  cartList: []
}

// 2. 创建Store对象
const store = new Vuex.Store({
  //数据
  state,
  //任务
  mutations,
  //相当于methods?
  actions,
  getters,
})

// 3.挂载Vue实例上
export default store

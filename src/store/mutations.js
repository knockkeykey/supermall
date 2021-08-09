import {
  ADD_COUNTER,
  ADD_TO_COUNTER
} from './mutations-types'


export default {
  //  mutations唯一的目的就是修改state中的状态
  // mutations中每个方法尽可能完成的事件比较单一一点
  //  mutations中就尽量少一点判断逻辑 所以要转移到actions中
  // /* addCart(state, payload) {}*/ ps:是state

  //数量+1
//  为啥要抽成常量??????????
  //方便在以后 要修改这两个东西的名称 会同时一起修改方法名
  /*  addCounter(state, payload){
      payload.count++
    },*/
  [ADD_COUNTER](state, payload) {
    payload.count++
  },

  /*  addToCart(state, payload){
      state.cartList.push(payload)
      // console.log(state.cartList);
    }*/

  [ADD_TO_COUNTER](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
    // console.log(state.cartList);
  }

}

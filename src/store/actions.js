import {
  ADD_COUNTER,
  ADD_TO_COUNTER
} from './mutations-types'


export default  {
  //payload携带一个额外的参数
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload :新添加的商品
      // 数组常用的方法有哪些? push/pop/unshhift/shift/sort/reverse/map/filter/reduce

      //一步查找到了之前数组是否有商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      /*            let oldProduct = null
                  // for循环是判断 cartList购物车里面有没有payload传进来的商品
                  //购物车里面本来就有的化
                  //就 让oldProduct 等于传进来的值 方便以后进行+1
                  for (let item of state.cartList) {
                    if (item.iid == payload.iid) {
                      oldProduct = item
                    }
                  }*/

      // 2. 判断oldProduct
      //如果oldProduct有值的话(也就是传进来的值购物车当中已经有了)就OldProduct对象的count+1
      if (oldProduct) { // 数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      } else { //添加新商品
        //没有的话 就肯定是个新值 ,把它加入到购物车中并且新值队列+1
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_COUNTER,payload)
        resolve('添加了新的商品')
      }

    })
  }
}

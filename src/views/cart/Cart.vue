<template>
  <div class="cart">
    <!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--    商品的列表-->
    <cart-list></cart-list>
    <!--    底部的汇总-->
    <cart-buttom-bar/>
  </div>
</template>

<script>
  //子组件
  import CartList from "./childComps/CartList";
  import CartButtomBar from "./childComps/CartButtomBar";
  //公用组件
  import NavBar from "components/common/navbar/NavBar";
  //其他数据
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtomBar
    },
    computed: {
      // 导入vuex里面的getters方法!!!!!!!!!!!!!!!!!
      //  两种语法
      //1
      /* ...mapGetters(['cartLength', 'cartList'])*/

      //2 就是可以改名字了 用length代替cartLength
      ...mapGetters({
        length: 'cartLength',
      })

    }


  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /*font-weight: 700;*/
  }
</style>

<template>
  <div class="cart-list">
    <!--      scroll 必须要用高度-->
    <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList"
                    :item-info="item"
                    :key="index"/>
    </scroll>
  </div>
</template>

<script>
  //子组件
  import CartListItem from "./CartListItem";
  // 公用数据
  import Scroll from "components/common/scroll/Scroll";
  //其他数据
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>


  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content {
    /*让鼠标不能滚*/
    height: 100%;
    overflow: hidden;
  }
/*  -------------------------*/











</style>

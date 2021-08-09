<template>
  <div class="bottom-bar">
    <!--    左-->
    <div class="bar-left">
      <!--      客服-->
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <!--      店铺-->
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <!--      收藏-->
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <!--    右-->
    <div class="bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>

  .bottom-bar {
    height: 49px;
    background-color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;

    /*    !*  方法二定位 因为detail组件的content组件没有用z-index 这就不用 他俩平行*!
        position: relative;
        bottom: 49px;*/
  }


  .bar-left {
    display: flex;
    flex: 0.5;
  }

  .bar-right {
    display: flex;
    flex: 1;
  }

  .bar-left .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 5px 15px 3px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 107px;
  }

  .bar-left .shop {
    background-position: 0 57px;
  }

  .text {
    font-size: 14px;
  }

  .bar-right .cart {
    height: 49px;
    flex: 1;
    background-color: #ffe817;
    color: #333;
    font-size: 14px;
    line-height: 49px;
  }

  .bar-right .buy {
    height: 49px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
    background-color: #f96;
    flex: 1;
  }

</style>

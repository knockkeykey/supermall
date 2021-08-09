<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  /*导航栏的高度(不包括状态栏 加状态栏一般64)*/
  line-height: 44px;
  text-align: center;
/*加阴影 */
  box-shadow:0 1px 1px rgba(100,100,100,0.1) ;
}
  .left, .right{
    width: 60px;

  }
  .center{
    /* 当left有确定宽度 flex:1就会填满剩余的*/
    flex: 1;

  }
</style>

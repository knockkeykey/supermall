<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    /*好像是水平排列*/
    display: flex;
    background-color: #f6f6f6;
    /*这是？？ 目的是把tabbar弄到最下面*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*  搞个过渡：阴影 x偏移量(x的正方向是左) y偏移量（y正方向是下） 模糊程度 模糊颜色*/
    box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.1);

  }


</style>

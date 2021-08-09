<template>
  <div id="app">
<!--  不要自动刷新(防止从首页到分类再回去就刷新了),除了Detail(不刷新的话就会点击每个商品都一样的数据)-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

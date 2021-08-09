<template>
  <!--  <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/home.svg" alt="">
      &lt;!&ndash;      文字要被东西包着 不然属于同级别 img好像是属于行内块元素&ndash;&gt;
      首页
    </div>
    <div class="tab-bar-item">分类</div>
    <div class="tab-bar-item">购物车</div>
    <div class="tab-bar-item">我的</div>-->

  <!--现在所有的item都展示同一个图片同一个文字 现在不能定死 动态处理就插槽-->
  <div class="tab-bar-item" @click="itemClick">
    <!--    初始图标-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <!--    活动图标-->
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!--文字-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      //    把正在用哪个路径传进来
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // console.log('监听itemClick的点击事件');
        //所有的组件都有  this.$router    这个对象
        //需要让item传进来 用哪个item就传哪个进来
        //这里是手动 跳转 靠外面传东西进来，  不是用 router-link
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    /*对多个flex进行均等分*/
    flex: 1;
    /*  水平居中文本*/
    text-align: center;
    /*  一般来说 tab-bar 的高度是49px*/
    height: 49px;
    /*  垂直居中文本*/
    /*line-height: 49px;*/
    font-size: 14px;
    /*图标距离上边框3px*/
    margin-top: 4px;
    /*  图标和文字之间有图片默认的距离 去掉它*/
    vertical-align: middle;
    /*  原来图标距离文字默认3px 上一步去除了这个距离 现在重新设置距离*/
    margin-bottom: 2px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }


</style>

<template>
  <div id="home">
    <!--    导航栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!--    文字条-->
    <tab-control
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFiexd"
    ></tab-control>

    <!--    滚动-->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图-->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!--推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--    本周流行-->
      <feature-view></feature-view>
      <!--    文字条-->
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!--各个小推荐-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!--    组件是不能直接监听点击的 需要加修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
//公用组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";
//方法或额外数据
import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",

      tabOffsetTop: 0,
      isTabFiexd: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //一旦创建完 立刻发送网络请求
  created() {
    //1. 请求多个数据
    this.getHomeMultidata();
    // 2. 请求商品数据
    this.getHomeGoods("pop");

    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2. 取消全局事件的监听 (,不能把所有的监听都取消掉 所以第二个值传入取消监听的函数)
    this.$bus.$off("itemImagLoad", this.ItemImgListener);
  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {},
  methods: {
    /*
     *事件监听相关的方法
     * */

    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //  2. 决定tabCOntrol是否吸顶(position:fixed)
      this.isTabFiexd = -position.y > this.tabOffsetTop;
    },
    //从Scroll.vue里面通过自定义事件传过来的 @pullingUp="loadMore"
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //  获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用户获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     * 网络请求相关的方法
     * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //  完成了上拉加载更多 为了继续加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  /*vh -> viewhieght*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*固定定位  在使用浏览器原生滚动时,为了让导航不跟随一起滚动*/
  /*    position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;*/
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  /*z-index 只对定位的效果作用*/
  z-index: 9;
}

/*  .content {
      height: calc(100vh - 93px);
      overflow: hidden;
    }*/
</style>

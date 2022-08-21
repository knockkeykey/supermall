<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!--    <ul>
            <li>111</li>
            <li v-for="(item,index) in $store.state.cartList" :key="item.index">
            {{item}}
            </li>
          </ul>-->

      <!--轮播图-->
      <detail-swiper :top-images="topImage"></detail-swiper>
      <!--商品信息信息-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--   店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--图片之类的-->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <!--  参数    尺码之类的-->
      <detail-paramInfo ref="params" :paramInfo="paramInfo"></detail-paramInfo>
      <!--  评论-->
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <!--  推荐  显示(用之前就封装好的goodlist组件)-->
      <goods-list ref="recomment" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
// 子组件
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
// 公用组件
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";
//方法或额外数据
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
    // Toast
  },
  data() {
    return {
      ild: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      itemInfo: {}
    };
  },
  created() {
    // 1. 获取iid 保存传入的iid
    this.iid = this.$route.params.iid;
    console.log(this.iid);

    // 2. 请求详情数据 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log("这个商品的所有数据" + res);
      console.log(res);
      // 1. 获取数据
      const data = res.result;
      // 2. 获取顶部的图片轮播数据
      this.topImage = data.itemInfo.topImages;

      console.log(this.topImage);

      // 3. 获取标题 价格 折扣 等商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 5. 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      console.log(this.detailInfo);
      // 6. 尺码数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 7. 取出评论信息  (有些商品没有评论,所以要做判断)
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
      //  获取itemInfo中的数据
      this.itemInfo = data.itemInfo;

      /*     // 8 上面把数据传入到各个组件中 现在需要获取各个组件的offset 顺利进行点击titleClick事件
             // 第一次获取,值不对
             //值不对的原因:this.$refs.params.$el压根没有渲染
             this.themeTopYs = []

             this.themeTopYs.push(0);
             this.themeTopYs.push(this.$refs.params.$el.offsetTop);
             this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
             this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);

             console.log(this.themeTopYs);

             // 第二次获取:值不对
             //值不对的原因:图片没有计算在内
             //在create中给了params comment recomment数据
             // 但是内部还没有渲染完
             //利用这个停一帧 等前面渲染完成 再执行回调函数
             this.$nextTick(() => {
               // 根据最新的数据,对应的DOM是已经被渲染出来
               // 但是图片依然是没有加载完的(目前获取到offsetTop不包含其中的图片)
               // offsetTop值不对的时候, 一般都是因为图片的问题
               this.themeTopYs = []

               this.themeTopYs.push(0);
               this.themeTopYs.push(this.$refs.params.$el.offsetTop);
               this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
               this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);

               console.log(this.themeTopYs);
             })*/
    });

    //  3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    // 4.给getThemeTopY进行赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    //在mounted中加载了组件的跟元素,但是$el没有值
    // console.log("mounted");
  },
  updated() {
    //updated肯定有 值 了 ,但是更新频繁
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.ItemImgListener);
    // console.log("deactivated");
  },
  //因为被混入了 所以在methods中的imageLoad是拿得到refresh的
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    //vuex的补充 映射
    ...mapActions(["addCart"]),

    //  1. 监听详情的图片加载完成
    imageLoad() {
      //为什么这里不是多次加载 这里不应该有发抖呀
      // console.log("图片加载中");
      // 图片加载完就刷新,但是每张图片都要刷新一次没必要,所以要防抖动,延时刷新时间
      // this.$refs.scroll.refresh()

      //所以要这样写
      this.refresh();

      /*        // 在这里是图片加载完成了,所以在这里获取各个组件的offsetTop值是肯定正确的
                //但是调用太频繁 需要防抖
                this.themeTopYs = []

                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);

                console.log(this.themeTopYs);*/
      this.getThemeTopY();
    },
    //点击'商品','参数','评论','推荐' 的事件
    titleClick(index) {
      // console.log(index);
      //滚动到确定的位置 x y 速度毫秒
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //监听滚动事件,获取位置,Scroll.vue通过$emit发送出来的
    contentScroll(position) {
      //  1. 获取y值
      const positionY = -position.y;

      // 2. positionY和主题中值进行对比
      // [0, 12962, 13890, 14213, 非常大的值]
      // console.log(Number.MAX_VALUE);
      //所以要在this.themeTopYs中再push一个最大值进去

      // positionY 在 0 和 12962  之间, index = 0
      // positionY 在 12962 和 13890  之间, index = 1
      // positionY 在 13890 和 14213  之间, index = 2
      // positionY 超过 14213, index = 3
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // console.log(i);
        // let i in this.themeTopYs 通过这个得到的i是str 但是这个i是个string类型的,而且也没用31
        //需要换回老方法 let i = 0; i < length; i++

        /*          if (positionY>this.themeTopYs.length[i] && positionY <this.themeTopYs[i+1]){
                      //会报错 因为i只有0,1,2,3  但是没有4
                      console.log(i);
                    }*/
        // this.themeTopYs是个数组 装着商品 参数 评论 推荐 四个板块的offsetTop值
        // this.themeTopYs[i]表示第i模块的offsetTop值
        // length = this.themeTopYs.length=4 商品 参数 评论 推荐
        // positionY是当前滚动 是个正值

        /*          if (
                      this.currentIndex != i &&
                      ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
                        (i == length - 1 && positionY >= this.themeTopYs[i]))
                    ) {
                      this.currentIndex = i
                      console.log(this.currentIndex);
                      //  父拿子的数据非常简单 给组件一个ref 找到 然后直接取data数据
                      this.$refs.nav.currentIndex = this.currentIndex
                    }*/

        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3. 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // console.log('addToCart------');
      // 1. 获取购物车需要展示的信息
      const product = {};
      //图片 标题 描述 放入到对象中
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.itemInfo.lowNowPrice;
      product.iid = this.iid;

      // 2. 将商品添加到购物车
      // 尽量通过mutations去操作 不要直接操作state
      // this.$store.cartList.push(product)
      //product是[新]商品队列
      //这个是mutations的调用形式 commit
      // this.$store.commit('addCart', product)

      /*    this.$store.dispatch('addCart', product).then(res => {
              console.log(res);
              // 3. 添加到购物车成功
            })*/

      //vuex补充后的映射写法  等于上面disoatch的写法
      this.addCart(product).then(res => {
        /*   console.log(res);
             // 3. 添加到购物车成功
             this.show=true;
             this.message=res
             setTimeout(() => {
               this.show = false;
               this.message= ''
             },1500)*/
        this.$toast.show(res);
        console.log(this.$toast);
      });

      console.log("这个商品会加到购物车中的数据" + product);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  /*??????????*/
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100vh - 44px - 49px);
}
</style>

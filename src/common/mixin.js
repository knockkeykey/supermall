import {debounce} from "./utils"
import BackTop from "@/components/content/backTop/BackTop";
//生命周期和数据和组件是可以抽取的,他们会合并  但是methods不能抽,会覆盖
export const itemListenerMixin = {
  components: {},
  methods: {},
  data() {
    return {
      ItemImgListener: null,
      refresh: null
    }
  },
  mounted() {
// 这个地方img标签确实被挂载, 但是其中的图片还没有占据高度

    // 1.图片加载完成的事件监听
    //this.$refs.scroll.refresh对这个函数进行防抖操作
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    // 1.2 监听item中图片加载完成
    // 对监听的事件进行保存
    this.ItemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
    // console.log('我是 混入 中的内容');
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      //找到组件 this.$refs.scroll
      //拿scrool对象this.$refs.scroll.scroll
      //调用方法 scrollTo  (左右位置?,上下位置?,速度毫秒)
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.message
    },
  }
}

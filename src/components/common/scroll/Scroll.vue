<template>
  <!--  ref -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      //上拉事件
      pullUpLoad:{
        type: Boolean,
        default: false
      }

    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'

      }
    },
    //一旦被挂载 就创建BScroll
    mounted() {

      // 1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        //让除了button的元素 恢复点击
        click: true,
        probeType: this.probeType,
        //上拉事件
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3. 监听scroll滚到底部
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          // console.log('监听到滚动到底部');
          //子组件传给父组件
          this.$emit('pullingUp')
        })
      }


/*      //  3.监听上拉事件
      this.scroll.on('pullingUp',() => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })*/
    },
    methods: {
      //这里都是封装出来 防止以后插件出事
      scrollTo(x, y, time = 300) {
        //先判断this.scroll有没有值
        this.scroll && this.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      // 上拉加载更多
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        //通过这个打印可以验证图片太多问题 有没有多次调用refresh
        // console.log('-------');
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>

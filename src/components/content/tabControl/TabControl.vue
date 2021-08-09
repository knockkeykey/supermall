<template>
  <div class="tab-control">
    <!--      建议 如果只是文字不一样 就不要插槽了-->
    <div v-for="(item,index) in title" class="tab-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    //  用props传进来解决
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
      //  把点击事件传到外面去 用自定义事件
        this.$emit('tabClick', index)
      }
    }

  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    /*overflow: hidden;*/
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);

  }

  .active span {

    border-bottom: 3px solid var(--color-tint);
  }

</style>

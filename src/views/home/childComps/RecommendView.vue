<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }

    }
  }
</script>

<style scoped>
  .recommend {
    /*水平布局?*/
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    /*均等分*/
    flex: 1;
  }
  .recommend-item img{
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
  }
</style>

<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <!--    商品图片-->
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <!--    商品信息：商品标题 商品描述-->
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <!--      商品底部： 商品价格 商品数量-->
      <div class="info-bottom">
        <div class="item-price">{{itemInfo.price}}</div>
        <div class="item-count">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components:{
      CheckButton
    },
    created(){
      console.log(this.$store.state.cartList);
      console.log(this.itemInfo);
    },
    methods:{
      checkClick(){
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }

  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>

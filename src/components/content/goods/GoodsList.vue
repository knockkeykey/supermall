<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item">
      {{ goods }}
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  /*别挤在一行*/
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-evenly;

  /*justify-content: space-around;*/
  /*padding: 2px;*/
}
</style>

<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>


  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartButtomBar",
    components: {
      CheckButton
    },
    computed: {
      // 可以用mapGetters简化 忘记了
      // ...mapGetters(['cartList']),
      /*      totalPrice(){
              // filter增加过滤器
              return '￥' + this.cartList.filter(item => {
                return item.checked
              }).reduce((preValue, item) => {
                return preValue + item.price * item.count
              },0).toFixed(2)
            },*/

      totalPrice() {
        // filter增加过滤器
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      //是否全部选中
      isSelectAll() {
        //这find 和 filter都是数组的高阶函数
        //使用filter
        /*    if (this.$store.state.cartList === 0) return false
              return  !(this.$store.state.cartList.filter(item => !item.checked).length)*/
        //使用find
        if (this.$store.state.cartList.length === 0) return false
        return !(this.$store.state.cartList.find(item => !item.checked))

        //不会高阶函数 就得走循环
        /*     if (this.$store.state.cartList === 0) return false
             for (let item of this.$store.state.cartList) {
               if (!item.checked) {
                 return false
               }
             }
             return true*/
      },
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }

        //是不能做简化 和isSelectAll在相互影响
        // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)

      },
      calcClick(){
        if (!this.isSelectAll){
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  /*1全选*/
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
    font-size: 14px;
  }

  /*1.1全选里面的按钮*/
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  /*2总价*/
  .price {
    margin-left: 20px;
    flex: 1;
  }

  /*3计算*/
  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>

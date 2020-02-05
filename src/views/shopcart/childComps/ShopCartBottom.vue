<template>
  <div class="cart-bottom">
    <div class="cart-bottom-left">
      <img
        src="~assets/img/cart/tick.svg"
        alt
        class="selectall"
        :class="{selectaallctive:isSelectAll}"
        @click="selectAll"
      />
      <span class="select-all">全选</span>
      <span class="sum">合计:{{totlePrice}}</span>
    </div>
    <div class="cart-bottom-right">
      <div class="settle" @click="calcClick">去结算({{listCheckedLength}})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopCartBottom",
  computed: {
    totlePrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    listCheckedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) return false;
      return this.$store.state.cartList.every(item => item.checked);
    }
  },
  methods: {
    selectAll() {
      this.isSelectAll
        ? this.$store.state.cartList.forEach(item => (item.checked = false))
        : this.$store.state.cartList.forEach(item => (item.checked = true));
    },
    calcClick() {
      if(this.listCheckedLength == 0) {
        this.$toast.show('请勾选要购买的商品')
      }else {
        this.$toast.show('抱歉,该功能正在开发中')
      }
    }
  }
};
</script>

<style>
.cart-bottom {
  position: fixed;
  width: 100%;
  bottom: 49px;
  display: flex;
  height: 44px;
  background-color: #eee;
  line-height: 44px;
  font-size: 14px;
}
.cart-bottom-left {
  width: 65%;
  position: relative;
}
.selectall {
  position: absolute;
  top: 13px;
  left: 16px;
  width: 18px;
  height: 18px;
  display: block;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 5px;
}
.select-all {
  margin-left: 40px;
  font-size: 14px;
  color: #888;
}
.sum {
  margin-left: 40px;
  text-align: center;
}
.cart-bottom-right {
  width: 35%;
}
.settle {
  line-height: 33px;
  margin: 5px 0;
  height: 30px;
  color: #fff;
  text-align: center;
  background-image: linear-gradient(90deg, #ff9000 0%, #ff5000 98%);
  border-radius: 30px;
}
.selectaallctive {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>
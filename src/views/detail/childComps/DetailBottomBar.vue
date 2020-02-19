<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="customer-service">
        <i></i>
        <p>客服</p>
      </div>
      <div class="shop">
        <i></i>
        <p>店铺</p>
      </div>
      <div class="collection">
        <i></i>
        <p>收藏</p>
      </div>
    </div>
    <div class="bottom-right">
      <div class="shop-cart" @click="addCart">加入购物车</div>
      <div class="shop-buy" @click="buyClick">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit('addCart')
    },
    buyClick() {
      this.$emit('buyClick')
    }
  }
}
</script>

<style>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  display: flex;
  text-align: center;
}
.bottom-left {
  flex: 1;
  display: flex;
  font-size: 13px;
  background-color: #fff;
}
.bottom-left div {
  flex: 1;
}
.bottom-left div i {
  display: block;
  width: 22px;
  height: 22px;
  margin: 4px auto;
}
.customer-service i {
  background: url("~assets/img/detail/detail_bottom.png") 0 -53px;
  background-size: 22px;
}
.shop i {
  background: url("~assets/img/detail/detail_bottom.png") 0 -98px/100%;
}
.collection i {
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bottom-right {
  flex: 1;
  display: flex;
}
.bottom-right div {
  flex: 1;
  height: 100%;
  line-height: 49px;
    font-size: 15px;
}
.shop-cart {
  background-color: #ffe817;
  color: #333;
}
.shop-buy {
  background-color: #f69;
  color: #fff;
}
</style>
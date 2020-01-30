<template>
  <div class="shop-cart-list">
    <div class="cart-left">
      <img
        src="~assets/img/cart/tick.svg"
        alt
        @click="selectClick"
        class="select"
        :class="{selectactive:goods.checked}"
      />
    </div>
    <div class="cart-center">
      <img :src="goods.image" alt />
    </div>
    <div class="cart-right">
      <div class="cart-title">{{goods.title}}</div>
      <div class="cart-detail">商品描述:{{goods.desc}}</div>
      <span class="price">￥{{goods.price}}</span>
      <div class="cart-count">
        <span class="left-count" @click="substrCount">-</span>
        <span class="counter">{{goods.count}}</span>
        <span class="right-count" @click="addCount">+</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopCartList",
  data() {
    return {
      
    }
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    selectClick() {
      this.goods.checked = !this.goods.checked
    },
    substrCount() {
      if(this.goods.count !== 1) {
        this.goods.count--
      }
    },
    addCount() {
      this.goods.count++
    }
  }
};
</script>

<style>
.shop-cart-list {
  display: flex;
  padding: 10px 5px;
}
.cart-left {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select {
  width: 18px;
  height: 18px;
  display: block;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 5px;
}
.selectactive {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
.cart-center img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.cart-right {
  width: 70%;
  position: relative;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;
}
.cart-title {
  width: 187px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cart-detail {
  width: 187px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 20px;
  font-size: 13px;
}
.cart-right .price {
  position: absolute;
  left: 10px;
  bottom: 4px;
}
.cart-count {
  position: absolute;
  right: 30px;
  bottom: 4px;
  height: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.cart-count span {
  display: inline-block;
}
.cart-count .counter {
  width: 40px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.left-count {
  width: 20px;
}
.right-count {
  width: 20px;
}
</style>
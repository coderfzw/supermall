<template>
  <div id="shop-cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{listLength}})</div>
    </nav-bar>
    <scroll class="shop-scroll">
        <shop-cart-list v-for="(item,index) in cartGoods" :key="index" :goods="item"/>
    </scroll>
    <shop-cart-bottom/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import ShopCartList from './childComps/ShopCartList'
import ShopCartBottom from './childComps/ShopCartBottom'
export default {
  name: "ShopCart",
  data() {
    return {
      cartGoods: this.$store.state.cartList
    }
  },
  components: {
    NavBar,
    Scroll,
    ShopCartList,
    ShopCartBottom
  },
  computed: {
    listLength() {
      return this.$store.state.cartList.length;
    }
  }
};
</script>

<style>
#shop-cart {
  height: 100vh;
}
.cart-nav {
  width: 100%;
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}
.shop-scroll {
  height: calc(100% - 88px - 49px);
}
</style>
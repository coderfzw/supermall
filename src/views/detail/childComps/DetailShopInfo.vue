<template>
  <div class="shop-info">
    <div class="shop-title">
      <img :src="shop.logo" alt />
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-detail">
      <div class="shop-detail-count">
        <div>
          <p>{{shop.sells | getSells}}</p>
          <p>总销量</p>
        </div>
        <div>
          <p>{{shop.goodsCount}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-detail-grade">
        <p v-for="(item,index) in shop.score" :key="index">
          <span>{{item.name}}</span>
          <span :class="{isgreen: item.isBetter}" class="red">{{item.score}}</span>
          <span :class="{isbggreen: item.isBetter}" class="bgred">{{item.isBetter ? '高' : '低'}}</span>
        </p>
      </div>
    </div>
    <div class="enter-shop">
      进店逛逛
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    getSells: function(value) {
      if (value < 10000) return value
      return (Math.round(value / 1000) /10).toFixed(1) + '万'
    }
  }
};
</script>

<style>
.shop-info {
  margin: 20px 0 0;
  padding: 0 10px;
  overflow: hidden;
  color: #333;
  border-bottom: 10px solid #f2f5f8;
}
.shop-title {
  display: flex;
  line-height: 30px;
  color: #666;
  align-items: center;
}
.shop-title img {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  border: 1px solid rgba(0,0,0,.1);
}
.shop-title span {
 margin-left: 10px;
}
.shop-detail {
  display: flex;
}
.shop-detail-count {
  display: flex;
  width: 50%;
  margin: 15px 0;
  justify-content: space-evenly;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.shop-detail-count p {
  margin-top: 10px;
}
.shop-detail-count div p:first-child {
  font-size: 18px;
}
.shop-detail-count div p:nth-child(2) {
  font-size: 12px;
}
.shop-detail-grade {
  display: flex;
  margin-left: 27px;
  flex-direction: column;
  justify-content: space-around;
  font-size: 13px;
}
.shop-detail-grade p {
  display: flex;
  width: 120px;
  flex-direction: row;
  justify-content: space-between;
}
.red{
  color: #f13e3a;
}
.bgred{
  background-color: #f13e3a;
  color: #fff;
}
.isgreen {
  color: #5ea732;
}
.isbggreen {
  color: #fff;
  background-color: #5ea732;
}
.enter-shop {
  margin: 20px auto;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  border-radius: 8px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #666;
}
</style>
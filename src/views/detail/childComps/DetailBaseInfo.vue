<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">
        <s>{{goods.oldPrice}}</s>
      </span>
      <span class="discount" v-show="goods.discount !== ''">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index-1">
        <img :src="goods.services[index-1].icon" alt="" />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
.base-info {
  margin: 15px 0 0;
  padding: 0 10px;
  border-bottom: 10px solid #f2f5f8;
}
.info-title {
  font-size: 16px;
  color: #222;
}
.info-price {
  position: relative;
  margin-top: 10px;
}
.info-price span {
  margin-right: 5px;
}
.new-price {
  color: var(--color-high-text);
  font-size: 24px;
}
.old-price {
  color: #999;
  font-size: 13px;
}
.discount {
  position: absolute;
  font-size: 12px;
  color: #fff;
  background-color: var(--color-high-text);
  padding: 2px 5px;
  border-radius: 8px;
}
.info-other {
  margin-top: 15px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  display: flex;
  color: #999;
  font-size: 13px;
  justify-content: space-between;
  text-align: center;
  line-height: 30px;
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  font-size: 13px;
  color: #333;
  vertical-align: middle;
  flex-wrap: wrap;
}
.info-service-item img {
  width: 14px;
  height: 14px;
}
</style>
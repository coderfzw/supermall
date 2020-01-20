<template>
  <div class="detail-goods" v-if="Object.keys(detailInfo).length !== 0">
    <div class="detail-goods-info">
      <div class="detail-goods-top"></div>
      <div class="detail-goods-desc">{{detailInfo.desc}}</div>
      <div class="detail-goods-bottom"></div>
    </div>
    <p>{{detailInfo.detailImage[0].key}}</p>
    <div class="detail-goods-img" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index">
      <img :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      imgLength: 0,
      count: 0
    }
  },
  props: {
    detailInfo: {
      type: Object
    }
  },
  methods: {
    imgLoad() {
      if (++this.count === this.imgLength) {
        this.$emit('imgLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      return this.imgLength = this.detailInfo.detailImage[0].list.length
    }
  }
};
</script>

<style>
.detail-goods {
  padding: 20px 10px;
  border-bottom: 10px solid #f2f5f8;
}
.detail-goods-top {
  position: relative;
  float: left;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.detail-goods-top::before {
  position: absolute;
  top: -4px;
  left: 0;
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  background-color: #333;
}
.detail-goods-bottom {
  position: relative;
  float: right;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.detail-goods-bottom::after {
  position: absolute;
  top: -4px;
  right: 0;
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  background-color: #333;
}
.detail-goods-desc {
  padding: 15px 0;
  font-size: 14px;
}
.detail-goods p {
  margin: 15px 0;
  color: #333;
}
.detail-goods-img img {
  width: 100%;
}
</style>
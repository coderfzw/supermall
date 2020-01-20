<template>
  <div class="recommend-info">
    <div class="recommend-title">热门推荐</div>
    <goods-list :goodsList="recommends" />
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
  name: "DetailRecommendInfo",
  props: {
    recommends: {
      type: Array
    }
  },
  components: {
    GoodsList
  }
};
</script>

<style>
.recommend-info {
  overflow: hidden;
}
.recommend-title {
  font-size: 15px;
  color: #333;
  padding-left: 10px;
  margin-top: 20px;
}
</style>
<template>
  <div class="goods">
    <grid-view>
      <goods-list-item v-for="(item,index) in goodsList" :key="index" :goodsItem="item" />
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
    GridView
  },
  props: {
    goodsList: {
      type: Array,
      defualt() {
        return [];
      }
    }
  }
};
</script>

<style>
.goods {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
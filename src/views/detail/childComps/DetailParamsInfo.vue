<template>
  <div class="params-info" v-if="Object.keys(paramsInfo).length !== 0">
    <table v-for="(table,index) in paramsInfo.sizes" :key="index" class="info-size">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for="(item,index) in paramsInfo.infos" :key="index">
        <td class="item-key">{{item.key}}</td>
        <td class="item-value">{{item.value}}</td>
      </tr>
    </table>
    <img :src="paramsInfo.image" alt="" v-show="paramsInfo.image">
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
.params-info {
  padding: 20px 10px;
  border-bottom: 10px solid #f2f5f8;
}
.params-info table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.params-info img {
  width: 100%;
}
.params-info table tr {
  height: 42px;
  border-bottom: 1px solid hsla(0,0%,39.2%,.1);
}
.info-size tr:last-child{
  border-bottom: 2px solid hsla(0,0%,39.2%,.1);
}
.item-key {
  width: 95px;
}
.item-value {
  color: #eb4868;
}
</style>
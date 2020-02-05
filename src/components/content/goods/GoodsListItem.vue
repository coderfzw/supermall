<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="getImg" alt="" @load="imgClick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgClick() {
      if(this.$route.path.indexOf('home') !== -1) {
        this.$bus.$emit('homeImgLoad')
      } else if(this.$route.path.indexOf('detail') !== -1) {
        this.$bus.$emit('detailImgLoad')
      }
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    getImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img 
      // if (this.goodsItem.show == undefined) return this.goodsItem.image
      // return  this.goodsItem.show.img
    }
  }
}
</script>

<style>
  .goods-item {
    width: 48%!important;
    position: relative;
    padding-bottom: 40px;
  }
  .goods-item img {
    width: 100%;
    border-radius: 3px;
  }
  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info span {
    margin: 0 10px;
  }
  .price {
    color: var(--color-high-text);
  }
  .collect {
    position: relative;
  }
  .collect::before {
    position: absolute;
    left: -15px;
    top: -1px;
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>
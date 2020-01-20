<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="navbar" />
    <scroll class="scroll" ref="scroll" :probeType="3" @scroll="scrollY">
      <detail-swiper :topImages="this.topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imageLoad" />
      <detail-params-info ref="params" :paramsInfo="paramsInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <detail-recommend-info ref="recommend" :recommends="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { showBackTop } from "common/mixin";

import {
  getDetail,
  getRecommends,
  Goods,
  Shop,
  GoodsParams
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar
  },
  mixins: [showBackTop],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeYs: [],
      isShowShopSuccess: false,
      shopMessage: ""
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //2.1请求轮播图片
      this.topImages = data.itemInfo.topImages;

      //2.2请求商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //2.3请求商家信息
      this.shop = new Shop(data.shopInfo);

      //2.4请求商品详细信息
      this.detailInfo = data.detailInfo;

      //2.5请求参数信息
      this.paramsInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      //2.6请求评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求详情页推荐商品数据
    getRecommends().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //3.监听goodsItem中图片加载完成
    this.$bus.$on("detailImgLoad", () => {
      refresh();
    });
  },
  beforeDestroy() {
    this.$bus.$off("detailImgLoad");
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeYs = [];
      this.themeYs.push(0);
      this.themeYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeYs.push(this.$refs.recommend.$el.offsetTop - 44);
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeYs[index], 100);
    },
    scrollY(position) {
      const positionY = -position.y;
      if (positionY >= 0) {
        this.$refs.navbar.currentIndex = 0;
      }
      if (this.themeYs[1] && positionY >= this.themeYs[1]) {
        this.$refs.navbar.currentIndex = 1;
      }
      if (this.themeYs[2] && positionY >= this.themeYs[2]) {
        this.$refs.navbar.currentIndex = 2;
      }
      if (this.themeYs[3] && positionY >= this.themeYs[3]) {
        this.$refs.navbar.currentIndex = 3;
      }

      //判断是否显示backTop
      this.isShowBackTop = -position.y > 1000;
    },
    addCart() {
      //添加购物车需要展示的数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch("addCart", product).then(res => {
        //显示toast
        this.$toast.show(res);
      });
    }
  }
};
</script>

<style>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
#detail .detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.scroll {
  height: calc(100% - 44px - 49px);
}
</style>
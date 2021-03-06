<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      @tabClick="tabClick"
      :titles="['流行','新款','精选']"
      ref="tabControl1"
      class="tabfixed"
      v-show="istabFixed"
    />
    <scroll
      class="content-scroll"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="pullingUpClick"
      @pullingDown="pullingDownClick"
    >
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <home-swiper :banners="banners" @imageLoad="imageLoad" />
        <recommend-view :recommends="recommends" />
        <feature-view />
      <tab-control
        @tabClick="tabClick"
        :titles="['流行','新款','精选']"
        ref="tabControl2"
        v-show="!istabFixed"
      />
      </van-pull-refresh>
      <goods-list :goodsList="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { showBackTop } from "common/mixin";
//vant
import Vue from "vue";
import { PullRefresh } from "vant";
import { Toast } from "vant";
Vue.use(PullRefresh);

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [showBackTop],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      goodsType: "pop",
      tabOffsetTop: 0,
      istabFixed: false,
      scrollY: 0,
      isShowRf: false,
      count: 0,
      isLoading: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.goodsType].list;
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    //3.监听goodsItem中图片加载完成
    this.$bus.$on("homeImgLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //记录离开时的位置
    this.scrollY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /*
    网络请求相关的方法
    */
    getHomeMultidata() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
      });
    },
    /*
    事件监听相关的方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.goodsType = "pop";
          break;
        case 1:
          this.goodsType = "new";
          break;
        case 2:
          this.goodsType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //判断是否显示返回顶部
      this.isShowBackTop = -position.y > 1000;
      this.istabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多
    pullingUpClick() {
      this.getHomeGoods(this.goodsType);
      this.$refs.scroll.finishPullUp();
    },
    //下拉刷新
    pullingDownClick() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
      this.$refs.scroll.finishPullDown();
      console.log("刷新完成");
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    imageLoad() {
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
}
.tabfixed {
  position: relative;
  z-index: 9;
}
.content-scroll {
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  position: relative;
  height: calc(100% - 49px);
  overflow: hidden;
}
.refresh {
  text-align: center;
  line-height: 44px;
}
</style>
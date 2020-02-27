<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: {}
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(this.__initScroll, 20);
  },
  methods: {
    __initScroll() {
      // 1.初始化BScroll对象
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
        // 下拉刷新
        pullDownRefresh: {
          // 下拉距离超过30px触发pullingDown事件
          threshold: 50,
          // 回弹停留在距离顶部20px的位置
          stop: 44
        }
      });

      // 2.将监听事件回调
      this.scroll.on("scroll", pos => {
        this.$emit("scroll", pos);
      });

      // 3.监听上拉到底部
      this.scroll.on("pullingUp", () => {
        console.log("上拉加载");
        this.$emit("pullingUp");
      });

      // 4.下拉刷新
      this.scroll.on("pullingDown", () => {
        console.log("处理下拉刷新操作");
        this.$emit('pullingDown')
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown && this.scroll.finishPullDown();
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    }
  }
};
</script>

<style>
.content {
  overflow: hidden;
}
</style>
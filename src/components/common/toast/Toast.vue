<template>
  <div class="shop-success" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message:{
  //     type: String,
  //     default: ''
  //   }
  // }
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, showTime = 1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, showTime);
    }
  }
};
</script>

<style>
.shop-success {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 13px 14px;
  color: #fff;
  border-radius: 5px;
  z-index: 99;
}
</style>
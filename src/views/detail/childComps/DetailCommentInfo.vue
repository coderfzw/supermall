<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-title">
      <span class="left">用户评价</span>
      <span class="right">更多 ></span>
    </div>
    <div class="comment-user">
      <img :src="commentInfo.user.avatar" alt="">
      <p>{{commentInfo.user.uname}}</p>
    </div>
    <div class="comment-content">{{commentInfo.content}}</div>
    <div class="comment-params">
      <span class="comment-time">{{commentInfo.created | getTime}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    <div class="comment-img">
      <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index" v-show="commentInfo.images.length">
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    getTime(value) {
      //1.转换成date对象
      const date = new Date(value * 1000)
      //2.转换时间格式
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
};
</script>

<style>
.comment-info {
    padding: 7px 10px;
    border-bottom: 10px solid #f2f5f8;
}
.comment-title {
  height: 50px;
  line-height: 50px;
  color: #333;
  font-size: 15px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.comment-user {
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: #333;
  font-size: 15px;
}
.comment-user img {
  margin-right: 10px;
  border-radius: 50%;
  width: 42px;
  height: 42px;
}
.comment-content {
  font-size: 14px;
  color: #777;
}
.comment-params {
  padding: 10px 0;
  color: #999;
  font-size: 12px;
}
.comment-time {
  margin-right: 10px;
}
.comment-img {
  padding-bottom: 10px;
}
.comment-img img{
  margin-right: 5px;
  width: 70px;
  height: 70px;
}
</style>
<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      defualt() {
        return []
      }
    }
  },
  data() {
    return {
      isImageLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isImageLoad) {
        this.$emit('imageLoad')
        this.isImageLoad = true
      } 
    }
  }
}
</script>

<style>

</style>
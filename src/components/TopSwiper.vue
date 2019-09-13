<template>
  <div class="swiper">
      <swiper
        :indicator-dots='true'
        indicator-color='#ea5149'
        :autoplay='true'
        :interval='6000'
        :duration='1000'
        :circular='true'
      >
        <!-- <div :key="index" v-for="(top,index) in tops"> -->
        <div :key="imgindex" v-for="(top,imgindex) in imgUrl">
            <swiper-item>
                <img
                    @click="goNav_detail(img)"
                    class="slide-image"
                    mode='aspectFit'
                    v-for='img in top'
                    :key="img.id"
                    :src="img.image"
                >
            </swiper-item>
        </div>
      </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrl () {
      const res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    goNav_detail (item) {
      // var that = this
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang="scss">
.swiper{
    margin-top: 10rpx;
    .slide-image{
        width: 33%;
        height: 290rpx;
    }
}
</style>
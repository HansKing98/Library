<template>
  <div class="bookinfo">
      <div class="thump">
        <img class="back"
            :src="info.image"
            mode="aspectFill"
            >
        <img class="img" 
            :src="info.image"
            mode="aspectFit"
            >
        <div class="info">
            <div class="title">
                {{info.title}}
            </div>
            <div class="author">
                {{info.author}}
            </div>
        </div>
      </div>
      <div class="detail text-primary">
          {{info.title}}
          <div class="right">
              {{info.rate}}分 <Rate :value="info.rate"></Rate>
          </div>
      </div>
      <div class="detail">
          {{info.publisher}}
          <div class="right">
              ￥{{info.price}}
          </div>
      </div>
      <div class="description">
          <p :key="i" v-for="(description,i) in info.description">{{description}}</p>
      </div>
      <!-- <button class="btn btn-red" @click="go_nav">查看豆瓣读书详情</button> -->
  </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  components: {
    Rate
  },
  props: ['info'],
  mounted () {
    console.log('info2', this.info)
  },
  computed: {
    altUrl () {
      return '/pages/comment/main?altUrl=' + this.info.alt
    }
  },
  method:{
    go_nav () {
      mpvue.navigateTo({
        url: this.altUrl
      })
    }
  }
}
</script>

<style lang="scss">
.bookinfo{
    font-size: 14px;
    color: #3f3f3f;
    .description{
        padding: 0 20rpx;
        margin-top: 20rpx;
        p{
            text-indent: 2em;
            font-size: 14px;
        }
    }
    .right{
        float: right;
    }
    .detail{
        padding: 10rpx 20rpx;

    }
    .thump{
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        position: relative;
        .back{
            filter: blur(30rpx);
            width: 100%;
        }
        .img{
            position: absolute;
            width: 100%;
            height: 300rpx;
            left: 0;
            top: 30rpx;
        }
        .info{
            color: white;
            position: absolute;
            width: 100%;
            left: 0;
            top: 330rpx;
            text-align: center;
            .title{
                font-size: 20px;
            }
            .author{
                font-size: 14px;
            }
        }
    }
}
</style>
<template>
        <div class="empty">
          <img :src="img" mode='aspectFit'>
          <text>{{text}}</text>
          <button class="btn btn-primary" @click="go_switchTab">添加图书</button>
          <bt :text='bt_text' type='primary' :tapBt='tap' :id='id' width='270rpx' height='80rpx' fontSize='18px' margin='100rpx 0 0 0' ></bt>
        </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '您还没有录入您的书籍哦~'
    },
    bt_text: {
      type: String,
      default: '去选购'
    },
    img: {
      type: String,
      default: '/static/tabs/mybook_act.png'
    },
    id: String
  },
  methods:{
    go_switchTab(){
      wx.switchTab({
        url: '/pages/me/main'
      })
    }
  }
}
</script>

<style>
/* empty卡片 */
.empty{
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items:center;
  height: 750rpx;
  /* background-color: rgb(255, 189, 189); */
  font-size: 15px;
  color: #202020;
}
.empty img {
  /*width: auto;*/
  height: 200rpx;
}
</style>
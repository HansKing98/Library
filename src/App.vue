<script>
import config from '@/config'
export default {
  data () {
    return {
      openid: '',
      session_key: '',
      userInfo: {}
    }
  },
  async created () {
    this.openid = mpvue.getStorageSync('openid')
    if (this.openid) {
      this.session_key = mpvue.getStorageSync('session_key')
      this.user_info = mpvue.getStorageSync('user_info')
      await wx.request({
        url: config.host + '/cSession',
        data: {'openid': this.openid, 'session_key': this.session_key, 'user_info': this.userInfo},
        method: 'get'
      })
    }
  }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
}
.text-primary{
  color:#1B9CFC;
}
.text-red{
  color:#ea5149;
}
.btn{
  color: white;
  background-color: #1B9CFC;
  margin-bottom: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  border-radius: 10rpx;
  font-size: 16px;
}
.btn-red{
  margin: 20rpx auto;
  width: 90%;
  background-color: #ea5149;
  box-shadow: rgba(255, 113, 77, 0.637) 20rpx 10rpx 30rpx 1rpx ;
}
</style>

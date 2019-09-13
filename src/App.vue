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
  color:#ea5149;
}
.btn{
  color: white;
  background-color: #ea5149;
  margin-bottom: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  border-radius: 10rpx;
  font-size: 16px;
}
</style>

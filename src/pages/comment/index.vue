<template>
  <div>
    comment
  </div>
</template>

<script>
import config from '@/config'
import {get} from '@/utils'
import wx from '@/utils/wx'

export default {

  data () {
    return {
      appid: config.appid,
      secret: config.secret,
      code:'',  // wx.login
      grant_type: 'authorization_code',
      // 使用以上参数 调用api接口获取 openid
      openid: '',
      session_key: '',

      userInfo: {}
    }
  },
  computed: {

  },
  created() {

  },
  async onShow () {
    const login = await wx.login()
    console.log(login.code)
    this.code = login.code

    const setting = await wx.getSetting()
    console.log('setting', setting)
    if (setting.authSetting['scope.userInfo']) {
      const getUserInfo = await wx.getUserInfo()
      console.log(getUserInfo.userInfo);
      this.userInfo = getUserInfo.userInfo
      console.log('用户已经授权过')
    }else{
      console.log('用户还未授权过')
    }
    

    // 获取openid
    const code2session = await wx.request({
      url: config.host + '/weapp/jscode2session',
      data: {
        'appid': this.appid,
        'secret': this.secret,
        'code': this.code,
        'grant_type': this.grant_type
      },
      method:'get',
    })
    // console.log('open: ', code2session);
      this.openid = code2session.openid,
      this.session_key = code2session.session_key

    // 存储到服务器
    await wx.request({
      url: config.host + '/weapp/login',
      data: {
        'openid':this.openid,
        'session_key':this.session_key,
        'userInfo': this.userInfo
      },
      method:'get',
    })
  }
}
</script>

<style>

</style>

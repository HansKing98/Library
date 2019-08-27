<template>
  <div>
    <div class="container">
      <div class="userinfo" v-if="userInfo">
        <img :src="userInfo.avatarUrl" alt="">
        <p>{{userInfo.nickName}}</p>
      </div>
      <div v-else>
        <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button>
      </div>
      <YearProgress></YearProgress>
      <div>
        <button @click="scanBook">添加图书</button>
      </div>
    </div>
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import config from '@/config'
import {
  showSuccess,
  showLoading
} from '@/utils'
import wx from '@/utils/wx'

export default {
  components: {
    YearProgress
  },
  data () {
    return {
      appid: config.appid,
      secret: config.secret,
      code: '', // wx.login
      grant_type: 'authorization_code',
      // 使用以上参数 调用api接口获取 openid
      openid: '',
      session_key: '',
      userInfo: {}
    }
  },
  async onLoad () {
    // 这个时候 不行，可能与生命周期有关系
    // this.getSetting()
  },

  async onShow () {
    console.log('userInfo', this.userInfo)
    // 查看用户信息 缓存
    let user = mpvue.getStorageSync('userInfo')
    this.userInfo = user

    if (!user) {
      // 获取 code
      const login = await wx.login()
      // console.log('1',login.code);
      this.code = login.code
      // 获取 setting
      const setting = await wx.getSetting()
      // 是否 授权
      if (setting.authSetting['scope.userInfo']) {
        const getUserInfo = await wx.getUserInfo()
        console.log(getUserInfo.userInfo)
        // console.log('2.5',this.$store.state.code)
        // 缓存 userInfo
        mpvue.setStorageSync('userInfo', getUserInfo.userInfo)
        this.userInfo = getUserInfo.userInfo
        console.log('用户已经授权过')
        showLoading('正在登录。。。')
        // 获取 openid
        const code2session = await wx.request({
          url: config.host + '/weapp/jscode2session',
          data: {
            'appid': this.appid,
            'secret': this.secret,
            'code': this.code,
            'grant_type': this.grant_type
          },
          method: 'get'
        })
        // console.log('2', code2session);
        this.openid = code2session.openid
        this.session_key = code2session.session_key
        // 存储 用户信息 到服务器
        const loginState = await wx.request({
          url: config.host + '/weapp/login',
          data: {
            'openid': this.openid,
            'session_key': this.session_key,
            'userInfo': this.userInfo
          },
          method: 'get'
        })
        console.log('loginState', loginState)
        showSuccess('登录成功')
      } else {
        console.log('用户还未授权过')
        showLoading('未获取授权')
      }
    } else {
      console.log('已登录')
    }
  },
  methods: {
    scanBook () {
      mpvue.scanCode({
        success (res) {
          console.log(res)
        }
      })
    },
    getUserInfo1 () {
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (mpvue.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
      } else {
        console.log('请升级微信版本')
      }
    },

    bindGetUserInfo (e) {
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        // 刷新页面
        // console.log(getCurrentPages())

        let page = getCurrentPages().pop()
        page.onShow()
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    }
  },
  created () {

  }
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  .userinfo{
    margin-top: 100rpx;
    text-align: center;
    img{
      background-color: rgb(255, 203, 205);
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>
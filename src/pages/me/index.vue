<template>
  <div>
    <div class="container">
      <div class="userinfo" v-if="userInfo">
        <img :src="userInfo.avatarUrl" alt="">
        <p>{{userInfo.nickName}}</p>
      </div>
      <div class="userinfo" v-else>
        <img src="/static/img/unlogin.png" alt="">
        <div>
          <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">点击登录</button>
        </div>
      </div>

      <YearProgress></YearProgress>
      <div>
        <button class="btn" @click="scanBook" v-if="userInfo">添加图书</button>
      </div>
    </div>
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import config from '@/config'
import {
  showSuccess,
  showLoading,
  showModal,
  post
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
      userInfo: {
        avatarUrl:'/static/img/unlogin.png'
      }
    }
  },
  async onLoad () {
    // 这个时候 不行，可能与生命周期有关系
    // this.getSetting()
  },

  async onShow () {
    this.login()
  },
  methods: {
    async addBook (ISBN) {
      // ISBN = '9787536693968'
      const res = await post('/addbook', {
        ISBN,
        openid: this.openid
      })
      if (res.code == 0 && res.data.title) {
        showModal('添加成功', `《${res.data.title}》`)
      } else {
        showModal('添加失败', `${res.data.msg}`)
      }
    },
    scanBook () {
      var self = this
      mpvue.scanCode({
        success (res) {
          if (res.result) {
            showLoading('正在核验数据...')
            self.addBook(res.result)
          }
        }
      })
    },
    getUserInfo1 () {
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
        // console.log('用户按了允许授权按钮')
        let page = getCurrentPages().pop()
        page.onShow()
      } else {
        // console.log('用户按了拒绝按钮')
      }
    },
    async login(){
      this.openid = mpvue.getStorageSync('openid')
      const login = await wx.login()
      this.code = login.code
      if (!this.openid) {
        this.getOpenid()
      }
      let user = mpvue.getStorageSync('userInfo')
      this.userInfo = user
      if (!user) {
        const setting = await wx.getSetting()
        // 是否 授权
        if (setting.authSetting['scope.userInfo']) {
          const getUserInfo = await wx.getUserInfo()
          this.userInfo = getUserInfo.userInfo
          this.userInfo.openid = this.openid
          mpvue.setStorageSync('userInfo', this.userInfo)
          console.log('用户已经授权过')
          showLoading('正在登录。。。')
          // 获取 openid
          this.getOpenid()
          // 存储 cSessionInfo 到服务器
          this.laycSession()
          showSuccess('登录成功')
        } else {
          showLoading('未获取授权')
        }
      } else {
        console.log('已登录')
      }
    },
    async getOpenid(){
      console.log('getopenid');
      
      const code2session = await wx.request({
        url: config.host + '/code2session',
        data: {
          'appid': this.appid,
          'secret': this.secret,
          'code': this.code,
        },
        method: 'get'
      })
      this.openid = code2session.data.openid
      this.session_key = code2session.data.session_key
      mpvue.setStorageSync('openid', this.openid)
    },
    async laycSession(){
      await wx.request({
        url: config.host + '/cSession',
        data: {'openid': this.openid,'session_key': this.session_key,'user_info': this.userInfo},
        method: 'get'
      })
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
      background-color: rgb(211, 211, 211);
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>
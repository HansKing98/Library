<template>
  <div>
    me
     <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button>
  </div>
</template>

<script>
import {get} from '@/utils'
export default {
  data () {
    return {}
  },
  components: {

  },
  onload(){
    // 这个时候 不行，可能与生命周期有关系
    // this.getSetting()
  },
  mounted(){
    // 一进来看看用户是否授权过
    this.getSetting()
    // 获取 code
    wx.login({
      success(res)
      {
        // console.log(res)
        wx.request({
          // 用 appid/secret/code 获取 openid 和 session_key
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid: 'wx75b76219871e0e3d',
            secret: '2d325ce12919690123f960db8caea9be',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method:"GET",
          success:function(res){
            console.log(res)
            console.log('openid : ', res.data.openid)
            get('/weapp/login', {
              'openid' :res.data.openid,
              'session_key' :res.data.session_key
            })
          }
        })
      }
    })  
  },
  async created () {
    const res = await get('/weapp/login')
    console.log('get data : ', res)
  },
  methods: {
    getSetting(){
      wx.getSetting({
        success: function(res){
          // console.log('setting', res)
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      })
    },
    getUserInfo1(){
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if(wx.canIUse('button.open-type.getUserInfo')){
        // 用户版本可用
      }else{
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
      } else {
        //用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
 },
  created () {

  }
}
</script>

<style>

</style>

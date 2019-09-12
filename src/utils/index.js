// 工具库函数

import config from '@/config'

// http get工具函数 获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    mpvue.request({
      data,
      method,
      url: config.host + url,
      success (res) {
        if (res.statusCode === 200) {
          resolve(res.data)
          console.log('请求成功：', res)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
          console.log('请求失败', res)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showLoading (text) {
  wx.showToast({
    title: text,
    icon: 'loading'
  })
}

export function showModal (text, msg) {
  wx.showModal({
    title: text,
    content: msg,
    showCancel: false,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

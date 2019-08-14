// 工具库函数

import config from '@/config'

export function get (url, data) {
  return new Promise((resolve, reject) => {
    mpvue.request({
      url: config.host + url,
      data: data,
      success (res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
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

// 工具库函数

import config from '@/config'

export function get (url, data) {
    return new Promise((reslove, reject) => {
        mpvue.request({
            url: config.host + url,
            data: data,
            success: function (res) {
                if (res.statusCode == 200) {
                    reslove(res.data)
                } else {
                    reject(res.data)
                }
            },
        })
    })
}
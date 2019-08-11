// 工具库函数

import config from './config'

export function get (url) {
    return new Promise((reslove, reject) => {
        mpvue.request({
            url: config.host + '/weapp/demo',
            success: function (res) {
                if (res.statusCode == 200) {
                    reslove(res.data)
                } else {
                    reject(res.data)
                }
                console.log(res)
            },
        })
    })
}
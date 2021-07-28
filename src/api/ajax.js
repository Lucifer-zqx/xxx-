import axios from 'axios'

export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        //发送请求
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        //成功的回调
        promise.then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
        //失败的回调
    })

}
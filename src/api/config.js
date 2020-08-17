import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'

//创建axios示例
const service = axios.create({
  //请求超时时间
  timeout: 3000
})

//请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)

// service.interceptors.response.use(
//   response => {
//     let res = {}
//     res.status = response.status
//     res.data = response.data

//     return res
//   },
//   err => console.log(err)
// )
// respone拦截器
service.interceptors.response.use(
  response => {
    console.log("------------------------------------")
    console.log(response)
    //全局统一处理 Session超时
    if (response.headers['session_time_out'] == 'timeout') {
      store.dispatch('fedLogOut')
    }

    const res = response.data;
    console.log(res)
    //0 为成功状态
    if (res.code !== 20000) {
      console.log("------------------------------------"+res.code)
      //90001 Session超时
      if (res.code === 90001) {
        return Promise.reject('error');
      }

      //20001 用户未登录
      if (res.code === 20001) {
        console.info("用户未登录")

        Message({
          type: 'warning',
          showClose: true,
          message: '未登录或登录超时，请重新登录哦'
        })

        return Promise.reject('error');
      }

      //70001 权限认证错误
      if (res.code === 70001) {
        console.info("权限认证错误")
        Message({
          type: 'warning',
          showClose: true,
          message: '你没有权限访问哦'
        })
        return Promise.reject('error');
      }

      //999 用户不存在
      if (res.code === 999) {
        console.info("用户或密码不正确")
        Message({
          type: 'warning',
          showClose: true,
          message: '用户或密码不正确'
        })
        return Promise.reject('error');
      }


      return Promise.reject(res.msg);
    } else {
      console.log("++++++++++++++++++++++++++")
      return response.data;
    }
  },
  error => {
    Message({
      type: 'warning',
      showClose: true,
      message: '连接超时'
    })
    return Promise.reject('error')
  })
export default service

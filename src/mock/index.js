import Mock from 'mockjs'
import homeApi from './home'

//设置延时
Mock.setup({
  timeout: '200-2000'
})

//首页相关
Mock.mock(/\/home\/getStatisticalData/, 'get', homeApi.getStatisticalData)

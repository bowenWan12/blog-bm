import request from '@/request/config.js'

export function getStatisticalData() {
  return request({
    url: '/home/main',
    method: 'get'
  })
}
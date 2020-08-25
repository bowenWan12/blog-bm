import request from '@/request/config.js'

export function getmenu() {
  return request({
    url: '/main',
    method: 'get'
  })
}
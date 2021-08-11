import { request } from './request'

// 获取订单数据列表
export function getOrdersListInfo(params) {
  return request({
    url: '/orders',
    params
  })
}

import { request } from './request'
// 获取菜单数据请求
export function getMenusData() {
  return request({
    url: '/menus'
  })
}


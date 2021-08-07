import { request } from './request'

export function getMenusData() {
  return request({
    url: '/menus'
  })
}

export function getUsersData(config) {
  return request({
    url: '/users',
    // url参数
    params: config
  })
}
 
export function putUsersInfo(uId, type) {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}

export function postNewUserInfo(userInfo) {
  return request({
    url: '/users',
    method: 'post',
    data: userInfo
  })
}
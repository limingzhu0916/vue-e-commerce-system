import { request } from './request'
// 获取用户数据
export function getUsersData(config) {
  return request({
    url: '/users',
    // url参数
    params: config
  })
}
// 更新用户状态请求
export function putUsersInfo(uId, type) {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}
// 添加新用户信息请求
export function postNewUserInfo(userInfo) {
  return request({
    url: '/users',
    method: 'post',
    data: userInfo
  })
}
// 通过id获取用户信息请求
export function getUserInfoById(id) {
  return request({
    url: '/users/' + id,
  })
}
// 将修改用户信息更新到服务器
export function putNewUserInfo(id, userInfo) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data: userInfo
  })
}
// 删除用户信息请求
export function deleteUserInfo(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}
// 将用户分配的角色提交到服务器
export function putUsersRoleInfo(id, rid) {
  return request({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}
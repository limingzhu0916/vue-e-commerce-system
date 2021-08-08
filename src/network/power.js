import { request } from './request'
// 获取权限列表数据请求
export function getAllRights(type) {
  return request({
    url: '/rights/' + type,
  })
}
// 获取角色列表数据请求
export function getAllRoles() {
  return request({
    url: '/roles'
  })
}
// 将新角色信息添加到数据库
export function postNewRoleInfo(info) {
  return request({
    url: '/roles',
    method: 'post',
    data: info
  })
}
// 根据id查询角色信息
export function getRoleInfoById(id){
  return request({
    url: '/roles/' + id,
  })
}
// 将修改的角色信息提交到数据库
export function putNewRoleInfo(id, info){
  return request({
    url: '/roles/' + id,
    method: 'put',
    data: info
  })
}
// 删除角色指定权限
export function deleteRoleRight(roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 将为角色分配的权限提交到服务器
export function postRoleRightsInfo(roleId, rids) {
  return request({
    url: `/roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}

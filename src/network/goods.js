import { request } from './request'
// 获取商品分类数据列表
export function getCateListInfo(queryInfo) {
  return request({
    url: '/categories',
    params: queryInfo
  })
}
// 添加分类数据
export function postNewCate(cateInfo){
  return request({
    url: '/categories',
    method: 'post',
    data: cateInfo
  })
}
// 根据id查询分类
export function getCateById(id){
  return request({
    url: '/categories/' + id,
  })
}
// 编辑分类提交请求
export function putNewCateName(id, cateName) {
  return request({
    url: '/categories/' + id,
    method: 'put',
    data: cateName
  })
}

// 删除分类请求
export function deleteCateName(id){
  return request({
    url: '/categories/' + id,
    method: 'delete'
  })
}
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
// 获取分类参数列表
export function getCateAttrInfo(id, sel) {
  return request({
    url: `categories/${id}/attributes`,
    params: sel
  })
}
// 添加动态参数或者静态属性请求
export function postGoodsParamsInfo(id, data){
  return request({
    url: `categories/${id}/attributes`,
    method: 'post',
    data
  })
}
//  根据 ID 查询参数
export function getParamsById(id, attrId, params){
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    params
  })
}
// 将编辑的参数提交到服务器
export function putNewParamsInfo(id, attrId, data) {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'put',
    data
  })
}
// 根据id 删除参数
export function deleteParamsById(id, attrId) {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'delete',
  })
}
// 编辑提交参数
export function putEditParamsInfo(id, attrId, data) {
  return request({
    url: `/categories/${id}/attributes/${attrId}`,
    method: 'put',
    data
  })
}

export function getGoodListInfo(params) {
  return request({
    url: '/goods',
    params
  })
}
// 根据商品id删除
export function deleteGoodsById(id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}
// 添加商品
export function postNewGoodsInfo(data){
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}
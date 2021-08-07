import { request } from "./request";

// 登录请求
export function postLogin(loginData) {
  return request({
    url: '/login',
    // 请求方法
    method: 'post',
    // 请求体
    data: loginData
  })
}
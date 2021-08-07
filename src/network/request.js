import axios from 'axios'

// 封装axios
export function request(config) {
  const instance1 = axios.create({
    baseURL: "http://127.0.0.1:8888/api/private/v1/",
    timeout: 5000
  })

  // 响应拦截
  // instance1.interceptors.response.use(res => {
  //   // Do something before response is sent
  //   return res;
  // }, error => {
  //   // Do something with response error
  //   return Promise.reject(error);
  // });

  return instance1(config)
}
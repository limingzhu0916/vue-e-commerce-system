import {request} from './request'

export function getReportsDate() {
  return request({
    url: 'reports/type/1'
  })
}
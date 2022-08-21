import { request } from "./request"
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//首页的流行新款精选
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

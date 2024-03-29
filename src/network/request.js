import axios from "axios";

export function request(config) {
  // 1. 创建axios的实例
  const instance = axios.create({
    // baseURL: "http://123.207.32.32:8000",
    // baseURL:'http://152.136.185.210:7878/api/m5',
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2. axios的拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  //响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    //一般会取出data
    // res.data
    return res.data
  }, err => {

  });

  // 3. 发送真正的网络请求
  return instance(config)
}


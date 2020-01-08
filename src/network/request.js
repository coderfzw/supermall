import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = new axios.create({
    baseURL: 'http://123.207.32.32:8000/api/w1',
    timeout: 5000
  })

  //2.axiox的拦截器
  //2.1请求拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {

  })

  //2.2响应拦截器
  instance.interceptors.response.use(config => {
    return config
  },err => {

  })

  return instance(config)
}
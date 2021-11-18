// import axios from 'axios'
import axios from 'axios'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:3000',
  withCredentials: true // 允许跨域
})

// 设置请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.error(error)
})

// 设置响应拦截器
instance.interceptors.response.use(config => {
  return config.data
}, error => {
  return Promise.error(error)
})

export default instance

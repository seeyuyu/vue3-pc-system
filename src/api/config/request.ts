import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '../../utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

service.interceptors.response.use(response => {
  const { code, message } = response.data
  if (code !== 0) {
    ElMessage.error(message)
    return Promise.reject(message)
  }
  return response.data
}, err => {
  const res = err?.response
  if (res && res.status === 401) {
    store.dispatch('user/resetToken').then(() => {
      window.location.reload()
    })
  }
  ElMessage.error(err.message)
  console.log('err is', err)
  return Promise.reject(err)
})

export default service

import axios from 'axios'
import { message } from 'antd'

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

// 创建 axios 实例
const httpRequest = axios.create({
  timeout: 30 * 1000, // 请求超时时间
})

const errorHandler = (error: any) => {
  console.log('error', error)
  const { response } = error
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    message.error(errorText)
  } else if (!response) {
    message.error('您的网络发生异常，请检查设备')
  }
  return Promise.reject(error)
}

// 请求拦截器
httpRequest.interceptors.request.use((config) => {
  // const token = localStorage.getItem('auth_token')
  const token =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0OTAyNDk1NSwiaWF0IjoxNzQ4OTM4NTU1fQ.KtHJUYmRcZwT3bUKbPrPYKNzA7LlWAqLfEOg_BMaZ-wEQ9AyqB7uUGe4Z9f9gw2c4Ecvgf3_f062XV_wR4bnUg'

  // 附加 发给服务器的Token
  if (token) {
    ;(config as any).headers.Authorization = token
    ;(config as any).headers.token = token
    ;(config as any).headers['ngrok-skip-browser-warning'] = true
  }
  return config
}, errorHandler)

// 响应拦截器
httpRequest.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res?.code !== '0') {
      if (res?.return_code === 0) {
        return response
      }
    }
    return response
  },
  (error) => errorHandler(error)
)

export default httpRequest

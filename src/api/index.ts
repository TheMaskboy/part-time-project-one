import type { AxiosResponse } from 'axios'
import axios from '../utils/http'

interface Response<R> {
  code: string
  data: R
  message: string
}

//处理业务上的通用代码
const handleServerResponse = <R>(res: AxiosResponse<Response<R>>) => {
  switch (res.data.code) {
    case '0':
      return res.data.data
    default:
      return Promise.reject({ code: res.data.code, message: res.data.message })
  }
}

export const get = async <T, R>(url: string, params?: T): Promise<R> => {
  try {
    const res = await axios.get<T, AxiosResponse<Response<R>>>(url, { params })
    return handleServerResponse<R>(res)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const post = async <T, R>(url: string, body?: T): Promise<R> => {
  try {
    const res = await axios.post<T, AxiosResponse<Response<R>>>(url, body)
    return handleServerResponse<R>(res)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const put = async <T, R>(url: string, body: T): Promise<R> => {
  try {
    const res = await axios.put<T, AxiosResponse<Response<R>>>(url, body)
    return handleServerResponse<R>(res)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const Delete = async <T, R>(url: string): Promise<R> => {
  try {
    const res = await axios.delete<T, AxiosResponse<R>>(url)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

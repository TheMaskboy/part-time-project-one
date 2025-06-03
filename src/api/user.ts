import { get, post } from '.'
import type { LoginRequest } from '../type/people'

export const getUserList = () => get<{}, {}>('/api/people/queryPage')

export const apiPostLogin = (params: LoginRequest) =>
  post<LoginRequest, {}>('/api/login', params)

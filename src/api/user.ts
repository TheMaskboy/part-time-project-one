import { Delete, get, post } from '.'
import type { PaginationResponse } from '../type/axios'
import type { apiGetUserListRequest, LoginRequest, PeopleEditType, PeopleItem, UserLoginDetailType } from '../type/people'

export const getUserList = (params: apiGetUserListRequest) => {
  return get<apiGetUserListRequest, PaginationResponse<PeopleItem>>(`/api/people/queryPage`, params)
}


export const apiPostLogin = (params: LoginRequest) =>
  post<LoginRequest, {}>('/api/login', params)

export const getUserDetail = () =>
  get<{}, UserLoginDetailType>("/api/getUserDetail")

export const apiPostCreateUser = (params: PeopleEditType) =>
  post<PeopleEditType, {}>('/api/people/createOrUpdate', params)

export const apiGetUserDetail = (id: number) =>
  get<{ id: number }, PeopleItem>('/api/people/queryById', { id })


export const apiPostDeleteUser = (id: number) =>
  Delete<{ id: number }, {}>(`/api/people/delete?id=${id}`,)
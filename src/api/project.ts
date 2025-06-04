import { Delete, get, post } from '.'
import type { PaginationResponse } from '../type/axios'
import type {
  ProjectCreateReq,
  ProjectItem,
  ProjectListReq,
  ProjectStatusNum,
  ProjectUpdateStatusReq,
} from '../type/project'

export const apiPostProjectCreate = (params: ProjectCreateReq) =>
  post<ProjectCreateReq, {}>('/api/project/createOrUpdate', params)

export const apiGetProjectList = (params: ProjectListReq) =>
  get<ProjectListReq, PaginationResponse<ProjectItem>>(
    '/api/project/queryPage',
    params
  )

export const apiGetProjectDetail = (id: number) =>
  get<{ id: number }, ProjectItem>('/api/project/queryById', { id })

export const apiPostUpdateProjectStatus = (params: ProjectUpdateStatusReq) =>
  post<ProjectUpdateStatusReq, ProjectItem>('/api/project/updateStatus', params)

export const apiPostDeleteProject = (id: number) =>
  Delete<{ id: number }, {}>(`/api/project/delete?id=${id}`)

export const apiGetStatusClassStatic = () =>
  get<{}, ProjectStatusNum>('/api/project/statusClassStatic')

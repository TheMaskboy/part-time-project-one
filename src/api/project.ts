import { Delete, get, post } from '.'
import type { PaginationResponse } from '../type/axios'
import type { PeopleItem } from '../type/people'
import type {
  LookUserOfProjectItem,
  LookUserOfProjectReq,
  ProjectCreateReq,
  ProjectEditPeopleReq,
  ProjectItem,
  ProjectListReq,
  ProjectPeopleListReq,
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

// 查询项目参与人员
export const apiGetPeopleOfProject = (params: ProjectPeopleListReq) =>
  get<ProjectPeopleListReq, PaginationResponse<PeopleItem>>('/api/people/queryProjectPeoplePage', params)

// 删除项目参与人员
export const apiPostDeletePeopleOfProject = (params: ProjectEditPeopleReq) =>
  post<ProjectEditPeopleReq, {}>(`/api/project/batchDeletePeople`, params)

// 增加项目参与人员
export const apiPostAddPeopleOfProject = (params: ProjectEditPeopleReq) =>
  post<ProjectEditPeopleReq, {}>('/api/project/batchAddPeople', params)

// 上传图片
export const apiPostUploadImage = (params: any) =>
  post<{ file: File }, string>('/api/upload', params)

// 查询项目浏览用户
export const apiGetLookUserOfProject = (params: LookUserOfProjectReq) =>
  get<LookUserOfProjectReq, PaginationResponse<LookUserOfProjectItem>>('/api/browseLog/queryPageByProjectId', params)

// 查询项目浏览次数
export const apiGetViewCount = (projectId: number) =>
  get<{ projectId: number }, number>('/api/browseLog/projectBrowseCount', { projectId })
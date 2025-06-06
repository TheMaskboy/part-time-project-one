export interface PeopleItem {
  nickname: string // 用户名称
  id: number // 用户ID
  ids: number[]
  birthday: string // 生日
  height: CustomType // 身高
  weight: CustomType // 体重
  image: CustomType // 照片
  propertyVos: CustomType[]
}

export interface CustomType {
  name: string
  value: string
  show: number
  peopleId?: number
  id?: number
}

export interface PeopleEditType {
  nickname: string // 用户名称
  id?: number // 用户ID
  birthday: string // 生日
  height: CustomType
  weight: CustomType
  image?: CustomType
}

export interface PeopleLookCount {
  id: number
  name: string
  phone: string
}

export interface PeopleDetailType {
  nickname: string // 用户名称
  id: number // 用户ID
  age: string // 年龄
  birthday: string // 生日
  height: CustomType // 身高
  weight: CustomType // 体重
  image: CustomType // 照片
  custom: CustomType[]
}

export interface LoginRequest {
  account: string
  password: string
}

export interface UserLoginDetailType {
  id: number
  account: string
}

export interface apiGetUserListRequest {
  current: number
  size: number
  id?: string
  nickname?: string
  projectId?: number
}

export interface UpdatePropertyReq {
  propertyId: number // 用户ID
  show: number
}


export interface LoginUserListReq {
  phone?: string
  nickname?: string
  current: number
  size: number
}

export interface LoginUserListItem {
  id: number
  ids: number[]
  phone: string
  nickname: string
  lastLoginTime: string
}
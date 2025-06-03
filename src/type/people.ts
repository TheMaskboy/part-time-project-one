export interface PeopleItem {
  nickname: string // 用户名称
  id: number // 用户ID
  age: string // 年龄
  birthday: string // 生日
  height: CustomType // 身高
  weight: CustomType // 体重
  image: CustomType // 照片
}

export interface LoginPeopleItem {
  nickname: string // 用户名称
  id: number // 用户ID
  age: string // 年龄
  birthday: string // 生日
  height: CustomType // 身高
  weight: CustomType // 体重
  image: CustomType // 照片
}

export interface CustomType {
  name: string
  value: string
  show: number
}

export interface PeopleEditType {
  nickname: string // 用户名称
  id: number // 用户ID
  age: string // 年龄
  birthday: string // 生日
  propertyVos: CustomType[]
  height: {
    // 身高
    value: string
    isPubilc: number // 0 隐藏 1 公开
  }
  weight: {
    // 体重
    value: string
    isPubilc: number // 0 隐藏 1 公开
  }
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

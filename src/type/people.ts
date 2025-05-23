export interface PeopleItem {
  name: string // 用户名称
  id: number // 用户ID
  age: string // 年龄
  birthday: string // 生日
  raise: string // 身高
  weight: string // 体重
  photo: string // 照片
}

export interface PeopleEditType {
  name: string // 用户名称
  id: number // 用户ID
  age: string // 年龄
  birthday: string // 生日
  raise: {// 身高
    value: string,
    isPubilc: number // 0 隐藏 1 公开
  }
  weight: {// 体重
    value: string,
    isPubilc: number // 0 隐藏 1 公开
  }
}


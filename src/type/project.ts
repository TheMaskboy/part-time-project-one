export interface ProjectItem {
  name: string // 项目名称
  id: number
  status: number // 状态 1 未开始 2 招募中 3 已结束
  peopleNum: number // 参与人数
  desc: string //描述
  lookCount: number // 浏览次数
  createAt: string // 创建时间
  createName: string // 创建人
  startTime: string // 开始时间
  endTime: string // 结束时间
}

export interface ProjectCreateReq {
  id?: number
  name: string
  imageUrl?: string
  desc: string
  startTime: string
  endTime: string
  peopleIds: number[]
}

export interface ProjectListReq {
  current: number
  size: number
  name?: string
}

export interface ProjectUpdateStatusReq {
  id: number
  status: number
}

export interface ProjectStatusNum {
  noStart: number
  recruit: number
  end: number
}

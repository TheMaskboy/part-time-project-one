export interface ProjectItem {
  name: string // 项目名称
  id: number
  status: number // 状态 1 未开始 2 招募中 3 已结束
  people: number // 参与人数
  description: string //描述
  lookCount: number // 浏览次数
  cycle: string //项目周期
  createTime: string // 创建时间
}

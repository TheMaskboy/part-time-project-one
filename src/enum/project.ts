export const enum ProjuctStatus {
  NOSTART = 1,
  STARTING = 2,
  END = 3,
}

export const ProjectStatusList = [
  {
    name: '未开始',
    type: ProjuctStatus.NOSTART,
  },
  {
    name: '招募中',
    type: ProjuctStatus.STARTING,
  },
  {
    name: '已结束',
    type: ProjuctStatus.END,
  },
]

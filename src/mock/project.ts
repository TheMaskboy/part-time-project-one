import type { ProjectItem } from '../type/project'

export const ProjectLists: ProjectItem[] = [
  {
    id: 1,
    name: '第一个项目',
    status: 1,
    peopleNum: 13,
    desc: '组织10个人完成一场春游',
    lookCount: 100,
    createAt: '2025/3/18',
    createName: 'admin',
    startTime: "2025/01/02",
    endTime: "2026/01/01"
  },
  {
    id: 2,
    name: '第二个项目',
    status: 2,
    peopleNum: 130,
    desc: '组织10个人完成一场春游',
    lookCount: 130,
    startTime: "2025/01/02",
    endTime: "2026/01/01",
    createAt: '2025/3/18',
    createName: 'admin',
  },
]

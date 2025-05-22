// src/routes/index.ts
import MainLayout from '../components/mainLayout'
import type { AppRoute } from '../type/route'
import Home from '../view/project'
import ProjectCreate from '../view/project/create'
import ProjectList from '../view/project/list'

const Routes: AppRoute[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/project',
        name: '项目管理',
        auth: true,
        role: ['creator', 'admin'],
        element: <MainLayout />,
        children: [
          {
            path: 'list',
            name: '项目列表',
            auth: true,
            role: ['creator', 'admin'],
            element: <ProjectList />,
          },
          {
            path: 'create',
            name: '新建项目',
            auth: true,
            role: ['creator', 'admin'],
            element: <ProjectCreate />,
          },
        ],
      },
    ],
  },
]

export default Routes

// src/routes/index.ts
import { Navigate } from 'react-router-dom'
import MainLayout from '../components/mainLayout'
import type { AppRoute } from '../type/route'
import Home from '../view/project'
import ProjectCreate from '../view/project/create'
import ProjectList from '../view/project/list'
import UserList from '../view/user/list'
import UserCreate from '../view/user/create'

const Routes: AppRoute[] = [
  {
    path: '/',
    element: <Navigate to="/project/list"></Navigate>
  },
  {
    path: '/',
    element: <Home />,
    name: "project",
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
      {
        path: '/user',
        name: '用户管理',
        auth: true,
        role: ['creator', 'admin'],
        element: <MainLayout />,
        children: [
          {
            path: 'list',
            name: '用户列表',
            auth: true,
            role: ['creator', 'admin'],
            element: <UserList />,
          },
          {
            path: 'create',
            name: '新增用户',
            auth: true,
            role: ['creator', 'admin'],
            element: <UserCreate />,
          }
        ]
      }
    ],
  },

]

export default Routes

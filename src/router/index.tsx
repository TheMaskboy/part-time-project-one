// src/routes/index.ts
import { Navigate } from 'react-router-dom'
import MainLayout from '../components/mainLayout'
import type { AppRoute } from '../type/route'
import Home from '../components/layout'
import ProjectCreate from '../view/project/create'
import ProjectList from '../view/project/list'
import UserList from '../view/user/list'
import UserCreate from '../view/user/create'
import ProjectDetail from '../view/project/detail'
import UserDetail from '../view/user/detail'
import UserLogin from '../view/login'
import H5Layout from '../components/h5/layout'
import H5Login from '../view/h5/login'
import menuImage1 from '../assets/image/home-img-1.png'
import menuImage2 from '../assets/image/home-img-2.png'
import menuImageActive1 from '../assets/image/home-img-1-active.png'
import menuImageActive2 from '../assets/image/home-img-2-active.png'

const Routes: AppRoute[] = [
  {
    path: '/',
    element: <Navigate to="/project/list"></Navigate>,
  },
  {
    path: '/',
    element: <Home />,
    name: 'project',
    children: [
      {
        path: '/project',
        name: '项目管理',
        auth: true,
        role: ['creator', 'admin'],
        icon: menuImage1,
        iconActive: menuImageActive1,
        element: <MainLayout />,
        children: [
          {
            path: 'list',
            name: '项目列表',
            auth: true,
            role: ['creator', 'admin'],
            element: <ProjectList />,
            isShowMenu: true,
          },
          {
            path: 'create',
            name: '新建项目',
            auth: true,
            role: ['creator', 'admin'],
            element: <ProjectCreate />,
            isShowMenu: true,
          },
          {
            path: 'detail/:id',
            name: '项目详情',
            auth: true,
            role: ['creator', 'admin'],
            element: <ProjectDetail />,
          },
        ],
      },
      {
        path: '/user',
        name: '用户管理',
        auth: true,
        role: ['creator', 'admin'],
        icon: menuImage2,
        iconActive: menuImageActive2,
        element: <MainLayout />,
        children: [
          {
            path: 'list',
            name: '用户列表',
            auth: true,
            role: ['creator', 'admin'],
            element: <UserList />,
            isShowMenu: true,
          },
          {
            path: 'create',
            name: '新增用户',
            auth: true,
            role: ['creator', 'admin'],
            element: <UserCreate />,
            isShowMenu: true,
          },
          {
            path: 'detail/:id',
            name: '用户详情',
            auth: true,
            role: ['creator', 'admin'],
            element: <UserDetail />,
            isShowMenu: false,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
    name: 'login',
    children: [
      {
        path: 'login',
        element: <UserLogin />,
      },
    ],
  },
  {
    path: '/m',
    element: <H5Layout />,
    name: 'm',
    children: [
      {
        path: 'login',
        element: <H5Login />,
      },
    ],
  },
]

export default Routes

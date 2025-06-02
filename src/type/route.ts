import type { RouteObject } from 'react-router-dom'

// src/routes/types.ts
interface RouteBase {
  name?: string
  icon?: React.ReactNode
  iconActive?: React.ReactNode
  hidden?: boolean
  auth?: boolean
  role?: string[]
  children?: RouteBase[]
  isShowMenu?: boolean
}

export type AppRoute = RouteBase & RouteObject

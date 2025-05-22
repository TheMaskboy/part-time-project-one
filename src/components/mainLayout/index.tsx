import { useEffect, useState } from 'react'
import Routes from '../../router'
import type { AppRoute } from '../../type/route'
import { Menu } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import './style.scss'

const MainLayout = () => {
  const route = Routes
  const [list, setList] = useState<AppRoute[]>([])

  const { SubMenu } = Menu
  useEffect(() => {
    setList(route[0].children || [])
  }, [route])

  // 递归渲染菜单项
  const renderMenuItems = (items: AppRoute[]) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.path} icon={item.icon} title={item.name}>
            {renderMenuItems(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path || ''}>{item.name}</Link>
        </Menu.Item>
      )
    })
  }

  return (
    <div className="main">
      <div className="left-menu">
        <Menu mode="inline">{renderMenuItems(list)}</Menu>
      </div>
      <div className="right-menu">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

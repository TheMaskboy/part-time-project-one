import { useEffect, useState } from 'react'
import Routes from '../../router'
import type { AppRoute } from '../../type/route'
import { Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './style.scss'

const MainLayout = () => {
  const route = Routes
  const [list, setList] = useState<AppRoute[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()

  const { SubMenu } = Menu
  useEffect(() => {
    const result = route.filter((item) => item.name === 'project')
    result[0].children?.forEach((item) => {
      item.children = item.children?.filter((item) => !!item.isShowMenu)
    })
    setList(result[0].children || [])
  }, [route])

  // 根据当前路径自动设置展开和选中的菜单项
  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i)
    const newOpenKeys = pathSnippets.map(
      (_, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`
    )

    // 只保留父级菜单的展开状态
    setOpenKeys(newOpenKeys.slice(0, -1))
    setSelectedKeys([location.pathname])
  }, [location])

  // 处理菜单展开/收起
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey])
    } else {
      setOpenKeys([])
    }
  }

  // 递归渲染菜单项
  const renderMenuItems = (items: AppRoute[], fItem?: AppRoute) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.path} icon={item.icon} title={item.name}>
            {renderMenuItems(item.children, item)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={`${fItem?.path}/${item.path}`} icon={item.icon}>
          <Link
            to={fItem ? (fItem?.path || '') + '/' + item.path : item.path || ''}
          >
            {item.name}
          </Link>
        </Menu.Item>
      )
    })
  }

  return (
    <div className="main">
      <div className="left-menu">
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
        >
          {renderMenuItems(list)}
        </Menu>
      </div>
      <div className="right-menu">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

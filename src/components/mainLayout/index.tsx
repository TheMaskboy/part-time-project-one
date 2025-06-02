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
    setSelectedKeys(newOpenKeys.slice(0, -1))
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
  const renderMenuItems = (items: AppRoute[]) => {
    return items.map((item) => {
      return (
        <Menu.Item key={`${item?.path}`}>
          <Link
            to={
              item.path + '/' + (!!item.children ? item.children[0].path : '')
            }
          >
            <div className="custom-item">
              <div
                className="icon"
                style={{
                  backgroundImage: `url(${
                    location.pathname.includes(item.path || '')
                      ? item.iconActive
                      : item.icon
                  })`,
                }}
              />
              {item.name}
            </div>
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

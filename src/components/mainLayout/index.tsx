import { useEffect, useState } from 'react'
import Routes from '../../router'
import type { AppRoute } from '../../type/route'
import { Menu, type GetProp, type MenuProps } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './style.scss'

type MenuItem = GetProp<MenuProps, 'items'>[number];

const MainLayout = () => {
  const route = Routes
  const [list, setList] = useState<AppRoute[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()
  const [menuList, setMenuList] = useState<MenuItem[]>([])

  useEffect(() => {
    const result = route.filter((item) => item.name === 'project')
    result[0].children?.forEach((item) => {
      item.children = item.children?.filter((item) => !!item.isShowMenu)
    })
    setList(result[0].children || [])
  }, [route])

  useEffect(() => {
    if (list.length === 0) return
    const result: MenuItem[] = []
    list.forEach(item => {
      const obj = {
        key: item?.path || '',
        label: <Link
          to={
            item.path + '/' + (!!item.children ? item.children[0].path : '')
          }
        >
          <div className="custom-item">
            <div
              className="icon"
              style={{
                backgroundImage: `url(${item.path === selectedKeys[0]
                  ? item.iconActive
                  : item.icon
                  })`,
              }}
            />
            {item.name}
          </div>
        </Link>
      }
      result.push(obj)
    })
    setMenuList(result)
  }, [list, selectedKeys])

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

  return (
    <div className="main">
      <div className="left-menu">
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
          items={menuList}
        />
      </div>
      <div className="right-menu">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

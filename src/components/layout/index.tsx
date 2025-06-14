import { Outlet } from 'react-router-dom'
import Header from '../header'
import './style.scss'

const Layout = () => {
  return (
    <div className="main-layout">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout

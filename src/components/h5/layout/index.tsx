import { Outlet } from 'react-router-dom'
import H5Head from '../header'
import './style.scss'

const H5Layout = () => {
  return (
    <div className="main-layout">
      <H5Head />
      <Outlet />
    </div>
  )
}

export default H5Layout

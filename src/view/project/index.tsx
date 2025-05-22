import './style.scss'
import Header from '../../components/header'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  )
}

export default Home

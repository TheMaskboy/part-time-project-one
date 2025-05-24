import { RiArrowDownSLine, RiUserFill } from 'react-icons/ri'
import './style.scss'
import { Popover } from 'antd'

const Header = () => {
  const content = () => {
    return <div>退出登录</div>
  }

  return (
    <div className="header">
      <div className="logo">项目管理系统</div>
      <div className="right">
        <Popover content={content} trigger="hover">
          <div className="user-detail">
            <RiUserFill />
            <div className="username">master</div>
            <RiArrowDownSLine />
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default Header

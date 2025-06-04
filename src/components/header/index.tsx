import { RiArrowDownSLine, RiUserFill } from 'react-icons/ri'
import './style.scss'
import { message, Popover } from 'antd'
import { useEffect, useState } from 'react'
import type { UserLoginDetailType } from '../../type/people'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const [userDetail, setUserDetail] = useState<UserLoginDetailType | null>()
  const navigate = useNavigate()

  const content = () => {
    return <div onClick={loginOut} style={{ cursor: "pointer" }}>退出登录</div>
  }

  const loginOut = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("userDetail")
    navigate("/login")
    setUserDetail(null)
    message.success("退出登录成功")
  }

  useEffect(() => {
    const detail = localStorage.getItem("userDetail")
    !!detail && setUserDetail(JSON.parse(detail))
  }, [])

  return (
    <div className="header">
      <div className="logo">项目管理系统</div>
      <div className="right">
        {
          !!userDetail && <Popover content={content} trigger="hover">
            <div className="user-detail">
              <RiUserFill />
              <div className="username">{userDetail.account}</div>
              <RiArrowDownSLine />
            </div>
          </Popover>
        }
        {
          !userDetail && <div className='login-word' onClick={() => navigate("/login")}>登录</div>
        }
      </div>
    </div>
  )
}

export default Header

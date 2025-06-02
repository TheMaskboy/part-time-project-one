import { useState, useEffect } from 'react'
import WeChatHelper from '../../../utils/chat'

const H5Login = () => {
  const [userInfo, setUserInfo] = useState<{
    nickName?: string
    phoneNumber?: string
    loading: boolean
    error?: string
  }>({ loading: false })

  // 初始化微信配置和获取用户信息
  useEffect(() => {
    const init = async () => {
      if (!WeChatHelper.isWeChatBrowser()) {
        setUserInfo((prev) => ({ ...prev, error: '请在微信中打开' }))
        return
      }

      try {
        setUserInfo((prev) => ({ ...prev, loading: true }))

        // 1. 初始化微信配置
        await WeChatHelper.initWxConfig()

        // 2. 检查URL中是否有code参数（微信授权回调）
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        if (code) {
          // 3. 获取用户基本信息
          const info = await WeChatHelper.getUserInfo(code)
          setUserInfo((prev) => ({ ...prev, nickName: info.nickName }))

          // 清除URL中的code参数
          window.history.replaceState({}, '', window.location.pathname)
        } else {
          // 如果没有code，跳转授权页面
          WeChatHelper.redirectToWeChatAuth()
        }
      } catch (error) {
        setUserInfo((prev) => ({ ...prev, error: '获取用户信息失败' }))
      } finally {
        setUserInfo((prev) => ({ ...prev, loading: false }))
      }
    }

    init()
  }, [])

  // 获取手机号
  const handleGetPhoneNumber = async (e: any) => {
    console.log(234)
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      setUserInfo((prev) => ({ ...prev, error: '用户拒绝提供手机号' }))
      return
    }

    try {
      setUserInfo((prev) => ({ ...prev, loading: true }))
      const { phoneNumber } = await WeChatHelper.getPhoneNumber(
        e.detail.encryptedData,
        e.detail.iv
      )
      setUserInfo((prev) => ({ ...prev, phoneNumber }))
    } catch (error) {
      setUserInfo((prev) => ({ ...prev, error: '获取手机号失败' }))
    } finally {
      setUserInfo((prev) => ({ ...prev, loading: false }))
    }
  }

  return (
    <div className="user-info">
      {userInfo.loading && <div className="loading">加载中...</div>}
      {userInfo.error && <div className="error">{userInfo.error}</div>}

      <div className="info-item">
        <label>昵称:</label>
        <span>{userInfo.nickName || '未获取'}</span>
      </div>

      <div className="info-item">
        <label>手机号:</label>
        <span>{userInfo.phoneNumber || '未获取'}</span>
      </div>

      <button
        className="get-phone-btn"
        onClick={() => {
          // 在React中，我们需要手动触发微信按钮
          const btn = document.createElement('button')
          btn.setAttribute('open-type', 'getPhoneNumber')
          btn.style.display = 'none'
          btn.onclick = (e) => {
            e.preventDefault()
            e.stopPropagation()
          }
          document.body.appendChild(btn)
          btn.click()
          document.body.removeChild(btn)
        }}
        onGetPhoneNumber={handleGetPhoneNumber}
      >
        获取手机号
      </button>
    </div>
  )
}

export default H5Login

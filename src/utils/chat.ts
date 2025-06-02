import axios from 'axios'
import wx from 'weixin-js-sdk'

// 微信配置接口
interface IWxConfig {
  debug?: boolean
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
  jsApiList: any[]
}

// 用户信息接口
interface IUserInfo {
  nickName?: string
  avatarUrl?: string
  phoneNumber?: string
}

class WeChatHelper {
  private static appId = 'wxe3c99841583fc124'

  // 初始化微信配置
  public static async initWxConfig(): Promise<void> {
    try {
      // 从后端获取微信配置
      const { data } = await axios.get('/api/wechat/config', {
        params: { url: window.location.href.split('#')[0] },
      })

      const config: IWxConfig = {
        // debug: process.env.NODE_ENV === 'development',
        appId: this.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['getPhoneNumber'],
      }

      return new Promise((resolve, reject) => {
        wx.config(config)
        wx.ready(() => resolve())
        wx.error((err: any) => reject(err))
      })
    } catch (error) {
      console.error('微信配置失败:', error)
      throw error
    }
  }

  // 获取用户基本信息（昵称、头像等）
  public static async getUserInfo(code: string): Promise<IUserInfo> {
    try {
      const { data } = await axios.get('/api/wechat/userinfo', {
        params: { code },
      })
      return {
        nickName: data.nickname,
        avatarUrl: data.headimgurl,
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  // 获取用户手机号
  public static async getPhoneNumber(
    encryptedData: string,
    iv: string
  ): Promise<{ phoneNumber: string }> {
    try {
      const { data } = await axios.post('/api/wechat/phone', {
        encryptedData,
        iv,
      })
      return { phoneNumber: data.phoneNumber }
    } catch (error) {
      console.error('获取手机号失败:', error)
      throw error
    }
  }

  // 检查是否微信环境
  public static isWeChatBrowser(): boolean {
    return /micromessenger/i.test(navigator.userAgent)
  }

  // 跳转微信授权页面
  public static redirectToWeChatAuth(): void {
    const redirectUri = encodeURIComponent(window.location.href)
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    window.location.href = authUrl
  }
}

export default WeChatHelper

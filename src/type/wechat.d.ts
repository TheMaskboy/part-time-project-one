import 'react'

declare module 'react' {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    // 微信开放标签属性
    'open-type'?: string
    onGetPhoneNumber?: (e: WechatGetPhoneNumberEvent) => void
  }
}

interface WechatGetPhoneNumberEvent {
  detail: {
    errMsg: string
    encryptedData?: string
    iv?: string
  }
}

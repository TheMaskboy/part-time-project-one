import qs from 'query-string'

// 判断是否为手机端
export const isMobile = () => {
  let flag = false,
    userAgentInfo = navigator.userAgent,
    Agents = [
      'phone',
      'pad',
      'MiuiBrowser',
      'pod',
      'iPhone',
      'iPod',
      'ios',
      'iPad',
      'Android',
      'Mobile',
      'BlackBerry',
      'IEMobile',
      'MQQBrowser',
      'JUC',
      'Fennec',
      'wOSBrowser',
      'BrowserNG',
      'WebOS',
      'Symbian',
      'Windows Phone',
    ]
  for (let a = 0; a < Agents.length; a++) {
    if (userAgentInfo.indexOf(Agents[a]) >= 0) {
      flag = true
      break
    }
  }
  return flag
}

// 获取当前路由query 并添加内容跳转
export const queryUrl = (params: object) => {
  const query = qs.parse(window.location.search)
  const obj = Object.assign(query, params)
  Object.keys(obj).forEach((item) => {
    if (!obj[item]) {
      delete obj[item]
    }
  })
  return qs.stringify(obj)
}


export const isFileOversized = (file: File,limit:number) => {
  return file.size / 1024 / 1024 > limit
}
import { rewriteRouter } from './rewriteRouter'
import { setList } from './const/subApps'

export const registerMicroApps = (appList) => {
  setList(appList)
}

export const start = () => {
  // 1. 监视路由变化
  rewriteRouter()
  // 2. 匹配子应用: 获取当前的路由路径、apps中查找
  // 3. 加载子应用
  // 4. 渲染子应用
}

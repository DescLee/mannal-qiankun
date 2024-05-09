import { handleRouter } from './handleRouter';

let prevRoute = ''                        //上一个路由
let nextRoute = window.location.pathname  //下一个路由

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

export const rewriteRouter = () =>{
  //1.监视路由的变化
  //  hash路由 window.onhashchange
  //  history路由
  //      history.go、history.back、history.forword 使用popstate事件：window.onpopstate 
  window.addEventListener('popstate',()=>{
    prevRoute = nextRoute
    nextRoute = window.location.pathname
    handleRouter()
  })

  //pushState、及repalceState  popstate事件监听不到，我们需要重写pushState、及repalceState的原生方法
  const rawPushState = window.history.pushState
  window.history.pushState = (...args) =>{
    // 导航前
    prevRoute = window.location.pathname
    rawPushState.apply(window.history, args) // 真正的改变历史记录
    // 导航后
    nextRoute = window.location.pathname   
    handleRouter()
  }
  const rawReplaceState = window.history.replaceState
  window.history.repalceState = (...args) =>{
    // 导航前
    prevRoute = window.location.pathname
    rawReplaceState .apply(window.history,args)
    // 导航后
    nextRoute = window.location.pathname   
    handleRouter()
  }

}

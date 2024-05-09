//处理路由变化
import { getList } from './const/subApps'
import { importHTML } from './importHtml';
import { getNextRoute, getPrevRoute } from './rewriteRouter'

//获取子应用的配置列表，用于路由匹配
export const handleRouter = async () => {
    // 1. 获取子路由配置信息
    const apps = getList()
    // 2. 匹配子应用
    // 卸载上一个路由
    const prevApp = apps.find(item => getPrevRoute().startsWith(item.activeRule))
    if (prevApp) {
        await unmount(prevApp)
    }
    // 加载下一个路由
    const app = apps.find(item => getNextRoute().startsWith(item.activeRule))
    console.log('app', app)

    if (!app) {
        return
    }

    // 3. 加载子应用
    // 请求子应用的HTML/css/js
    // const html = await fetch(app.entry).then(res => res.text())
    // const container = document.querySelector(app.container)
    // container.innerHTML = html
    // 3.1 获取的HTML插入容器中
    const { template, getExternalScripts, execScripts } = await importHTML(app.entry)
    const container = document.querySelector(app.container)
    container.appendChild(template)

    // 3.2 执行获取的JS内容，返回子应用的生命周期函数
    const appExPports = await execScripts()
    const propList = ['bootstrap', 'mount', 'unmount']
    
    // 配置全局变量
    window.__MICRO_WEB__ = true

    // 3.3 获取的生命周期存储在app上
    propList.forEach(propName => {
        app[propName] = appExPports[propName]
    })

    // 3.4 执行生命周期函数
    await bootstrap(app)
    await mount(app)
    // console.log('appExPports', appExPports)
}

async function bootstrap (app) {
    app.bootstrap && (await app.bootstrap())
}
async function mount(app){
    app.mount && (await app.mount({
        container: document.querySelector(app.container)
    }))
}
async function unmount(app){
    app.unmount && (await app.unmount({
        container: document.querySelector(app.container)
    }))
}
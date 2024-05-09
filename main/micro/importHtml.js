import { fetchSource } from './fetchSource';

export const importHTML = async (url) => {
  // 获取html模板
  const html = await fetchSource(url)
  const template = document.createElement('div')
  template.innerHTML = html

  // 获取所有script标签代码
  const scripts = template.querySelectorAll('script')
  function getExternalScripts() {
    return Promise.all(Array.from(scripts).map(script => {
      // 获取src属性
      const src = script.getAttribute('src')
      // 加载script的js代码
      if (!src) {
        return Promise.resolve(script.innerHTML)
      } else {
        return fetchSource(
          src.startsWith('http') ? src : `${url}${src}`
        )
      }
    }))
  }
  // 打印获取的script标签内容
  // getExternalScripts().then(scripts => {
  //   console.log('3.2 获取所有scripts代码', scripts)
  // })

  // 执行所有js脚本
  async function execScripts() {
    const scriptList = await getExternalScripts()
    // 手动创建一个commonJS环境: 这里确实没看明白为什么
    const module = { exports: {} }
    const exports = module.exports
    scriptList.forEach(scriptItem => {
      eval(scriptItem)
    })

    // console.log(window['sub1'])

    return module.exports
  }

  return {
    template,
    getExternalScripts,
    execScripts
  }
}
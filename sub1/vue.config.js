const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const pkg = require('./package.json')

const port = 9001
const config = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    hot: true,                                    //热更新
    port,                                          //端口
    headers: {                                     //本地服务可以被跨域调用，主应用可以拿到子应用的数据
      'Access-Control-Allow-Origin': '*', 
    },
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      libraryTarget: 'umd',                          //umd格式  支持comm.js引入  浏览器、node可以识别
      filename: `[name].js`,                           //打包出的文件名称
      library: pkg.name                               //全局可以通过window.vue2拿到的应用
    },
  },
})

module.exports = {
  ...config,
}

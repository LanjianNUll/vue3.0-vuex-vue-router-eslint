const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const resolve = function(dir) {
  return path.join(__dirname, dir)
}
// 打包路径
let distOutputDir = 'dist'
// 引入应用配置
let pages = require('./pageConfig/index')
const pkg = require('./package')
// 给项目加上版本号以及打包日期
pages.index.version = pkg.version
pages.index.buildDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() +
  ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: './',
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    requireModuleExtension: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {},
      less: {},
      sass: {
        prependData: `
        @import "@/assets/styles/varibles.scss";
        `
      }
    }
  },
  pages: pages,
  outputDir: distOutputDir,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') { // 开发环境配置
      config.devtool = 'source-map'
    }
    config.externals = {
      // echart 按需引入,可在官网定制需要的组件,通过index.html 引入js库, 在vue 可用import 使用
      // 'echarts': 'echarts'
    }
  },
  devServer: {
    disableHostCheck: true, // 花生壳显示Invalid Host header让其不检查hostname。
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/oort': {
        target: 'http://192.168.123.49:10080/oort',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/oort': ''
        }
      }
    }
  },
  // 配置指定打包文件夹-
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    if (process.env.REPORT === '1') {
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    if (process.env.GZ_OFF !== '1') {
      // 开启js、css压缩
      if (process.env.NODE_ENV === 'production') {
        config.plugin('compressionPlugin')
          .use(new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          }))
      }
    }
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

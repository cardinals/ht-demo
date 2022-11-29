/*
 * @Description:
 * @Author: licongzheng
 * @Date: 2022-01-27 09:43:53
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 09:43:10
 * @FilePath: /TechAdmin/vue.config.js
 */
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');

//压缩文件类型
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'html', 'less'];

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  // ie 11兼容
  configureWebpack: config => {
    config.entry = ['babel-polyfill', './src/main.js'];
  },
  chainWebpack: config => {
    config.module
      // svg配置
      .rule('Snap')
      .test(require.resolve('snapsvg/dist/snap.svg.js'))
      .use('imports-loader')
      .loader('imports-loader?this=>window,fix=>module.exports=0');
    config.resolve.alias.set('snapsvg', 'snapsvg/dist/snap.svg.js');

    config.module
      .rule('url-loader')
      .test(/\.(cur)$/)
      .use('url-loader')
      .loader('url-loader')
      .end();
  },
  configureWebpack: {
    plugins: [
      // gzip压缩
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      new WebpackBar(),
      // 设置环境变量信息
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify('5fa3b9'),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: '1+1',
        'typeof window': JSON.stringify('object'),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({ //配置项，详见官方文档
            //以设计稿为例宽度1920   那么换算基数就是 1920/24=80  24是将屏幕分成24等份
            remUnit: 80 // 换算的基数
          })
        ]
      }
    },
    requireModuleExtension: true
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 9001, //端口号
    https: false,
    hotOnly: true, //热更新
    before: app => { },
    // 配置代理的方式一：不完美配置
    // proxy:"http://localhost:5000" //开启代理服务器
    // 配置代理的方式二：完美配置
    proxy: {
      // '/testproxy': {
      //   target: 'http://localhost:5000',
      //   pathRewrite:{'^/testproxy':''},
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/testproxy2': {
      //   target: 'http://localhost:5001',
      //   pathRewrite:{'^/testproxy2':''},
      //   ws: true,
      //   changeOrigin: true
      // },
      '/testproxy': {
        target: 'http://113.200.148.74:8081',
        pathRewrite:{'^/testproxy':''},
        ws: true,
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/color.less')]
    }
  },
};

/*
 * @Descripttion: 公共状态
 * @Author: licongzheng
 * @Date: 2020-07-15 12:45:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-16 16:02:13
 */
export default {
  namespaced: true,
  state: {
    // 后台路径
    baseUrl: null,
    // 主题路径
    themePath: null,
    // 开发模式
    develop: process.env.NODE_ENV === 'development' ? true : false,
    // 面包屑
    crumbs: null,
    // 当前主题
    currentTheme: null,

    htVideoState: false,
    htvideoId: null,

    showSide:false
  },

  mutations: {
    setHtVideoState(state, bool) {
      state.htVideoState = bool
    },

    setHtvideoId(state, str) {
      state.htvideoId = str
    },
    
    setBaseUrl(state, url) {
      state.baseUrl = url
    },

    setThemeUrl(state, url) {
      state.themePath = url
    },

    setCurrentTheme(state, theme) {
      state.currentTheme = theme
    },

    setDevelop(state, bool) {
      state.develop = bool
    },

    setCrumbs(state, crumb) {
      state.crumbs = crumb
    }
  }
}
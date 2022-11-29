import dev from './devUrl'
import store from '@/store'

const url = store.state.common.baseUrl ? store.state.common.baseUrl : dev.urls[0].baseUrl
/**
 * @description: 环境判断
 */
const isDevelop = process.env.NODE_ENV === 'development' ? true : false

export default {
  isDev: isDevelop,
  /**
   * @description 项目地址
   */
  baseUrl: isDevelop ? url : cfg.baseUrl,
  /**
   * @description 登录页
   */
  // loginPage: cfg.loginPage,
}
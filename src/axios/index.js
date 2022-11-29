/*
 * @Descripttion: 
 * @Author: licongzheng
 * @Date: 2020-07-14 09:59:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-19 17:05:16
 */
import axios from 'axios'
import { Promise } from 'es6-promise'
import qs from 'qs'
import conf from '@/config/config'
import { message } from '@/lib/message'

let path = ''

let instance = axios.create({
  timeout: cfg.timeout ? cfg.timeout : 5000,
  baseURL: conf.baseUrl
})

const isDevelop = process.env.NODE_ENV === 'development' ? true : false

const HEADER = { 'Content-Type': 'application/x-www-form-urlencoded' }

const getString = (params) => {
  return qs.stringify(params)
}

/**
 * 返回数据处理
 * 页面只需要获取值进行展示，不需要写判断弹message组件提示
 * @param {*} res 
 */
const handleStatus = (res) => {
  if (res && res.status === 200) {
    // 接口返回状态
    let resStatus = res.data.status
    // 接口提示信息，仅查看数据成功时此项为空字符串，其余结果均需返回提示信息
    let resDescription = res.data.description && res.data.description.length > 0 ? res.data.description.trim() : null
    // 接口返回数据
    let resData = res.data.data
    if (resStatus && resStatus == 'success') {
      if (resDescription) {
        // 有提示信息直接在此处弹出message提示，页面上无需额外提示
        message.success(resDescription)
        // 操作成功如果附带数据则返回数据，无数据则返回true
        return resData ? resData : true
      } else {
        // 查看数据仅返回数据
        return resData
      }
    } else {
      if (resDescription || resData) {
        // 检查是否有提示信息，有则直接在此处全局提示，页面上无需额外处理
        let msg = resDescription ? resDescription : resData
        message.error(`${msg}`)
      } else {
        // 接口error
        // 此处代表后台提示信息不全，没有状态值或提示信息
        if (isDevelop) {
          message.error("数据获取失败。。。")
        }
      }
      return false
    }
  }
}

const handleError = (err) => {
  // 接口异常信息
  if (err) {
    if (err.description && err.description.length > 0) {
      message.error(err.description)
    } else {
      if (isDevelop) {
        message.error("数据获取失败。。。 。。。")
      }
    }
  }
  return false
}

const handlerHeader = (header) => {
  let res
  if (typeof (header) == "string") {
    if (header == "form" || header == "Form") {
      res = { "Content-Type": "multipart/form-data" }
    } else if (header == "json" || header == "Json") {
      res = { 'Content-Type': 'application/json' }
    }
  } else if (typeof (header) == "object") {
    res = header
  } else {
    res = HEADER
  }
  return res
}

//http response拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 302:
          err.message = '未授权，请重新登录'
          break;
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接服务器失败"
    }
    return Promise.reject(err)
  }
)

export default {
  instance,
  /**
   * @description: get请求
   * @param {url: String, params: Object} 
   * @return: 
   * @Author: licongzheng
   */
  async get(url, params, header) {
    let queryString = []
    let headers = handlerHeader(header)
    if (params) {
      Object.keys(params).forEach((key) => params[key] & queryString.push(`${key}=${params[key]}`))
    }
    if (queryString.length > 0) {
      queryString = queryString.join('&')
      url += `?${queryString}`
    }
    try {
      const res = await instance
        .get(encodeURI(path + url), { headers: headers })
      //console.info("ssssssssssssssssssss", handleStatus(res));
      return handleStatus(res)
    }
    catch (err) {
      return handleError(err)
    }
  },
  /**
   * @description: post请求
   * @param {url: String, params: Object, header: Object}
   * @return: 
   * @Author: licongzheng
   */
  async post(url, params, header) {
    params = header ? params : getString(params)
    let headers = handlerHeader(header)
    try {
      const res = await instance
        .post(path + url, params, { headers: headers })
      return handleStatus(res)
    }
    catch (err) {
      return handleError(err)
    }
  },
  /**
   * @description: put请求
   * @param {url: String, params: Object, header: Object} 
   * @return: 
   * @Author: licongzheng
   */
  async put(url, params, header) {
    params = header ? params : getString(params)
    let headers = handlerHeader(header)
    try {
      const res = await instance
        .put(path + url, params, { headers: headers })
      return handleStatus(res)
    }
    catch (err) {
      return handleError(err)
    }
  },
  /**
   * @description: delete请求
   * @param {url: String, params: Object, header: Object}
   * @return: 
   * @Author: licongzheng
   */
  async delete(url, params) {
    try {
      const res = await instance
        .delete(path + url, { data: getString(params), headers: HEADER })
      return handleStatus(res)
    }
    catch (err) {
      return handleError(err)
    }
  }
}

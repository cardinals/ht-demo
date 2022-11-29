/*
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-01-27 10:06:24
 * @FilePath: /TechAdmin/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import {
  constRouter
} from './routers'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  routes: constRouter,
  base: process.env.BASE_URL,
  mode: 'history'
})

export default router
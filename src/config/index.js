/*
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 10:28:44
 * @FilePath: /TechAdmin/src/config/index.js
 */
import Vue from "vue";
import "@/router/getRouter";
import '@/router/getRouter'
import * as lodash from 'lodash'
// import "@/assets/tailwindcss.css"


import conf from "./config";
Vue.prototype.$baseUrl = conf.baseUrl;

Vue.prototype.$publicPath = process.env.BASE_URL;

// iview组件引入
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);
// 全局样式
import "@/assets";

// 自定义组件引入
import component from "@/components";
Vue.use(component);

// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

//滑动验证
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

//svg
import Snap from "snapsvg";

//视频
import VideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
Vue.use(VideoPlayer);

// vue-iclient3d-webgl组件库
// import '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css'
import VueiClient from '@supermap/vue-iclient3d-webgl'
Vue.use(VueiClient)

// 按钮权限
import { getBtn, getButtons, compareButton } from '@/lib/button'
Vue.prototype.getBtn = getBtn
Vue.prototype.getButtons = getButtons
Vue.prototype.compareButton = compareButton
Vue.prototype.$baseLodash = lodash

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
//引用echarts
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import "echarts/lib/chart/map";
import "echarts/map/js/china";
Vue.component('echarts', ECharts)

/*
 * @Description:
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-15 14:44:59
 * @FilePath: /TechAdmin/public/cfg.js
 */
// 是否nginx部署
const IS_NGINX = true;
// tomcat路径配置(非nginx部署时生效)
const TOMCAT = 'http://xx.xx.xx.xx:xxxx/xx';

const cfg = {
  baseUrl: IS_NGINX ? '/api' : TOMCAT,
  resource: './resource/',
  theme: './theme',
  websoket: 'ws://10.10.49.25:18002',
  // 图扑JSON
  htwebUrl: [
    'scenes/深度三维园区交互/西咸起步区.json',
  ],

  websoket2: 'ws://10.10.49.230:10900', //视频ws
  videoUrl: '10.10.49.230:20080', //视频播放url 106

  // websoket2: "ws://10.10.49.35:10900", //视频ws
  // videoUrl: "10.10.49.35:20080", //视频播放url 1002
  //主页
  HomePage: {
    demo: 'demo',
    framework: 'introduce'
  }
};

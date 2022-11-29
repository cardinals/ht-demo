/*
 * @Description: 
 * @Author: licongzheng
 * @Date: 2022-01-27 09:35:37
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 13:34:59
 * @FilePath: /TechAdmin/src/components/index.js
 */
import ConfigMenu from './config-menu'
import Login from './Login'
import Menus from './menus'
import ITable from './i-table'
import Skin from './skin'
import TablePage from './table-page'
import treeCustom from './treeCustom'
import lineTree from "./treeLine"
import HtWeb from './ht-web'
import mySvg from './mySvg'
import myVideo from './myVideo'
import myFlv from './myFlv'
import deleteModal from './del-modal'
import ImgButton from './i-button'
import FullScreen from './full-screen'

const components = [
  ConfigMenu,
  Login,
  Menus,
  ITable,
  Skin,
  TablePage,
  treeCustom,
  lineTree,
  HtWeb,
  mySvg,
  myVideo,
  myFlv,
  deleteModal,
  ImgButton,
  FullScreen
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install
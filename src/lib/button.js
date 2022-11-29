import vm from "@/main"
import store from "@/store"

/**
 * @description: 获取当前页面按钮权限
 * @param {null} 
 * @return: string
 * @Author: licongzheng
 */
export const getButtons = () => {
  let res
  if (store.state.common.develop) {
    res = "_add,_edit,delete,_show,_export,_upload,_download"
  } else {
    let routers = store.state.user.menu
    filterRouter(routers)
    function filterRouter(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].children && list[i].children.length > 0) {
          filterRouter(list[i].children)
        } else {
          if (vm.$route.name === list[i].name) {
            console.log(list[i].name, list[i].meta, '当前路由');
            res = list[i].meta.buttons
            break;
          }
        }
      }
    }
  }
  return res
}



/**
 * @description: 获取某个权限结果
 * @param {button：string} 
 * @return: true/false
 * @Author: licongzheng
 */
export const getBtn = (button) => {
  let flag = false
  let buttons = getButtons()
  if (buttons && buttons.length > 0) {
    let arr = buttons.split(",")
    for (let i = 0; i < arr.length; i++) {
      if (button === arr[i]) {
        flag = true
        break
      }
    }
  }
  return flag
}

/**
 * @description: 对比按钮权限，第一个值为想要判断的值，第二个值为当前路由下全部权限值,如：（"_add", "_add,_delete,_edit,_show"）
 * @param {str1: string，str2：string} 
 * @return: true/false
 * @Author: licongzheng
 */
export const compareButton = (str1, str2) => {
  let flag = false
  let arr = str2.split(",")
  for (let i = 0; i < arr.length; i++) {
    if (str1 === arr[i]) {
      flag = true
      break
    }
  }
  return flag
}
/*
 * @Descripttion: 
 * @Author: gaoxiaoying
 * @Date: 2021-06-28 14:48:51
 * @LastEditors: gaoxiaoying
 * @LastEditTime: 2021-06-28 15:02:25
 */
import Login from '@/views/login/login.vue'
import FullLayout from '@/components/Layout/FullLayout.vue'
export const constRouter = [
  {
    path: '/',
    name: "Main",
    redirect: "/login",
    component: FullLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login
      }
    ]
  }
  // {
  //   path: '/',
  //   name: "Main",
  //   redirect: "/home",
  //   component: FullLayout,
  //   children: [
  //     {
  //       path: "/home",
  //       name: "introduce",
  //       component: Introduce
  //     }
  //   ]
  // }
];
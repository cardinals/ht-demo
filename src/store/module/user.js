/*
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-01-27 10:00:19
 * @FilePath: /TechAdmin/src/store/module/user.js
 */
import { Login } from '@/apis/api/login';
import store from '@/store';
import { getJson } from '@/utils/util';

const _USER = {
  namespaced: true,
  state: {
    // 全部用户信息
    message: {},
    // 菜单
    menu: {},
    // 路由
    addRouters: [],
  },

  mutations: {
    setMessage: (state, msg) => {
      state.message = msg;
    },

    setMenu: (state, menu) => {
      state.menu = menu;
    },

    setRouters: (state, routers) => {
      state.addRouters = routers;
    },
  },

  actions: {
    handleLogin({ commit, state }, { username, password }) {
      // ...获取用户信息、路由等
      username = username.trim();
      return new Promise((resolve, reject) => {
        //console.info(store);
        // if (store.state.common.develop) {
        //   getJson(`${cfg.resource}lib/router.json`)
        //     .then((res) => {
        //       //console.info(res.data);
        //       let flag;
        //       if (res.data) {
        //         commit('setMenu', res.data);
        //         if (state.menu) {
        //           flag = true;
        //         } else {
        //           flag = false;
        //         }
        //       }
        //       resolve(flag);
        //     })
        //     .catch((err) => {
        //       reject(err);
        //     });
        // } else {
        //   Login({
        //     username,
        //     password,
        //   })
        //     .then((res) => {
        //       if (res) {
        //         commit('setMenu', res.resourceList);
        //         resolve(true);
        //       }
        //     })
        //     .catch((err) => {
        //       reject(err);
        //     });
        // }

        getJson(`${cfg.resource}lib/router.json`)
          .then((res) => {
            //console.info(res.data);
            let flag;
            if (res.data) {
              commit('setMenu', res.data);
              if (state.menu) {
                flag = true;
              } else {
                flag = false;
              }
            }
            resolve(flag);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};

export default _USER;

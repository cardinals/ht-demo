import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";//vuex持久化数据

import user from './module/user'
import common from './module/common'
import airConditionerMonitor from './module/airConditionerMonitor'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    storage: sessionStorage,
    reducer(file) {
      return {
        common: file.common,
        user: file.user
      }
    }
  })],
  modules: {
    user,
    common,
    airConditionerMonitor
  }
})

export default store

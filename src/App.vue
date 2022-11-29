<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
import axios from '@/axios'
export default {
  data (){
    return {
    }
  },
  created () {
    // 获取主题资源
    let theme = localStorage.getItem("_theme")
    if (theme) {
      this.setThemeUrl(`${cfg.theme}/${theme}/`)
    } else {
      this.setThemeUrl(`${cfg.theme}/default/`)
    }
  },

  methods: {
    ...mapMutations("common", ["setThemeUrl"]),
  },

  watch: {
    // 同步修改后台路径
    "$store.state.common.baseUrl": function (val) {
      if (val) {
        this.$baseUrl = val;
        axios.instance.defaults.baseURL = val;
      }
    }
  }
}
</script>
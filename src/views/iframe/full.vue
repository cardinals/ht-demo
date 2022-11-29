<!--
 * @Description: 全屏iframe
 * @Author: licongzheng
 * @Date: 2022-02-15 11:13:48
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-16 10:33:13
 * @FilePath: /TechAdmin/src/views/iframe/full.vue
-->
<template>
  <iframe
    class="fixed w-full h-full z-50"
    v-bind:src="reportUrl"
  ></iframe>
</template>
<script>
export default {
  data() {
    return {
      reportUrl: "",
    };
  },
  created() {
    // 从路由里动态获取 url地址   具体地址看libs下util.js里的 backendMenuToRoute  方法
    this.reportUrl = this.$route.meta.pathUrl;
  },
  watch: {
    $route: function () {
      // 监听路由变化
      this.reportUrl = this.$route.meta.pathUrl;
    },
  },
};
</script>

<style scoped>
iframe {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>

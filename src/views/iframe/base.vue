<!--
 * @Description: 基础iframe
 * @Author: licongzheng
 * @Date: 2022-02-15 11:13:40
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 11:07:32
 * @FilePath: /TechAdmin/src/views/iframe/base.vue
-->
<template>
  <iframe class="relative w-full h-full" v-bind:src="reportUrl"></iframe>
</template>
<script>
export default {
  data() {
    return {
      reportUrl: ''
    };
  },
  mounted() {
    window.onresize = () => {
      this.widthHeight(); // 自适应高宽度
    };
    this.$nextTick(function() {
      this.widthHeight();
    });
  },
  created() {
    // 从路由里动态获取 url地址   具体地址看libs下util.js里的 backendMenuToRoute  方法
    this.reportUrl = this.$route.meta.pathUrl;
  },
  watch: {
    $route: function() {
      // 监听路由变化
      this.reportUrl = this.$route.meta.pathUrl;
    }
  }
};
</script>

<style lang="less" scoped>
iframe {
  /* position: absolute;
  margin-top: 200px; */
  width: 100%;
  height: 100%;
}
</style>

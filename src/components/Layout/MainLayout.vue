<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-15 13:30:34
 * @FilePath: /TechAdmin/src/components/Layout/MainLayout.vue
-->
<template>
  <div class="w-full h-full">
    <Header class="fixed w-full h-24 z-20" v-if="head"></Header>
    <div class="absolute w-full mt-24 z-10">
      <SideMenu v-if="side"></SideMenu>
      <Main class="px-4"></Main>
      <Footer v-if="foot"></Footer>
    </div>
  </div>
</template>

<script>
import Header from './head-bar/head-bar'
import SideMenu from './side-menu/side-menu'
import Main from './main/main'
import Footer from './footer/footer'
export default {
  name: "MainLayout",
  props: {
    head: {
      type: Boolean,
      default: true,
    },
    side: {
      type: Boolean,
      default: false,
    },
    foot: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Header,
    SideMenu,
    Main,
    Footer
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
@head-height: 100px;
.full-layout {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.header-bar {
  position: fixed;
  width: 100%;
  min-height: @head-height;
  max-height: @head-height;
  z-index: 1001;
}

.main-layout {
  position: absolute;
  margin-top: @head-height;
  width: 100%;
  min-height: calc(100% - @head-height);
  max-height: calc(100% - @head-height);
  z-index: 1000;
}
</style>
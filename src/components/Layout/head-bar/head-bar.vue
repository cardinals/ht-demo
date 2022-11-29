<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 16:09:27
 * @FilePath: /TechAdmin/src/components/Layout/head-bar/head-bar.vue
-->
<template>
  <div>
    <slot name="header" class="border">
      <Menu mode="horizontal" theme="light" active-name="1" @on-select="selectMenu">
        <Menus :menus="$store.state.user.menu"></Menus>
        <div class="float-right px-4">
          <FullScreen class="inline px-1"></FullScreen>
          <Skin class="inline px-1"></Skin>
          <LogOut class="inline px-1"></LogOut>
          <ConfigMenu class="inline px-1"></ConfigMenu>
        </div>
      </Menu>
    </slot>
  </div>
</template>

<script>
import LogOut from '../logout'
export default {
  name: "HeadBar",
  components: {
    LogOut
  },
  methods: {
    selectMenu(name) {
      if (name === "fullScreen") {
        const {href} = this.$router.resolve({
          name: "fullScreen"
        })
        window.open(href, '_blank')
      } else {
        this.$router.push({name: name})
      }
    },
  }
}
</script>

<style lang="less" scoped>
.config-menu {
  line-height: 60px;
  z-index: 3000;
  top: 0;
  right: 10px;
}
</style>
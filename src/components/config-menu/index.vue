<!--
 * @Descripttion: 
 * @Author: zhangxiaoran
 * @Date: 2021-06-30 13:18:33
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 16:10:30
-->
<template>
  <div v-if="true">
    <Icon :size="26" type="ios-settings-outline" class="cursor-pointer"  @click="modal = true" title="设置"/>
    <Drawer
      title="系统设置"
      v-model="modal"
      width="400"
      :closable="false"
      :styles="styles"
      :transfer="false"
    >
    <!-- <label>模板选择：</label>
      <Select v-model="theme" style="width: 200px" @on-change="changeLess">
        <Option v-for="item in themeList" :value="item.key" :key="item.key">{{
          item.label ? item.label : item.key
        }}</Option>
      </Select>
    </div> -->
    <br>
    <div>
      <label>按钮权限：</label>
      <i-Switch v-model="develop" @on-change="changeDevelop" />
      <br>
      <span>{{"(开发模式默认本地路由且拥有全部按钮权限)"}}</span>
    </div>
    <br>
    <div>
      <label>主题选择：</label>
      <Select v-model="theme" style="width: 200px" @on-change="changeLess">
        <Option v-for="item in themeList" :value="item.key" :key="item.key">{{
          item.label ? item.label : item.key
        }}</Option>
      </Select>
    </div>
    <br>
    <div>
      <label>后台选择：</label>
      <Select v-model="server" style="width: 200px" @on-change="changeServer" filterable allow-create @on-create="handleCreate">
        <Option v-for="(item, index) in serverList" :value="item.baseUrl" :key="item.index">{{
          item.name
        }}</Option>
      </Select>
    </div>
    <br>
    <!-- <div>
      <label>布局选择：</label>
      <Select v-model="layoutType" style="width: 200px" @on-change="changeLayout">
        <Option v-for="(item, index) in layoutList" :value="item.type" :key="item.index">{{
          item.name
        }}</Option>
      </Select>
    </div>
    <br> -->
    <div>
      <label>当前后台：</label>
      <Input v-model="server" disabled readonly></Input>
    </div>
    </Drawer>
  </div>
</template>

<script>
import themeChange from "@/mixins/theme";
export default {
  name: "ConfigMenu",
  mixins: [themeChange],
  data() {
    return {
      modal: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
      },
    };
  },

  mounted() {},

  methods: {
    handleCreate(val) {
      this.serverList.push({
        name: val,
        baseUrl: val
      })
    }
  }
};
</script>
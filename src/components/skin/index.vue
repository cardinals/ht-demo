<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 15:48:56
 * @FilePath: /TechAdmin/src/components/skin/index.vue
-->
<template>
  <div>
    <Icon type="ios-shirt-outline" class="cursor-pointer" :size="26" @click="modal = true" title="皮肤管理"/>
    <Modal
      v-model="modal"
      draggable
      sticky
      scrollable
      :mask="false"
      title="主题色管理"
      width="1200"
    >
      <div class="overflow-auto h-32" style="height:580px">
        <div>
          <Select v-model="theme" style="width: 200px" @on-change="changeLess">
            <Option v-for="item in themeList" :value="item.key" :key="item.key">{{
              item.label ? item.label : item.key
            }}</Option>
          </Select>
          <Button @click="resetColor()" class="ml16">重置</Button>
          <Button @click="exportColor()" class="ml16">导出颜色</Button>
        </div>
        <br />
        <h3>主题色值</h3>
        <br />
        <div
          v-for="(item, index) of colorList"
          :key="index"
          class="color-box ml16 mt8 inline"
        >
          <span>{{ item.name }}</span>
          <ColorPicker
            v-model="item.value"
            @on-change="changeColor"
            class="ml8"
          />
        </div>
        <br />
        <div v-if="colorList.length > 0">{{ colorList }}</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import themeChange from "@/mixins/theme";
export default {
  name: "Skin",
  mixins: [themeChange],
  data() {
    return {
      modal: false,
    };
  },
};
</script>

<style lang="less" scoped>
.color-box {
  width: 350px;
}
</style>
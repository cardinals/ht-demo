<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2022-02-18 13:32:01
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 15:48:35
 * @FilePath: /TechAdmin/src/components/full-screen/index.vue
-->
<template>
  <Icon :type="isFullscreen ? 'ios-contract' : 'ios-expand'" :size="size" :title="isFullscreen ? '关闭全屏' : '开启全屏'" class="cursor-pointer" @click="toggle"/>
</template>

<script>
import { useFullscreen } from '@vueuse/core';
export default{
  name: 'FullScreen',
  props: {
    size: {
      type: Number,
      default: 26
    }
  },
  setup() {
    const { toggle, isFullscreen } = useFullscreen();
    return {
      toggle,
      isFullscreen
    };
  }
}
</script>

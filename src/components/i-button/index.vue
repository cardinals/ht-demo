<!--
 * @Description: buttons
 * @Author: licongzheng
 * @Date: 2022-02-10 15:22:25
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-10 16:04:41
 * @FilePath: /TechAdmin/src/components/i-button/index.vue
-->
<template>
  <div class="flex-1 w-8" :title="tag === '' ? name : tag" @click="handleClick">
    <div class="rounded-sm">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: "ImgButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    name: {
      type: String,
      default: "按钮"
    },
    tag: {
      type: String,
      default: ""
    },
    size: {
      type: String
    }
  },
  data() {
    return {
      
    }
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  },
}
</script>
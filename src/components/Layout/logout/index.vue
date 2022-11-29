<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2022-02-18 16:00:38
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 16:17:32
 * @FilePath: /TechAdmin/src/components/Layout/logout/index.vue
-->
<template>
  <Icon type="ios-power-outline" class="cursor-pointer" :size="size" @click="logout"/>
</template>

<script>
export default {
  name: 'LogOut',
  props: {
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    logout() {
      this.$router.push({path: '/'})
    }
  },
};
</script>

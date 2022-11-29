<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2022-02-11 14:46:49
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-14 19:05:47
 * @FilePath: /TechAdmin/src/views/tailwind.vue
-->
<template>
  <div class="bg-yellow-100">
    <Slider v-model="value1" :step="2" class="w-96 py-1"></Slider>
    <div class="box-border h-32 w-32 p-4 border-4">
    </div>
    <BasicForm :value="formInline"></BasicForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      formInline: [
        {
          "name": "姓名",
          "valid": true,
          "type": 'input',
        }
      ]
    }
  },

  methods: {
    
  }
}
</script>
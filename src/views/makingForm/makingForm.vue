<!--
 * @Descripttion: 
 * @Author: gaoxiaoying
 * @Date: 2021-07-02 10:01:33
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-01-27 15:42:42
-->
<template>
  <div>
    <div style="border-radius: 4px; border: 1px solid #ccc; overflow:hidden">
      <fm-making-form
        ref="makingform"
        style="height: 600px;"
        preview
        clearable
        upload
        generate-code
        generate-json
        :advance-fields="['editor', 'imgupload', 'file', 'subform', 'cascader']"
      >
        <template slot="action" />
      </fm-making-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// 表单设计
import { GenerateForm, MakingForm } from '@/components/VueFormMaking'
import '@/components/VueFormMaking/styles/FormMaking.css'
import ace from 'ace-builds'
import 'ace-builds/webpack-resolver'
Vue.use(ace)
Vue.use(GenerateForm)
Vue.use(MakingForm, {lang: 'zh-CN'})
export default {
  name: 'makingForm',
  data () {
    return {
      
    }
  },

  methods: {
    
  }
}
</script>
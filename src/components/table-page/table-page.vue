<!--
 * @Descripttion: 
 * @Author: zhangxiaoran
 * @Date: 2020-07-22 16:36:30
 * @LastEditors: zhangxiaoran
 * @LastEditTime: 2021-07-16 08:55:06
--> 
<template>
<div>
  <Table stripe  :height="th" :width="tableWidth" :columns="columns" :data="data" :loading="loading" ref="table"
    no-data-text="暂无数据" @on-select="tableSelect" @on-select-all="allSelect">
    <template  v-for="column in columns" :slot="column.slot ? column.slot : ''" slot-scope="params">
      <slot :name="column.slot ? column.slot : ''" v-bind="params"></slot>
    </template>
  </Table>
  <Row class="page-bottom mt10">
      <Page show-total :total="dataCount" :page-size="pageSize" @on-change="changePage" show-elevator :current="currentPage"
        class="common-page-style"/>
      <span style='float:right;margin-right:30px'>每页显示：<InputNumber :active-change='false' :min="1" v-model="pageCount" style='width:60px' :step="1" 
        @on-change='changePage(currentPage)'></InputNumber> 条</span>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  name: 'TablePage',
  props: {
    columns:{
      type:Array
    },
    data:{
      type:Array
    },
    dataCount:{
      type:Number,
      default:0
    },
    pageSize:{
      type: Number,
      default:10,
    },
    currentPage:{
      type:Number,
      default:1
    },
    tableHeight:{
      type:String
    },
    tableWidth:{
      type:String
    },
    loading:{
      type:Boolean
    },
  },

  data () {
    return {
      pageCount: this.pageSize,
      th:this.tableHeight
    }
  },

  watch: {
    tableHeight: function(newValue, oldValue) {
      //每当str的值改变则发送事件update:word , 并且把值传过去
      console.log(newValue,'ll')
    }
  },

  methods: {
    changePage (page) {
      this.$emit('update:pageSize', this.pageCount)
      this.$emit('on-change', page)
    },
    tableSelect(selection) {
      this.$emit('on-select', selection)
    },
    allSelect (selection) {
      this.$emit('on-allSelect', selection)
    },
  }
}
</script>

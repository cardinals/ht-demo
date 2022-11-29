<!--
 * @Description: 
 * @Author: licongzheng
 * @Date: 2021-12-08 14:28:00
 * @LastEditors: licongzheng
 * @LastEditTime: 2022-02-18 15:29:23
 * @FilePath: /TechAdmin/src/views/home/introduce.vue
-->
<template>
  <div>
    <Row :gutter="20">
      <Col :span="24">
        <Card>
          <a href="https://www.lodashjs.com/" target="_blank">lodashjs官网</a>
        </Card>
      </Col>
    </Row>
    <Row :gutter="12" class="mt-2">
      <Col :span="6" v-for="(item, index) of itemList" :key="index">
        <Card class="my-2">
          <p slot="title">{{ item.name }}</p>
          <p>{{ item.des }}</p>
          <p>{{ '=> ' + item.res }}</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScreenfull: false,
      itemList: [
        {
          name: '去除数组array中的最后一个元素',
          des: 'this.$baseLodash.initial([1, 2, 3])',
          res: this.$baseLodash.initial([1, 2, 3])
        },
        {
          name: '返回数组 array的第一个元素',
          des: 'this.$baseLodash.head([1, 2, 3])',
          res: this.$baseLodash.head([1, 2, 3])
        },
        {
          name: '合并数组',
          des: 'this.$baseLodash.concat([1],[2])',
          res: this.$baseLodash.concat([1], [2])
        },
        {
          name: '修改拼接',
          des: "this.$baseLodash.join(['a', 'b', 'c'], '~')",
          res: this.$baseLodash.join(['a', 'b', 'c'], '~')
        },
        {
          name: '获取数组最后一个元素',
          des: "this.$baseLodash.last(['a', 'b', 'c'])",
          res: this.$baseLodash.last(['a', 'b', 'c'])
        },
        {
          name: '数组去重',
          des: "this.$baseLodash.uniq(['a', 'b', 'a'])",
          res: this.$baseLodash.uniq(['a', 'b', 'a'])
        },
        {
          name: '获取数组的最大值',
          des: 'this.$baseLodash.max([4, 2, 8, 6])',
          res: this.$baseLodash.max([4, 2, 8, 6])
        },
        {
          name: '获取数组的最小值',
          des: 'this.$baseLodash.min([4, 2, 8, 6])',
          res: this.$baseLodash.min([4, 2, 8, 6])
        },
        {
          name: '四舍五入(保留任意位小数)',
          des: 'this.$baseLodash.round(4.006,2保持几位小数)',
          res: this.$baseLodash.round(4.006, 2)
        },
        {
          name: '数组内数据相加',
          des: 'this.$baseLodash.sum([4, 2, 8, 6])',
          res: this.$baseLodash.sum([4, 2, 8, 6])
        },
        {
          name: '返回随机数',
          des: 'this.$baseLodash.random(0, 5)',
          res: this.$baseLodash.random(0, 5)
        },
        {
          name: '返回数组内的随机数',
          des: 'this.$baseLodash.sample([1, 2, 3, 4])',
          res: this.$baseLodash.sample([1, 2, 3, 4])
        }
      ]
    };
  }
};
</script>

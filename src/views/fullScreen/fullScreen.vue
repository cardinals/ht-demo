<!--
 * @Descripttion: 
 * @Author: zongjunlian
 * @Date: 2021-06-17 17:07:20
 * @LastEditors: zongjunlian
 * @LastEditTime: 2021-06-23 10:15:48
-->
<template>
  <!-- 5760 * 1080 -->
  <div style="width: 5720px;height: 1060px;padding:10px 20px;">
    <Row :gutter="20">
      <!-- 左侧 -->
      <Col span="6">
        <Row :gutter="20">
          <Col span="12">
            <Card v-for="item in 3" class="mt20 cardBox">
              <p slot="title">The standard card</p>
              <div style="text-align:center">
                <echarts ref="option1" :options="option1" style="width:100%;height:240px;"></echarts>
              </div>
            </Card>
          </Col>
          <Col span="12">
            <Card v-for="item in 3" class="mt20 cardBox">
              <p slot="title">The standard card</p>
              <div style="text-align:center">
                <echarts ref="option2" :options="option2" style="width:97%;height:240px;"></echarts>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
      <!-- 中间 -->
      <Col span="12">
        <Card class="mt20 cardBoxCenter">
          <div style="text-align:center;background:#dfecfd">
            <echarts :options="option3" style="width:100%;height:1010px;"></echarts>
          </div>
        </Card>
      </Col>
      <!-- 右侧 -->
      <Col span="6">
        <Row :gutter="20">
          <Col span="12">
            <Card v-for="item in 3" class="mt20 cardBox">
              <p slot="title">The standard card</p>
              <div style="text-align:center">
                <echarts ref="option2" :options="option2" style="width:98%;height:240px;"></echarts>
              </div>
            </Card>
          </Col>
          <Col span="12">
            <Card class="mt20 cardBox">
              <myVideo :src="src" ref="myVideo" style="width:100%;height:100%;"></myVideo>
            </Card>
            <Card class="mt20 cardBox">
              <Row :gutter="10" class="clearfix">
                <Col span="12" v-for="(item, index) in 4" :class="index == 2 || index == 3 ? 'mt10' : ''">
                  <myVideo :src="srcList[index].src" ref="myVideo1" style="width:100%;"></myVideo>
                </Col>
              </Row>
            </Card>
            <Card class="mt20 cardBox">
              <p slot="title">The standard card</p>
              <div style="text-align:center">
                <echarts ref="option1" :options="option1" style="width:100%;height:240px;"></echarts>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import echartMixin from "@/mixins/mixins/echarts";
import { copyArray, deepCopy } from "@/utils/util";
export default {
  name: "fullScreen",
  mixins: [echartMixin],
  data() {
    return {
      src: "",
      srcList: [
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
      ],
      option1: {},
      option2: {},
      option3: {},
    };
  },
  methods: {
    getEchartsData() {
      this.option1 = deepCopy(this.lineChartsOption);
      this.option1.xAxis.data = ["颐瑞东路", "颐瑞东路", "颐瑞东路", "颐瑞东路", "颐瑞东路"];
      this.option1.series[0].data = [10, 20, 30, 40, 50];

      this.option2 = deepCopy(this.lineChartsOption1);
      this.option3 = deepCopy(this.earthOption);
    },
  },
  created() {},
  mounted() {
    this.$refs.myVideo.playerOptions.aspectRatio = "18:8";
    let arr = [{},{},{},{}];
    arr.forEach((item, index) => {
      this.$refs.myVideo1[index].playerOptions.aspectRatio = "18:8";
    });

    this.getEchartsData();
  },
  computed: {},
};
</script>
<style>
.cardBox {
  height: 325px;
}
.cardBoxCenter .ivu-card-body {
  padding: 0;
}
</style>

<!--
 * @Descripttion: 
 * @Author: gaoxiaoying
 * @Date: 2020-11-26 14:40:47
 * @LastEditors: zhangxiaoran
 * @LastEditTime: 2021-07-12 10:59:07
-->
<template>
  <div class="nowrap">
    <!-- 单建筑 -->
    <Row style="height: calc(100vh - 20px);">
      <Col span="6">
        <Card :bordered="false" class="mb10 mr10">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            标题
          </p>
          <div>此处可添加内容</div>
        </Card>
        <Card :bordered="false" class="mb10 mr10">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            标题
          </p>
          <div>此处可添加内容</div>
        </Card>
        <Card :bordered="false" class="mr10">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            标题
          </p>
          <div>此处可添加内容</div>
        </Card>
      </Col>
      <Col span="12">
        <Card :bordered="false" class="mb10 mr10">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            项目展示
          </p>
          <div><img style="height:500px" src="../../assets/images/showF/QQ图片20201214115917.png" /></div>
        </Card>
        <Card :bordered="false" class="inline-block mr10" style="width: 49%">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            数据一
          </p>
          <div>
            <echarts :options="barOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
          </div>
        </Card>
        <Card :bordered="false" class="inline-block" style="width: 49%">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            数据二
          </p>
          <div>此处可添加内容</div>
        </Card>
      </Col>
      <Col span="6">
        <Card :bordered="false" class="mb10">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            标题
          </p>
          <div>此处可添加内容</div>
        </Card>
        <Card :bordered="false" class="mb10">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            标题
          </p>
          <div>此处可添加内容</div>
        </Card>
        <Card :bordered="false">
          <p slot="title">
            <img class="mr5" src="../../assets/images/箭头.png" />
            标题
          </p>
          <div>此处可填充内容</div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import echartsMixins from '@/mixins/echarts'
import { deepCopy } from '@/utils/util'
export default {
  name: "singleBuildingHome",
  mixins: [echartsMixins],
  data() {
    return {
      barOption: {},
      routerName: '',
      itemInfo: {},
      modalSpecialReport: false,
      modalMultipleReport: false,
      offNum: 0,
      eneryAlarm: 0,
      powerAlarm: 0,
      dataAlarm: 0,
      color: ['#A6C4FF', '#3377FF', '#CA33FE', '#FF9933', '#49DFF0', '#A6C4FF', '#3377FF', '#CA33FE', '#FF9933', '#49DFF0'],
      trafficWay: [],
      unitType: '1',
      unitTypes: [
        {
          value: '1',
          label: '能耗（kWh）'
        },
        {
          value: '2',
          label: '费用（元）'
        },
      ],
      dateType1: '',
      dateType2: '',
      dateType4: '',
      lineBarOptions: {},
      energyReports: [],
      routerIndex: 0,
      collectorNum: 0,
      waterNum: 0,
      electricNum: 0,
      gasNum: 0,
      collectorOnModels: 0,
      dateType2: '',
      waterRate: 0,
      electricityRate: 0,
      gas: 0,
      electricity: 0,
      water: 0,
      gasRate: 0,
      lineOption1: {
        grid: {
          left: 0,
          bottom: 10,
          containLabel: true,
        },
        color:['#FE5E00'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['transparent', 'transparent']
            }
          },
          axisTick: {           //去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle:{
              color:'#767BA5'     //X轴的颜色
            },
          },
          axisLabel: {
              color:'#767BA5'
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          type: 'value',
          name: '电量/kWh',
          axisTick: { // 去掉坐标轴刻线
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'transparent' // y轴的颜色
            },
          },
          axisLabel: {
            color:'#767BA5'
          },
          splitLine: {
            lineStyle:{
              color: ['#767BA5'],
              type: 'solid'
            }
          },
        },
        series: {
          data: [],
          type: 'line',
          symbol: 'none',
          axisLine: {
            lineStyle: {
              color: '#37394D',
            }
          },
          areaStyle: {
            normal: {//自定义颜色，渐变色填充折线图区域
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#FE5E00' }, //渐变色
                { offset: 1, color: 'rgba(254,159,0,.06)' } //渐变色
              ]),
            },
          }
        }
      },
      lineOption2: {
        grid: {
          left: 0,
          bottom: 10,
          containLabel: true,
        },
        color:['#16E6FB'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['transparent', 'transparent']
            }
          },
          axisTick: {           //去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle:{
              color:'#767BA5'     //X轴的颜色
            },
          },
          axisLabel: {
              color:'#767BA5'
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          type: 'value',
          name: '电量/kWh',
          axisTick: { // 去掉坐标轴刻线
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'transparent' // y轴的颜色
            },
          },
          axisLabel: {
            color:'#767BA5'
          },
          splitLine: {
            lineStyle:{
              color: ['#767BA5'],
              type: 'solid'
            }
          },
        },
        series: {
          data: [],
          type: 'line',
          symbol: 'none',
          axisLine: {
            lineStyle: {
              color: '#37394D',
            }
          },
          areaStyle: {
            normal: {//自定义颜色，渐变色填充折线图区域
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#16E6FB' }, //渐变色
                { offset: 1, color: 'rgba(22,230,251,.06)' } //渐变色
              ]),
            },
          }
        }
      },
      lineOption3: {
        grid: {
          left: 0,
          bottom: 10,
          containLabel: true,
        },
        color:['#2970FF'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['transparent', 'transparent']
            }
          },
          axisTick: {           //去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle:{
              color:'#767BA5'     //X轴的颜色
            },
          },
          axisLabel: {
              color:'#767BA5'
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          type: 'value',
          name: '电量/kWh',
          axisTick: { // 去掉坐标轴刻线
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'transparent' // y轴的颜色
            },
          },
          axisLabel: {
            color:'#767BA5'
          },
          splitLine: {
            lineStyle:{
              color: ['#767BA5'],
              type: 'solid'
            }
          },
        },
        series: {
          data: [],
          type: 'line',
          symbol: 'none',
          axisLine: {
            lineStyle: {
              color: '#37394D',
            }
          },
          areaStyle: {
            normal: {//自定义颜色，渐变色填充折线图区域
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2970FF' }, //渐变色
                { offset: 1, color: 'rgba(78,136,254,.06)' } //渐变色
              ]),
            },
          }
        }
      },
      buildingInfo: {},
    }
  },
  methods: {
    getBarOption () {
      this.barOption.title.text = '柱状图'
      this.barOption.legend.data = ['用电量', '同比']
      this.barOption.xAxis.data = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      this.barOption.yAxis.name = '电量/kwh'
      this.barOption.series[0].name = '用电量'
      this.barOption.series[0].data = [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310]
      this.barOption.series[1].name = '同比'
      this.barOption.series[1].data = [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410]
    },
    mounted () {
    this.barOption = deepCopy(this.optionBar2)
    this.getBarOption()
  }
  },
};
</script>
<style lang="less">
.btnHover {
  display: inline-block;
  padding: 0px 10px;
  cursor: pointer;
  background-color: transparent;
}
.btnVisited {
  display: inline-block;
  padding: 0px 10px;
  cursor: pointer;
  background-color: #023AFF;
}
.btnHover:hover,.btnHover:visited{
  .btnVisited;
  background-color: #023AFF;
}
.energyCard > .ivu-card-body {
  padding: 0;
  margin-top: 10px;
}

.report:hover {
  // color: @cHoverComp;
}
.nowrap {
  white-space: nowrap;
}
</style>
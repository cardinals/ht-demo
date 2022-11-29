<!--
 * @Descripttion: 
 * @Author: gaoxiaoying
 * @Date: 2021-06-22 16:24:22
 * @LastEditors: gaoxiaoying
 * @LastEditTime: 2021-06-30 10:29:06
-->
<template>
  <div>
    <echarts :options="barOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="lineBarOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="stackedBarOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="lineOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="scatterOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="scatterOption1" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="pieOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
    <echarts :options="gaugeOption" class="inline-block mg10" style="width: calc((100vw - 100px)/2); height: 400px;"></echarts>
  </div>
</template>

<script>
import { deepCopy } from '@/utils/util'
import echartsMixins from '@/mixins/echarts'
export default {
  name: 'example',
  mixins: [echartsMixins],
  data () {
    return {
      barOption: {},
      lineBarOption: {},
      stackedBarOption: {},
      lineOption: {},
      scatterOption: {},
      scatterOption1: {},
      pieOption: {},
      pieData: {},
      trafficWay: [],
      gaugeOption: {},
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
    getLineBarOption () {
      this.lineBarOption.title.text = '折柱混合图'
      this.lineBarOption.legend.data = ['用电量', '同比']
      this.lineBarOption.xAxis.data = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      this.lineBarOption.yAxis.name = '电量/kwh'
      this.lineBarOption.series[0].name = '用电量'
      this.lineBarOption.series[0].data = [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310]
      this.lineBarOption.series[1].name = '同比'
      this.lineBarOption.series[1].data = [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410]
    },
    getStackedBarOption () {
      this.stackedBarOption.title.text = '柱状堆叠图'
      this.stackedBarOption.legend.data = ['冷源主机', '热源主机', '冷却塔']
      this.stackedBarOption.xAxis.data = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      this.stackedBarOption.yAxis.name = '电量/kwh'
      this.stackedBarOption.series[0].name = '冷源主机'
      this.stackedBarOption.series[0].data = [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310]
      this.stackedBarOption.series[1].name = '热源主机'
      this.stackedBarOption.series[1].data = [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410]
      this.stackedBarOption.series[2].name = '冷却塔'
      this.stackedBarOption.series[2].data = [190, 192, 161, 144, 100, 330, 310, 192, 161, 144, 100, 330, 190, 192, 161, 144, 100, 330, 310, 192, 161, 144, 100, 330]
    },
    getLineOption () {
      this.lineOption.title.text = '折线图'
      this.lineOption.legend.data = ['COP1', 'COP2']
      this.lineOption.xAxis.data = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      this.lineOption.yAxis.name = '电量/kwh'
      this.lineOption.series[0].name = 'COP1'
      this.lineOption.series[0].data = [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310]
      this.lineOption.series[1].name = 'COP2'
      this.lineOption.series[1].data = [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410]
    },
    getScatterOption () {
      this.scatterOption.title.text = '散点图'
      this.scatterOption.series[0].data = [[10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82], [9.15, 7.20], [11.5, 7.20], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47], [1.05, 3.33], [4.05, 4.96], [6.03, 7.24], [12.0, 6.26], [12.0, 8.84], [7.08, 5.82], [5.02, 5.68]]
    },
    getScatterOption1 () {
      this.scatterOption1.title.text = '散点图'
      this.scatterOption1.series[0].symbol = 'triangle'
      this.scatterOption1.series[0].data = [[10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82], [9.15, 7.20], [11.5, 7.20], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47], [1.05, 3.33], [4.05, 4.96], [6.03, 7.24], [12.0, 6.26], [12.0, 8.84], [7.08, 5.82], [5.02, 5.68]]
    },
    // 获取饼图数据
    getPieOption () {
      this.pieOption.legend.data = ['冷源主机', '热源主机', '冷却塔', '冷却泵', '冷冻泵', '其他设备']
      this.pieOption.series[0].itemStyle.normal.label = {
        show: true,
        position: 'outside',
        color: '#767BA5',
        formatter: params => {
          var percent = 0;
          var total = 0;
          for (var i = 0; i < this.trafficWay.length; i++) {
            total += parseFloat(this.trafficWay[i].value);
          }
          this.pieOption.title.text = '饼图'
          this.pieOption.title.subtext = total.toFixed(2)
          percent = ((params.value / total) * 100).toFixed(2);
          if (params.name !== '') {
            if (window.isNaN(percent)) {
              return params.name + '\n' + '\n'  + params.value + '/' + 0 + '%';
            } else {
              return params.name + '\n' + '\n'  + params.value + '/' + percent + '%';
            }
          } else {
            return '';
          }
        }
      }
      this.trafficWay = [
        {
          name: '冷源主机',
          value: 120
        },
        {
          name: '热源主机',
          value: 120
        },
        {
          name: '冷却塔',
          value: 120
        },
        {
          name: '冷却泵',
          value: 120
        },
        {
          name: '冷冻泵',
          value: 120
        },
        {
          name: '其他设备',
          value: 120
        },
      ]
      this.getPieData()
    },

    // 处理饼图数据
    getPieData () {
      this.pieData = []
      //echarts 数据准备
      for (var i = 0; i < this.trafficWay.length; i++) {
        this.pieData.push(
          {
            value: this.trafficWay[i].value,
            name: this.trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 5,
                borderRadius: 10,
                borderColor: this.pieOption.color[i],
                shadowColor: this.pieOption.color[i],
              },
            },
          }
        );
      }
      this.pieOption.series[0].data = this.pieData
    },
    getGuageOption () {
      this.gaugeOption.title.text = '仪表盘'
      this.gaugeOption.legend.data = ['累计COP', '折算COP']
      this.gaugeOption.series[0].name = '累计COP'
      this.gaugeOption.series[0].data = [, , 40]
      this.gaugeOption.series[1].name = '折算COP'
      this.gaugeOption.series[1].data = [, , 80]
    },
  },
  mounted() {
    this.barOption = deepCopy(this.optionBar2)
    this.getBarOption()
    this.lineBarOption = deepCopy(this.optionBar1Line1)
    this.getLineBarOption()
    this.stackedBarOption = deepCopy(this.optionStackedBar)
    this.getStackedBarOption()
    this.lineOption = deepCopy(this.optionLine2)
    this.getLineOption()
    this.scatterOption = deepCopy(this.optionScatter1)
    this.getScatterOption()
    this.scatterOption1 = deepCopy(this.optionScatter1)
    this.getScatterOption1()
    this.pieOption = deepCopy(this.optionPie)
    this.getPieOption()
    this.gaugeOption = deepCopy(this.optionGauge2)
    this.getGuageOption()
  }
}
</script>
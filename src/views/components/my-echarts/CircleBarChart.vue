<template>
  <echarts id="CircleBarChart" :options="circleBarOption"></echarts>
</template>

<script>
export default {
  name: "CircleBarChart",
  data() {
    return {
      barValueData: this.barValue,
      maxCount: 100,
      colorList: ["#1565c0", "#1976d2", "#1e88e5", "#2196f3", "#42a5f5"], //上层环背景
      bgList: ["#1a237e", "#1a237e", "#1a237e", "#1a237e", "#1a237e"], //下层环背景
      circleBarOption: {
        angleAxis: {
          show: true, //隐藏角度轴（圆心角）
          max: this.maxCount,
          startAngle: 90, //极坐标从第一象限开始，即平面直角坐标系,用时钟理解，0就是三点钟方向，这里我们从12点钟方向开始，也就是3点钟方向加90度
          splitLine: { show: true, lineStyle: { opacity: 0.25 } },
          axisLine: { show: true, lineStyle: { opacity: 0.25 } },
          axisTick: { show: true, lineStyle: { opacity: 0.25 } },
        },
        // barMaxWidth: 50, //设置圆环最大宽度
        radiusAxis: {
          show: false, //隐藏径向轴（半径）
          type: "category",
          data: [
            "集水器压差",
            "热水流量",
            "热水总供水温度",
            "热水总回水温度",
            "热源机房温度",
          ], //传入每条圆环的径向值
        },
        polar: {
          radius: [30, 100], //总体的最小半径，最大半径
        },
        series: [
          {
            //上层的圆环
            type: "bar",
            data: this.barValue, //初始值
            coordinateSystem: "polar", //设置类型为极坐标
            roundCap: true, //柱状图末端呈现圆角
            itemStyle: {
              //设置每一个圆环的颜色
              color: (params) => {
                return this.colorList[params.dataIndex];
              },
            },
            animationEasing: "bounceOut", //初始动画
            barGap: "-100%", //柱间距离,用来将上下两种圆环重合
            z: 200, //圆环层级，和zindex相似
            label: {
              show: true,
              distance: 0,
              offset: [80, 0],
              color: "#fff",
              fontSize: 12,
              fontStyle: "oblique",
              fontWeight: "bold",
              position: "middle",
              rich: {},
            },
            labelLine: {
              show: true,
              lineStyle: {
                type: "solid",
                dashOffset: 0,
                cap: "square",
                join: "bevel",
              },
            },
          },
          {
            //下层的圆环
            type: "bar",
            data: [
              this.maxCount,
              this.maxCount,
              this.maxCount,
              this.maxCount,
              this.maxCount,
            ],
            coordinateSystem: "polar",
            roundCap: true,
            itemStyle: {
              //设置每一个圆环的颜色
              color: (params) => {
                return this.bgList[params.dataIndex];
              },
            },
            z: 100,
            barGap: "-100%", //柱间距离,用来将上下两种圆环重合
          },
        ],
      },
    };
  },
  props: {
    barValue: {
      type: Array,
      default() {
        return [29, 55, 77, 66, 92];
      },
    },
  },
  watch: {
    barValue(oldValue, newValue) {
      // console.info(newValue)
      this.circleBarOption.series[0].data = newValue;
    },
  },
};
</script>

<style scoped>
#CircleBarChart {
  width: 100%;
  height: 3.125rem;
}
</style>

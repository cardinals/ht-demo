<template>
  <echarts id="ProgressBarChart" :options="progressBarOption"></echarts>
</template>

<script>
/*
================进度条bar组件===============
类似进度条的bar组件，前面的bar嵌入进后面的bar中
===========================================
*/
export default {
  name: "ProgressBarChart",
  data() {
    return {
      barCategoryData: this.barCategory,
      barValueData: this.barValue,
      unitSymbolData: this.unitSymbol,
      barTitleData: this.barTitle,
      progressBarOption: {
        title: {
          show: false,
          text: this.barTitleData,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          top: "10%",
          left: "20%",
          bottom: "10%",
          right: "25%",
          containLabel: false,
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
            },
            data: this.barCategory,
            /*  "旁通压差", //96.87 mH₂O //米水柱
                "机房温度", //22.90 °C
                "冷冻水流量", //45.25 m³/h
                "集水器压力", //2.04 mH₂O
                "旁通阀位", //24.15  %
                "冷却水流量", // 30.68 m³/h
                "室外温度", //35.25 °C */
          },
          {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
            },
            data: this.barValue, //[34.09, 76.62, 10.62, 2.04, 24.15, 30.68, 35.25],
          },
          {
            /* 多于2个Y轴的目录需要设置offset，这是相对于默认位置的偏移值 */
            offset: 40,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
            },
            data: this.unitSymbol, //["Hz", "ppm", "m³/h", "mH₂O", "%", "m³/h", "°C"],
          },
        ],
        series: [
          {
            name: "frontBar",
            yAxisIndex: 0,
            type: "bar",
            itemStyle: {
              borderRadius: 20,
              color: {
                type: "linear",
                x: 0,
                y: 0.5,
                x2: 1,
                y2: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    //渐变颜色条，最左边0%处的颜色值
                    color: "#81d4fa",
                  },
                  {
                    offset: 1,
                    //渐变颜色条，最右边100%处的颜色值
                    color: "#1565c0",
                  },
                ],
                // 缺省为 false
                global: false,
              },
            },
            barCategoryGap: 50,
            barWidth: 14,
            tooltip: {
              show: false,
            },
            data: this.barValue, //[34.09, 76.62, 10.62, 2.04, 24.15, 30.68, 35.25],
            /*
              在bar上显示标签
            */
            /*   label: {
              show: true,
              position: "inside",
              fontSize: 10,
              color: "#fff",
              align: "center",
              formatter: "{c}%",}, */
          },
          {
            name: "backgroundBar",
            type: "bar",
            yAxisIndex: 1,
            barCategoryGap: 50,
            barWidth: 14,
            itemStyle: {
              borderRadius: 20,
              /* color: "none" 将不显示颜色 */
              color: "none",
              borderColor: "#1565c0",
              borderWidth: 1,
            },
            tooltip: {
              show: false,
            },
            animation: false,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
              borderColor: "#1565c0",
              borderRadius: 20,
              borderWidth: 1,
            },
            /* 默认进度条的值在100时为最大值*/
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          },
        ],
      },
    };
  },
  props: {
    /* 标题文字 */
    barTitle: {
      type: String,
      default: "冷站关键指标实时监控",
    },

    /* 接收一个目录 */
    barCategory: {
      type: Array,
      default() {
        return [
          "旁通压差", //96.87 mH₂O //米水柱
          "机房温度", //22.90 °C
          "冷冻水流量", //45.25 m³/h
          "集水器压力", //2.04 mH₂O
          "旁通阀位", //24.15  %
          "冷却水流量", // 30.68 m³/h
          "室外温度", //35.25 °C
          "进水温度", //37.18 °C
          "总供水温度", //28.64 °C
          "总回水温度", //34.42 °C
        ];
      },
    },

    /*  接收进度bar的数值 */
    barValue: {
      type: Array,
      default() {
        return [
          34.09, 76.62, 10.62, 12.04, 24.15, 30.68, 35.25, 37.18, 28.64, 34.42,
        ];
      },
    },

    /*  接收单位符号字符串 */
    unitSymbol: {
      type: Array,
      default() {
        return [
          "mH₂O",
          "°C",
          "m³/h",
          "mH₂O",
          "%",
          "m³/h",
          "°C",
          "°C",
          "°C",
          "°C",
        ];
      },
    },
  },

  watch: {
    barTitle(oldValue, newValue) {
      this.barTitleData = newValue;
    },
    barCategory(oldValue, newValue) {
      this.barCategoryData = newValue;
      // console.info(oldValue,newValue);
    },
    barValue(oldValue, newValue) {
      // this.barValueData = [];
      // for (let index = 0; index < newValue.length; index++) {
      //   this.$set(this.barValueData, index, newValue[index]);
      // }
      // console.info(this.barValueData);
      this.progressBarOption.series[0].data = this.barValue;
      this.progressBarOption.yAxis[1].data = this.barValue;
    },
    unitSymbol(oldValue, newValue) {
      this.unitSymbolData = newValue;
    },
  },

  // /* 下面的自适应代码来自互联网，暂时先使用，待弄清楚后再整理 */
  // mounted() {
  //   // 第二步，在页面加载渲染的时候执行echarts画图方法
  //   this.drawEcharts();
  // },
  // methods: {
  //   drawEcharts() {
  //     // 第三步，通过echarts的init方法实例化一个echarts对象myChart，并，保存在data变量中
  //     this.myChart = Echarts.init(document.getElementById("echart"));
  //     // 第四步，执行myChart的setOption方法去画图，当然至于配置项，我们要提前配置好，这里的配置项
  //     //         写在data中，方便我们在一些事件中去修改对应配置项，比如点击按钮更改配置项数据
  //     this.myChart.setOption(this.option);
  //     // 第五步，在页面初始化加载的时候绑定页面resize事件监听。补充resize事件：resize事件是在浏览器窗口大小改变时，会触发。
  //     //        如当用户调整窗口大小，或者最大化、最小化、恢复窗口大小显示时触发 resize 事件。
  //     //        我们一般使用这个事件去做窗口大小与对应元素的大小适配
  //     window.addEventListener("resize", () => {
  //       // 第六步，执行echarts自带的resize方法，即可做到让echarts图表自适应
  //       this.myChart.resize();
  //       // 如果有多个echarts，就在这里执行多个echarts实例的resize方法,不过一般要做组件化开发，即一个.vue文件只会放置一个echarts实例
  //       /*
  //       this.myChart2.resize();
  //       this.myChart3.resize();
  //       ......
  //       */
  //     });
  //   },
  // },
  // beforeDestroy() {
  //   /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
  //     容易导致内存泄漏和额外CPU或GPU占用哦*/
  //   window.removeEventListener("resize", () => {
  //     this.myChart.resize();
  //   });
  // },
};
</script>

<style scoped>
#ProgressBarChart {
  width: 100%;
  height: 4.5rem;
}
</style>

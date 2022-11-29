import img from "@/assets/images/pieBg.png"
import { deepCopy } from '@/utils/util'
const echartMixin = {
  data() {
    return {
      // 一个柱的柱状图
      optionBar1: {
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                //自定义颜色，渐变色填充折线图区域
                barBorderRadius: 100,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4E89FF" }, //渐变色
                  { offset: 1, color: "#5212C8" }, //渐变色
                ]),
              },
            },
            data: [],
          }
        ]
      },

      // 两个柱的柱状图
      optionBar2: {
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                //自定义颜色，渐变色填充折线图区域
                barBorderRadius: 100,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4E89FF" }, //渐变色
                  { offset: 1, color: "#5212C8" }, //渐变色
                ]),
              },
            },
            data: [],
          },
          {
            name: "",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                //自定义颜色，渐变色填充折线图区域
                barBorderRadius: 100,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FFA100" }, //渐变色
                  { offset: 1, color: "#FE5D00" }, //渐变色
                ]),
              },
            },
            data: [],
          },
        ],
      },

      // 三个柱状堆叠一个线的折柱混合图
      optionStackedBar3Line1: {
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#FB5965'
            },
            lineStyle: {
              color: '#FB5965',
              width: 2
            }
          },
        ],
      },

      // 柱状堆叠图(只设置了十个颜色)
      optionStackedBar: {
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        grid: {
          top: 92,
          right: 10,
          bottom: 40,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          clockWise: false,
          type: 'scroll', // 数据过多时，分页显示
          orient: 'horizontal',
          textStyle: {
            color: '#767BA5'
          },
          pageIconColor: '#999',
          pageIconInactiveColor: '#4d74ff',
          pageTextStyle: {
            color: '#767BA5'
          },
          data: []
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
          {
            name: "",
            type: "bar",
            stack: "one",
            barMaxWidth: 20,
            data: [],
          },
        ],
      },

      // 一个线的折线图
      optionLine1: {
        color:['#16E6FB'],
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              normal: {//自定义颜色，渐变色填充折线图区域
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#16E6FB' }, //渐变色
                  { offset: 1, color: 'rgba(22,230,251,.06)' } //渐变色
                ]),
              },
            }
          }
        ]
      },

      // 两个线的折线图
      optionLine2: {
        color:['#16E6FB', '#2970FF'],
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              normal: {//自定义颜色，渐变色填充折线图区域
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#16E6FB' }, //渐变色
                  { offset: 1, color: 'rgba(22,230,251,.06)' } //渐变色
                ]),
              },
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              normal: {//自定义颜色，渐变色填充折线图区域
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2970FF' }, //渐变色
                  { offset: 1, color: 'rgba(78,136,254,.06)' } //渐变色
                ]),
              },
            }
          }
        ]
      },

      // N个线的折线图
      optionLine: {
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 2
            }
          },
        ]
      },

      // 折线堆叠图(只设置了十个颜色)
      optionStackedLine: {
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        grid: {
          top: 92,
          right: 10,
          bottom: 40,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
          {
            name: "",
            type: "line",
            stack: "one",
            areaStyle: {},
            data: [],
          },
        ],
      },

      // 一个柱一个线的折柱混合图
      optionBar1Line1: {
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                //自定义颜色，渐变色填充折线图区域
                barBorderRadius: 100,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4E89FF" }, //渐变色
                  { offset: 1, color: "#5212C8" }, //渐变色
                ]),
              },
            },
            data: [],
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#FB5965'
            },
            lineStyle: {
              color: '#FB5965',
              width: 2
            }
          },
        ],
      },

      // 一个柱两个线的折柱混合图
      optionBar1Line2: {
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                //自定义颜色，渐变色填充折线图区域
                barBorderRadius: 100,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4E89FF" }, //渐变色
                  { offset: 1, color: "#5212C8" }, //渐变色
                ]),
              },
            },
            data: [],
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#FB5965'
            },
            lineStyle: {
              color: '#FB5965',
              width: 2
            }
          },
          {
            
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#C625FE'
            },
            lineStyle: {
              color: '#C625FE',
              width: 2
            }
          },
        ],
      },

      // 一个柱三个线的折柱混合图
      optionBar1Line3: {
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                //自定义颜色，渐变色填充折线图区域
                barBorderRadius: 100,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4E89FF" }, //渐变色
                  { offset: 1, color: "#5212C8" }, //渐变色
                ]),
              },
            },
            data: [],
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#FB5965'
            },
            lineStyle: {
              color: '#FB5965',
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#C625FE'
            },
            lineStyle: {
              color: '#C625FE',
              width: 2
            }
          },
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#FF8700'
            },
            lineStyle: {
              color: '#FF8700',
              width: 2
            }
          },
        ],
      },

      // 一个线一个虚线的折线图
      optionLine1Dashed1: {
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#FB5965'
            },
            lineStyle: {
              color: '#FB5965',
              width: 2
            }
          },
          {
            
            name: "",
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#C625FE'
            },
            lineStyle: {
              color: '#C625FE',
              width: 2,
              type: 'dashed'
            }
          },
        ]
      },

      // 六个线三个虚线的折线图
      optionLine6Dashed3: {
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "category",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          // {
          //   name: "",
          //   data: [],
          //   type: 'line',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
        ]
      },

      // 饼图(只设置了十个颜色)
      optionPie: {
        // color: ['#A6C4FF', '#3377FF', '#CA33FE', '#FF9933', '#49DFF0', '#FB5965'],
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        title: {
          text: ' ',
          subtext: '' ,
          left: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          subtextStyle: {
            color: '#4d74ff',
            fontSize: 18,
            fontWeight: 'bold'
          },
          itemGap: 170
        },
        legend: {
          top: 32,
          clockWise: false,
          type: 'scroll', // 数据过多时，分页显示
          orient: 'horizontal',
          textStyle: {
            color: '#767BA5'
          },
          pageIconColor: '#767BA5',
          pageIconInactiveColor: '#4d74ff',
          pageTextStyle: {
            color: '#767BA5'
          },
          data: []
        },
        graphic: {
          elements: [
            {
              type: 'image',
              z: 3,
              style: {
                image: img,
                width: 125,
                height: 125
              },
              left: 'center',
              top: 'center'
            }
          ]
        },
        toolbox: {
          show: false
        },
        tooltip: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [75, 80],
            hoverAnimation: false,
            minShowLabelAngle: 0,
            data: [],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: true
            },
            itemStyle: {
              color: '#767BA5',
              borderRadius: 10,
              borderColor: '#767BA5',
              borderWidth: 2,
              normal: {
                label: {
                  show: true,
                  position: 'outside',
                  color: '#767BA5',
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                color: '#767BA5',
                fontSize: 'normal',
                fontWeight: 'normal'
              },
              itemStyle: {
                color: '#767BA5',
              }
            },
          },
        ],
      },

      // 散点图
      optionScatter1: {
        color: ['#0067C4', '#FF8700', '#29CCCC', '#28BF7E', '#FF666E', '#8B66B2', '#B6C2FF', '#33FFFF', '#FFD400', '#96EDC1'],
        grid: {
          top: 92,
          right: 10,
          bottom: 20,
          left: 40,
          containLabel: true
        },
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          data: [],
          textStyle: {
            color: "#767BA5",
          },
        },
        xAxis: {
          type: "value",
          name: "",
          axisTick: {
            //去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", //X轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "",
          axisTick: {
            // 去掉坐标轴刻线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#767BA5", // y轴的颜色
            },
          },
          axisLabel: {
            color: "#767BA5",
          },
          splitLine: {
            lineStyle: {
              color: ["#37394D"],
              type: "solid",
            },
          },
        },
        series: [{
          symbol: 'circle',
          symbolSize: 12,
          data: [],
          type: 'scatter'
      }]
      },

      // 仪表盘
      optionGauge2: {
        angleAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 160,
          boundaryGap: ['0', '100'],
          startAngle: 225
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: ['a', 'b', 'c'],
          z: 10
        },
        polar: {
          radius: '80%'
        },
        series: [
          {
            type: 'bar',
            data: [, , 0],
            coordinateSystem: 'polar',
            barMaxWidth: 10,
            z: 2,
            name: '',
            roundCap: true,
            color: '#16E6FB',
            barGap: '-100%',
          }, {
            type: 'bar',
            data: [, , 0],
            z: 1,
            coordinateSystem: 'polar',
            barMaxWidth: 10,
            name: '',
            roundCap: true,
            color: '#2970FF',
            barGap: '-100%',
          }, {
            type: 'bar',
            data: [, , 120],
            z: 0,
            silent: true,
            coordinateSystem: 'polar',
            barMaxWidth: 10,
            name: '',
            roundCap: true,
            color: 'rgba(110, 110, 110, 0.5)',
            barGap: '-100%',
          }, {
            type: 'pie',
            z: -1,
            radius: [0, '50%'],
            itemStyle: {
              borderWidth: 0,
              shadowBlur: 44,
              shadowColor:'rgba(14,73,206,0.23)',
              normal: {
                label:{
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: [{
              value: 0,
              itemStyle: {
                color: '#212135',
              }
            }]
          }, {
            type: 'gauge',
            radius: '48%',
            max: 100,
            detail: {
              show: false,
              offsetCenter: [0, '90%'],
              fontSize: 14,
              color: '#333'
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
              }
            },
            splitLine: {
              show: true,
              length: 15,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              show: true,
              color: '#ddd',
              fontSize: 12,
            },
            pointer: {
              show: false,
              itemStyle: {
                color: '#333'
              }
            }
          }
        ],
        title: {
          text: '',
          subtext:'',
          x: 'center',
          textStyle: {
            color: '#767BA5',
            fontSize: 18
          },
          textAlign: 'left'
        },
        legend: {
          top: 32,
          show: true,
          icon: 'circle',
          itemWidth: 14,
          itemHeight: 14,
          textStyle: {
            fontSize: 12,
            color: '#767BA5'
          },
          bottom: 30,
          left: 'center',
          data: []
        },
          tooltip: {
            show: false
          },
      },
    };
  },
  created () {

  },

  // methods: {
  //   changeColor() {
  //     this.optionBar1Line2.legend.textStyle.color = document.body.style.getPropertyValue("--primary-color").trim()
  //     this.optionBar1Line3.legend.textStyle.color = document.body.style.getPropertyValue("--primary-color").trim()
  //   }
  // },

  // watch: {
  //   '$store.state.common.currentTheme': {
  //     immediate: true,
  //     handler:function (val) {
  //       this.changeColor()
  //     }
  //   } 
  // }
};

export default echartMixin;

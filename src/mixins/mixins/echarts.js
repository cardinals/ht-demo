import img from "@/assets/images/echarts.png";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
const echartMixin = {
  data() {
    return {
      // 柱状图
      lineChartsOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#E8E093",
              shadowColor: "#1E6262",
              shadowBlur: 30,
              shadowOffsetX: 10,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#E8E093",
            },
          },
          show: true,
          formatter: function(params) {
            return params[0].name + "<br>" + params[0].data + "次";
          },
        },
        grid: {
          left: "2%",
          right: "8%",
          bottom: "10%",
          top: "14%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "gray",
              fontSize: 14,
            },
          },
          axisLine: {
            show: false,
          },
        },

        yAxis: {
          minInterval: 1,
          // interval: 1,
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "gray",
              fontSize: 14,
            },
            formatter: "{value}",
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "1",
            type: "bar",
            barMaxWidth: "20",
            barWidth: "60%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(87,197,255,0.4)",
                  },
                  {
                    offset: 1,
                    color: "rgba(93,140,246,1)",
                  },
                ]),
                barBorderRadius: 20,
              },
            },
            data: [],
          },
        ],
      },

      //折线图
      lineChartsOption1: {
        title: {
          text: "全国6月销售统计",
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
          },
          left: "center",
          top: "5%",
        },
        legend: {
          icon: "circle",
          top: "5%",
          right: "5%",
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: "#556677",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
        },
        grid: {
          left: "2%",
          right: "8%",
          bottom: "6%",
          top: "14%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["北京", "上海", "广州", "深圳", "香港", "澳门", "台湾"],
            axisLine: {
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#556677",
              },
              // 默认x轴字体大小
              fontSize: 12,
              // margin:文字到x轴的距离
              margin: 15,
            },
            axisPointer: {
              label: {
                // padding: [11, 5, 7],
                padding: [0, 0, 10, 0],
                /*
    除了padding[0]建议必须是0之外，其他三项可随意设置
    
    和CSSpadding相同，[上，右，下，左]
    
    如果需要下边线超出文字，设左右padding即可，注：左右padding最好相同
    
    padding[2]的10:
    
    10 = 文字距下边线的距离 + 下边线的宽度
                
    如：UI图中文字距下边线距离为7 下边线宽度为2
    
    则padding: [0, 0, 9, 0]
                
                */
                // 这里的margin和axisLabel的margin要一致!
                margin: 15,
                // 移入时的字体大小
                fontSize: 12,
                backgroundColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      // offset: 0.9,
                      offset: 0.86,
                      /*
0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
                        
                        */
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#33c0cd", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#33c0cd", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#556677",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            position: "right",
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#556677",
              },
              formatter: "{value}",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Adidas",
            type: "line",
            data: [10, 10, 30, 12, 15, 3, 7],
            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#9effff",
                },
                {
                  offset: 1,
                  color: "#9E87FF",
                },
              ]),
              shadowColor: "rgba(158,135,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0],
              },
            },
          },
          {
            name: "Nike",
            type: "line",
            data: [5, 12, 11, 14, 25, 16, 10],
            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: this.$echarts.graphic.LinearGradient(1, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#73DD39",
                },
                {
                  offset: 1,
                  color: "#73DDFF",
                },
              ]),
              shadowColor: "rgba(115,221,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[1],
                borderColor: colorList[1],
              },
            },
          },
          {
            name: "老北京布鞋",
            type: "line",
            data: [150, 120, 170, 140, 500, 160, 110],
            symbolSize: 1,
            yAxisIndex: 1,
            symbol: "circle",
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#fe9a",
                },
                {
                  offset: 1,
                  color: "#fe9a8b",
                },
              ]),
              shadowColor: "rgba(254,154,139, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[2],
                borderColor: colorList[2],
              },
            },
          },
        ],
      },
      //地图
      earthOption: {
        title: {
          text: "七大区域",
          left: "center",
          top: 54,
          textStyle: {
            color: "#1a1b4e",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 24,
          },
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          backgroundColor: "rgba(0,0,0,.8)",
          borderColor: "#3574c8",
          borderWidth: "2",
          extraCssText: "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          show: true,
          formatter: function(params) {
            var res;
            if (params.value > 0) {
              res = params.data.value2 + "<br/>";
              res += params.data.value3;
            } else {
              res = "";
            }
            return res;
          },
        },
        visualMap: {
          min: 0,
          max: 7,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          show: false,
          inRange: {
            color: ["#ffffff", "#ffc188", "#479fd2", "#fba853", "#48c7c0", "#fa8737", "#4bbdd6", "#ff6f5b"],
          },
          //北京：1      四川：2    河南：3     内蒙：4     安徽：5    新疆：6     福建：7
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              color: "#333",
            },
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#fbfbfb",
              borderColor: "#fff",
            },
            emphasis: {
              areaColor: "#3574c8",
            },
          },
        },
        series: [
          {
            type: "map",
            mapType: "china",
            geoIndex: 0,
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            data: [
              {
                name: "北京",
                value: 1,
                value2: "京津冀地区",
                value3: "包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。",
              },
              {
                name: "天津",
                value: 1,
                value2: "京津冀地区",
                value3: "包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。",
              },
              {
                name: "河北",
                value: 1,
                value2: "京津冀地区",
                value3: "包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。",
              },
              {
                name: "重庆",
                value: 2,
                value2: "西南适宜地区",
                value3: "自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。",
              },
              {
                name: "云南",
                value: 2,
                value2: "西南适宜地区",
                value3: "自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。",
              },
              {
                name: "贵州",
                value: 2,
                value2: "西南适宜地区",
                value3: "自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。",
              },
              {
                name: "四川",
                value: 2,
                value2: "西南适宜地区",
                value3: "自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。",
              },
              {
                name: "河南",
                value: 3,
                value2: "黄淮海地区",
                value3: "自然条件较为优越，年均降水量多在 600-800 毫米<br />之间。主要培育适宜该区域生长的毛白杨、欧美杨<br />等浆纸和人造板工业原料林，发展栎类、榉树等珍稀树种和<br />大径级用材林。",
              },
              {
                name: "山东",
                value: 3,
                value2: "黄淮海地区",
                value3: "自然条件较为优越，年均降水量多在 600-800 毫米<br />之间。主要培育适宜该区域生长的毛白杨、欧美杨<br />等浆纸和人造板工业原料林，发展栎类、榉树等珍稀树种和<br />大径级用材林。",
              },
              {
                name: "辽宁",
                value: 4,
                value2: "东北地区",
                value3: "选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "黑龙江",
                value: 4,
                value2: "东北地区",
                value3: "选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "内蒙古",
                value: 4,
                value2: "东北地区",
                value3: "选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "吉林",
                value: 4,
                value2: "东北地区",
                value3: "选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "湖南",
                value: 5,
                value2: "长江中下游地区",
                value3: "自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。",
              },
              {
                name: "安徽",
                value: 5,
                value2: "长江中下游地区",
                value3: "自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。",
              },
              {
                name: "浙江",
                value: 5,
                value2: "长江中下游地区",
                value3: "自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。",
              },
              {
                name: "江西",
                value: 5,
                value2: "长江中下游地区",
                value3: "自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。",
              },
              {
                name: "湖北",
                value: 5,
                value2: "长江中下游地区",
                value3: "自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。",
              },
              {
                name: "江苏",
                value: 5,
                value2: "长江中下游地区",
                value3: "自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。",
              },
              {
                name: "新疆",
                value: 6,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "甘肃",
                value: 6,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "山西",
                value: 6,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "青海",
                value: 6,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "陕西",
                value: 6,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "宁夏",
                value: 6,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "广西",
                value: 7,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "福建",
                value: 7,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "广东",
                value: 7,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "海南",
                value: 7,
                value2: "西北地区",
                value3: "选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。",
              },
              {
                name: "上海",
                value: 0,
              },
              {
                name: "西藏",
                value: 0,
              },
              {
                name: "台湾",
                value: 0,
              },
              {
                name: "香港",
                value: 0,
              },
              {
                name: "澳门",
                value: 0,
              },
              {
                name: "南海诸岛",
                value: 0,
              },
            ],
          },
        ],
      },
    };
  },

  watch: {},
};

export default echartMixin;

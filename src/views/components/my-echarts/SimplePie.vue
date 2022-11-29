<template>
  <echarts :options="pieOption"></echarts>
</template>

<script>
export default {
  name: "SimplePie",
  data() {
    return {
      pieData: {},
      trafficWay: [],
      img: require("@/assets/images/pieBg.png"),
      pieOption: {
        // color: ['#A6C4FF', '#3377FF', '#CA33FE', '#FF9933', '#49DFF0', '#FB5965'],
        color: [
          "#0067C4",
          "#FF8700",
          "#29CCCC",
          "#28BF7E",
          "#FF666E",
          "#8B66B2",
          "#B6C2FF",
          "#33FFFF",
          "#FFD400",
          "#96EDC1",
        ],
        title: {
          text: " ",
          subtext: "",
          left: "center",
          textStyle: {
            color: "#767BA5",
            fontSize: 18,
          },
          subtextStyle: {
            color: "#4d74ff",
            fontSize: 18,
            fontWeight: "bold",
          },
          itemGap: 170,
          show: false,
        },
        legend: {
          left: "10%", //图例距离左的距离
          y: "bottom", //图例上下居中
          clockWise: false,
          // type: "scroll", // 数据过多时，分页显示
          orient: "horizontal",
          textStyle: {
            color: "#767BA5",
          },
          pageIconColor: "#767BA5",
          pageIconInactiveColor: "#4d74ff",
          pageTextStyle: {
            color: "#767BA5",
          },
          data: [],
          width: 400,
          itemWidth: 10,
          itemHeight: 10,
        },
        grid: {
          left: "10%",
          top: 60,
          right: "10%",
          bottom: 60,
        },
        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: this.img,
                width: 125,
                height: 125,
              },
              left: "center",
              top: "center",
            },
          ],
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: [75, 80],
            hoverAnimation: false,
            minShowLabelAngle: 0,
            data: [],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: true,
            },
            itemStyle: {
              color: "#767BA5",
              borderRadius: 10,
              borderColor: "#767BA5",
              borderWidth: 2,
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  color: "#767BA5",
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                color: "#767BA5",
                fontSize: "normal",
                fontWeight: "normal",
              },
              itemStyle: {
                color: "#767BA5",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getPieOption() {
      this.pieOption.legend.data = [
        "冷源主机",
        "热源主机",
        "冷却塔",
        "冷却泵",
        "冷冻泵",
        "其他设备",
      ];
      this.pieOption.series[0].itemStyle.normal.label = {
        show: true,
        position: "outside",
        color: "#767BA5",
        formatter: (params) => {
          var percent = 0;
          var total = 0;
          for (var i = 0; i < this.trafficWay.length; i++) {
            total += parseFloat(this.trafficWay[i].value);
          }
          this.pieOption.title.text = "饼图";
          this.pieOption.title.subtext = total.toFixed(2);
          percent = ((params.value / total) * 100).toFixed(2);
          if (params.name !== "") {
            if (window.isNaN(percent)) {
              return params.name + "\n" + "\n" + params.value + "/" + 0 + "%";
            } else {
              return (
                params.name + "\n" + "\n" + params.value + "/" + percent + "%"
              );
            }
          } else {
            return "";
          }
        },
      };
      this.trafficWay = [
        {
          name: "冷源主机",
          value: 120,
        },
        {
          name: "热源主机",
          value: 120,
        },
        {
          name: "冷却塔",
          value: 120,
        },
        {
          name: "冷却泵",
          value: 120,
        },
        {
          name: "冷冻泵",
          value: 120,
        },
        {
          name: "其他设备",
          value: 120,
        },
      ];
      this.getPieData();
    },
    // 处理饼图数据
    getPieData() {
      this.pieData = [];
      //echarts 数据准备
      for (var i = 0; i < this.trafficWay.length; i++) {
        this.pieData.push({
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
        });
      }
      this.pieOption.series[0].data = this.pieData;
    },
  },
  mounted() {
    this.getPieOption();
  },
};
</script>

<style>
</style>

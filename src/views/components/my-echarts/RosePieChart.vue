<template>
  <echarts id="RosePieChart" :options="rosePieOption"></echarts>
</template>

<script>
export default {
  name: "RosePieChart",
  data() {
    return {
      rosePieOption: {
        legend: {
          show: true,
          top: "bottom",
          textStyle: {
            color: "#fff",
          },
          itemStyle: {
            color: "inherit",
            opacity: "inherit",
            borderColor: "inherit",
            borderWidth: 0,
            borderCap: "inherit",
            borderJoin: "inherit",
            borderDashOffset: "inherit",
            borderMiterLimit: "inherit",
          },
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            type: "pie",
            radius: [25, 125],
            center: ["50%", "35%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 4,
            },
            label: {
              borderColor: "none",
              borderWidth: 0,
            },
            data: [
              { value: 40, name: "统计数据一" },
              { value: 38, name: "统计数据二" },
              { value: 32, name: "统计数据三" },
              { value: 30, name: "统计数据四" },
              { value: 28, name: "统计数据五" },
              { value: 26, name: "统计数据六" },
            ],
          },
        ],
      },
    };
  },
  props: {
    innerRadius: {
      type: Number,
      default: 25,
    },
    outterRadius: {
      type: Number,
      default: 125,
    },
  },
  mounted() {
    this.rosePieOption.series[0].radius = [this.innerRadius, this.outterRadius];
    //console.info(this.innerRadius, "yyy");
  },
};
</script>

<style scoped>
#RosePieChart {
  width: 100%;
  height: 3.125rem;
}
</style>
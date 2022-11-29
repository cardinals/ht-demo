<template>
  <echarts
    :options="barShadowOption"
    style="width: 400px; height: 270px; margin-left: 20px"
  ></echarts>
</template>

<script>
export default {
  name: "BarShadowChart",
  data() {
    return {
      barShadowOption: {
        yAxis: {
          type: "category",
          data: [
            "室外温度",
            "室外温度",
            "室外温度",
            "室外温度",
            "室外温度",
            "室外温度",
            "室外温度",
          ],
        },
        xAxis: {
          type: "value",
        },
        textStyle: {
          color: "#fff",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>
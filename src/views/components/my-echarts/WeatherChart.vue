<template>
  <div id="he-plugin-standard"></div>
</template>

<script>
export default {
  name: "WeatherChart",
  data() {
    return {};
  },
  mounted() {
    //天气插件配置
    window.WIDGET = {
      CONFIG: {
        layout: "1",
        width: "450",
        height: "150",
        background: "1",
        dataColor: "FFFFFF",
        key: "4e0c9749d1694e35bd4d4aef64279817",
      },
    };
    //引入天气插件
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
      "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.body.appendChild(s);
  },
};
</script>

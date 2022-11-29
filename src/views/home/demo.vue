<template>
  <Layout class="uiRootLayout" ref="frame">
    <Header class="header">
      <img :src="headerTitleImg" class="title" alt="楼宇智能化平台数据系统" />
      <div class="showTime">当前时间：{{ headerInfo.currentTime }}</div>
      <div class="showUser">值班人员：{{ headerInfo.currentUser }}</div>
      <!-- <dv-decoration-3 class="headdecoration" /> -->
    </Header>

    <Layout class="siderLayout">
      <!-- 左侧图表 -->
      <transition>
        <Sider v-model="isCollapsed" collapsed-width="0" hide-trigger breakpoint="sm" @on-collapse="changed" collapsible
          ref="sideLeft" :width="siderWidth" class="siderLeft ml10">
          <transition name="animleft" appear>
            <CardPanel title="实时天气数据" :height="180" v-show="true" class="anim1">
              <WeatherChart slot="cardbodyslot" />
            </CardPanel>
          </transition>

          <transition name="animleft" appear>
            <CardPanel title="空调机组实时数据" :height="370" class="anim2">
              <div class="outerBox" slot="cardbodyslot">
                <div class="innerBox">
                  <IndicatorBox v-for="(item, index) in getindicatorBox(0, 3)" :key="index" :word1="item.word1"
                    :word2="item.word2" :word3="item.word3" />
                </div>
                <div class="innerBox mt20">
                  <IndicatorBox v-for="(item, index) in getindicatorBox(3, 6)" :key="index" :word1="item.word1"
                    :word2="item.word2" :word3="item.word3" />
                </div>
              </div>
            </CardPanel>
          </transition>

          <transition name="animleft" appear>
            <CardPanel title="楼宇实时综合监控" class="cardElement anim3">
              <Template class="videoWrapper" slot="cardbodyslot">
                <video class="video" :src="videoClip" controls autoplay loop :poster="videoPoster" />
              </Template>
            </CardPanel>
          </transition>
        </Sider>
      </transition>

      <!-- 中间图扑 -->
      <Sider class="siderMiddle">
        <HtWeb class="htweb" :vHeight="uiHeight" :hWidth="uiWidth" />
      </Sider>
      <!--
         :monitorInfo="getMonitorData"
          :monitorParkInfo="getParkMonitorData"
          :mainbuildInfo="getMainBuildData"
      -->

      <!-- 右侧图表 -->
      <transition>
        <Sider v-model="isCollapsed" collapsed-width="0" hide-trigger breakpoint="sm" @on-collapse="changed" collapsible
          ref="sideRight" :width="siderWidth" class="siderRight mr10">
          <transition name="animright" appear>
            <CardPanel title="交互功能" :height="190" class="cardElement anim4">
              <div slot="cardbodyslot">
                <div class="innerBox">
                  <Button type="primary" class="bt" :style="{ 'background-color': '#1976d2' }"
                    v-for="(item, index) in buttonList.slice(0, 4)" :key="index"
                    @click="interactiveFunc(item.name, $event)">{{ item.name }}</Button>
                </div>

                <div class="innerBox mt20">
                  <Button type="primary" class="bt" :style="{ 'background-color': '#1565c0' }"
                    v-for="(item, index) in buttonList.slice(4, 8)" :key="index"
                    @click="interactiveFunc(item.name, $event)">{{ item.name }}</Button>
                </div>

                <div class="innerBox mt20">
                  <Button type="primary" class="bt" :style="{ 'background-color': '#0d47a1' }"
                    v-for="(item, index) in buttonList.slice(8, 12)" :key="index"
                    @click="interactiveFunc(item.name, $event)">{{ item.name }}</Button>
                </div>
              </div>
            </CardPanel>
          </transition>

          <transition name="animright" appear>
            <CardPanel title="冷站指标实时监控" :height="360" class="cardElement anim5">
              <ProgressBarChart slot="cardbodyslot" :barCategory="coldStationMonitorCategory"
                :barValue="coldStationMonitorData" :barTitle="coldStationMonitorTitle"
                :unitSymbol="coldStationMonitorUnit"></ProgressBarChart>
            </CardPanel>
          </transition>

          <transition name="animright" appear>
            <CardPanel title="热源系统实时监控" class="anim6">
              <CircleBarChart slot="cardbodyslot" :barValue="hotStationMonitor" />
            </CardPanel>
          </transition>
        </Sider>
      </transition>
    </Layout>
  </Layout>
</template>

<script>
import RosePieChart from "@/views/components/my-echarts/RosePieChart";
import ComplexCircleChart from "@/views/components/my-echarts/ComplexCircleChart";
import BarShadowChart from "@/views/components/my-echarts/BarShadowChart";
import ProgressBarChart from "@/views/components/my-echarts/ProgressBarChart";
import CircleBarChart from "@/views/components/my-echarts/CircleBarChart";
import WeatherChart from "@/views/components/my-echarts/WeatherChart";

import CardPanel from "@/views/components/my-comps/CardPanel";
import IndicatorBox from "@/views/components/my-comps/IndicatorBox";

import { parseDate2Str } from "@/utils/util";
import { getUserData, getDemoData } from "@/apis/api/test";
import VideoMonitor from "@/views/videoMonitor/videoMonitor";
import axios from "axios";

export default {
  name: "Demo",
  components: {
    RosePieChart,
    ComplexCircleChart,
    BarShadowChart,
    CardPanel,
    VideoMonitor,
    IndicatorBox,
    ProgressBarChart,
    WeatherChart,
    CircleBarChart,
  },
  data() {
    return {
      headerInfo: {
        currentUser: "智娄宇",
        currentTime: parseDate2Str(new Date(), "YYYY年MM月DD日 HH:mm:ss"),
      },
      uiHeight: 0,
      uiWidth: 0,
      isCollapsed: false,
      headerTitleImg: require("@/assets/images/demo/headerTitleImg.png"),
      borderAImg: require("@/assets/images/demo/borderCommon001.png"),
      borderTitleAImg: require("@/assets/images/demo/borderTitleCommon001.png"),
      borderTiltePointImg: require("@/assets/images/demo/pointBlue.png"),
      videoClip: require("@/assets/video/test.mp4"),
      videoPoster: require("@/assets/images/img/7.png"),
      siderWidth: 400,
      allData: null,
      indicatorBoxList: [
        { word1: "76.93%", word2: "0-100", word3: "电动水阀反馈" },
        { word1: "59.62°C", word2: "0-80", word3: "回水温度" },
        { word1: "76.52%", word2: "0-80", word3: "回风湿度" },
        { word1: "5.03°C", word2: "0-20", word3: "回风温度" },
        { word1: "56.63°C", word2: "0-80", word3: "送风温度" },
        { word1: "76.52ppm", word2: "0-100", word3: "回风二氧化碳浓度" },
      ],
      buttonList: [
        { name: "空调监控" },
        { name: "电梯监控" },
        { name: "车场监控" },
        { name: "1#楼监控" },
        { name: "空调机房" },
        { name: "广场漫游" },
        { name: "室内行走" },
        { name: "广场定位" },
        { name: "主楼展示" },
        { name: "功能键二" },
        { name: "功能键三" },
        { name: "功能键四" },
      ],
    };
  },

  methods: {
    fullScreen3d(_this) {
      console.info("执行三维全屏操作");
    },
    toggleCollapse() {
      this.$refs.side.toggleCollapse();
    },
    changed(res) {
      console.log(res);
    },
    interactiveFunc(btName, event) {
      if (!!btName) {
        let even = (element) => element.name === btName;
        if (this.buttonList.some(even)) {
          console.info(`总部呼叫${btName}`);
          this.$bus.$emit("btEvent", btName);
        }
      }
    },
    getindicatorBox(start, end) {
      if (
        !!this.allData &&
        !!this.allData.data.heatingAndVentilationSystem.indicatorBox
      ) {
        return this.allData.data.heatingAndVentilationSystem.indicatorBox.slice(
          start,
          end
        );
      } else {
        return this.indicatorBoxList.slice(start, end);
      }
    },
  },
  computed: {
    coldStationMonitorCategory() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem.coldSource
          .coldStationMonitor.category;
      }
    },
    coldStationMonitorData() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem.coldSource
          .coldStationMonitor.data;
      }
    },
    coldStationMonitorTitle() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem.coldSource
          .coldStationMonitor.title;
      }
    },
    coldStationMonitorUnit() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem.coldSource
          .coldStationMonitor.unit;
      }
    },
    hotStationMonitor() {
      if (!!this.allData) {
        let result = [];
        let obj =
          this.allData.data.heatingAndVentilationSystem.hotSource
            .hotStationMonitor;
        for (const key in obj) {
          result.push(obj[key]);
        }
        return result;
      }
    },
    getMonitorData() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem
          .airConditionerMonitor;
      }
    },
    getParkMonitorData() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem.parkMonitor;
      }
    },
    getMainBuildData() {
      if (!!this.allData) {
        return this.allData.data.heatingAndVentilationSystem.mainBuildInfo;
      }
    },
  },

  mounted() {
    this.timerLoop = setInterval(
      function () {
        this.headerInfo.currentTime = parseDate2Str(
          new Date(),
          "YYYY年MM月DD日 HH:mm:ss"
        );
      }.bind(this),
      1000
    );

    // this.dataGetLoop = setInterval(
    //   function () {
    //     axios
    //       .get(
    //         "http://127.0.0.1:4523/mock/733030/kunlunshijie/louyusanwei/testdata"
    //       )
    //       .then((result) => {
    //         this.allData = result;
    //         // console.info(this.allData);
    //       })
    //       .catch((err) => {
    //         console.info(err.message);
    //       });
    //   }.bind(this),
    //   5000
    // );
    
    console.log("当前echarts版本号:", echarts.version);
    let arrs = this.$refs.frame.$children;
    // for (let index = 0; index < arrs.length; index++) {
    //   let element = arrs[index];
    //   this.uiHeight += element.$el.clientHeight;
    //   this.uiWidth += element.$el.clientWidth;
    // }
    this.uiHeight += arrs[1].$el.clientHeight;
    this.uiWidth += arrs[1].$el.clientWidth;

    //测试代理服务器
    // axios
    //   .get("http://localhost:9001/testproxy/students")
    //   .then((response) => {
    //     console.info(
    //       response.data,
    //       "通过vue-cli代理服务器获取数据................"
    //     );
    //   })
    //   .catch((err) => {
    //     console.info(err.message);
    //   });
  },

  beforeDestroy() {
    if (this.timerLoop) {
      clearInterval(this.timerLoop);
    }
    if (this.dataGetLoop) {
      clearInterval(this.dataGetLoop);
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.uiRootLayout {
  background: url("~@/assets/images/demo/demoBackground.jpg");
  background-size: cover;
  overflow: hidden;
}

.header {
  position: relative;
  height: 0.5875rem;
  background: url("~@/assets/images/demo/headerBackground.png");
  background-size: 100% 100%;
}

/* .headdecoration {
  height: 0.375rem;
  width: 3.125rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3.625rem;
  height: 0.5875rem;
  transform: translate(-50%, -50%);
}

.showTime {
  position: absolute;
  top: 0;
  right: 0.375rem;
  font-size: 0.15rem;
  line-height: 0.5875rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
}

.showUser {
  position: absolute;
  top: 0.2rem;
  right: 0.375rem;
  font-size: 0.15rem;
  line-height: 0.5875rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sysFunc {
  display: flex;
  flex-direction: column;
}

.cardElement {
  margin-top: 2px;
}

.videoWrapper {
  display: flex;
  align-content: center;
}

.video {
  width: 4.75rem;
  height: 3.125rem;
}

.outerBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.innerBox {
  width: 4.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.bt {
  width: 1rem;
}

/* .unityWeb {
  width: "100vw";
} */

.pointer-invalid {
  pointer-events: none;
}

.siderLayout {
  z-index: 50000;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
}

.siderLeft {
  z-index: 50000;
  top: 0px;
  left: 0px;
  float: left;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0);
}

.siderMiddle {
  z-index: -50000;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0);
}

.test {
  margin: 10px;
}

.siderMiddle:nth-child(1) {
  z-index: -40000;
}

.siderRight {
  z-index: 50000;
  position: absolute;
  right: 0px;
  float: right;
  background-color: rgba(0, 0, 0, 0);
}

/* .weatherAnim-enter-active {
  animation: fadeinout 1s linear;
}
.weatherAnim-leave-active {
  animation: fadeinout 1s linear reverse;
}
@keyframes fadeinout {
  fadein {
    transform: translateX(-1000px);
  }
  fadeout {
    transform: translateX(0px);
  }
} */
.anim1 {
  transition: 0.25s linear;
}

.anim2 {
  transition: 0.5s linear;
}

.anim3 {
  transition: 0.75s linear;
}

.anim4 {
  transition: 0.25s linear;
}

.anim5 {
  transition: 0.5s linear;
}

.anim6 {
  transition: 0.75s linear;
}

/* 进入起点  离开终点*/
.animleft-enter,
.animleft-leave-to {
  transform: translateX(-100%);
}

/* 进入终点  离开起点*/
.animleft-enter-to,
.animleft-leave {
  transform: translateX(0);
}

/* .animleft-enter-active,
.animleft-leave-active {
  transition: 0.75s linear;
} */
/* 进入起点  离开终点*/
.animright-enter,
.animright-leave-to {
  transform: translateX(100%);
}

/* 进入终点  离开起点*/
.animright-enter-to,
.animright-leave {
  transform: translateX(0);
}
</style>

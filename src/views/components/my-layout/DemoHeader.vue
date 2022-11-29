<template>
  <div class="demoHeader">
    <img :src="titleImg" class="headtitle" alt="楼宇智能化平台数据系统" />
    <div class="showTime">当前时间：{{ headerRightInfo.currentTime }}</div>
    <div class="showUser">值班人员：{{ headerRightInfo.currentUser }}</div>
  </div>
</template>

<script>
import { parseDate2Str } from "@/utils/util";

export default {
  name: "DemoHeader",
  data() {
    return {
      headerRightInfo: {
        currentUser: "智娄宇",
        currentTime: parseDate2Str(new Date(), "YYYY年MM月DD日 HH:mm:ss"),
      },
      titleImg: require("@/assets/images/demo/headerTitleImg.png"),
    };
  },
  mounted() {
    this.timerLoop = setInterval(
      function () {
        this.headerRightInfo.currentTime = parseDate2Str(
          new Date(),
          "YYYY年MM月DD日 HH:mm:ss"
        );
      }.bind(this),
      1000
    );
  },
  beforeDestroy() {
    if (this.timerLoop) {
      clearInterval(this.timerLoop);
    }
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.demoHeader {
  position: relative;
  height: 0.5875rem;
  background: url("~@/assets/images/demo/headerBackground.png");
  background-size: 100% 100%;

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

  .headtitle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.625rem;
    height: 0.5875rem;
    transform: translate(-50%, -50%);
  }
}
</style>

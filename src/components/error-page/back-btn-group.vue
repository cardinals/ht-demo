<!--
 * @Descripttion: 
 * @Author: licongzheng
 * @Date: 2020-07-22 14:57:45
 * @LastEditors: licongzheng
 * @LastEditTime: 2020-07-28 19:44:11
--> 
<template>
  <div>
    <Button size="large" @click="backHome">返回首页</Button>
    <Button size="large" @click="backPrev">返回上一页({{ second }}s)</Button>
  </div>
</template>

<script>
import "./error.less";
export default {
  name: "backBtnGroup",
  data() {
    return {
      second: 5,
      timer: null
    };
  },
  methods: {
    backHome() {
      this.$router.replace({
        path: "/login"
      });
    },
    backPrev() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

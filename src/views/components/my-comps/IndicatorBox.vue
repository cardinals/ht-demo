<template>
  <div class="classes">
    <transition>
      <div class="box">
        <span class="white" ref="wordcss">{{ word1 }}</span>
      </div>
    </transition>
    <span
      style="color: rgba(255, 255, 255, 0.75); margin-top: 4px; font-size: 12px"
      >{{ word2 }}</span
    >
    <span
      style="
        color: rgba(255, 255, 255, 1);
        margin-top: 4px;
        <!-- background-color: #01579b; -->
      "
      >{{ word3 }}</span
    >
  </div>
</template>

<script>
// import 'animate.css';
export default {
  name: "IndicatorBox",
  data() {
    return {
      ContentBackground: require("@/assets/images/demo/circle02.png"),
    };
  },
  props: {
    word1: {
      type: String,
      default: "word1",
    },
    word2: {
      type: String,
      default: "word2",
    },
    word3: {
      type: String,
      default: "word3",
    },
  },
  watch: {
    word1(oldvalue, newvalue) {
      this.$refs.wordcss.style.color = "rgb(255, 255, 255)";
      let value = newvalue.split(" ")[0];
      if (value >= 55) {
        this.$refs.wordcss.style.color = "rgb(255, 0, 0)";
      } else {
        this.$refs.wordcss.style.color = "rgb(255, 255, 255)";
      }
    },
  },
};
</script>

<style scoped>
.classes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/images/demo/bigcircle.png");
  background-size: 100% 100%;
}

.word3 {
  font-size: 14px;
}

.white {
  color: rgb(255, 255, 255);
  font-weight: bold;
}
</style>

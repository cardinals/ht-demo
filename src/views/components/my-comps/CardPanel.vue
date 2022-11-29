<template>
  <div class="cardpanel">
    <div class="cardhead" ref="cardhead" v-if="showHead">
      <img :src="pointIcon" class="cardheadicon" />
      <span class="cardheadword">{{ title }}</span>
    </div>
    <div class="cardpanelextra" v-if="showExtra">
      <slot name="extra"></slot>
    </div>
    <div class="cardpanelbody" ref="cardbody">
      <slot name="cardbodyslot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPanel",
  data() {
    return {
      showHead: true,
      showExtra: true,
      pointIcon: require("@/assets/images/demo/pointBlue.png"),
    };
  },
  props: {
    title: {
      type: String,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 276,
    },
  },
  mounted() {
    this.showHead = !!this.title;
    this.showExtra = this.$slots.extra !== undefined;
    this.$refs.cardbody.style.width = this.width / 80 + `rem`;
    this.$refs.cardbody.style.height = this.height / 80 + `rem`;
    this.$refs.cardhead.style.width = this.width / 80 + `rem`;
  },
  watch: {},
};
</script>

<style scoped lang="less">
/* 面板根 */
.cardpanel {
  background: url("~@/assets/images/demo/border.png");
  background-size: 100% 100%;
  // border: 1px solid #f00;
  /* 面板头部 */
  .cardhead {
    height: 0.325rem;
    display: flex;
    /* 垂直居中 */
    align-items: center;
    /* 面板头部图标 */
    .cardheadicon {
      width: 0.225rem;
      height: 0.225rem;
      margin-left: 0.025rem;
    }
    /* 面板头部标题字 */
    .cardheadword {
      font: normal bold 0.175rem "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      color: rgb(255, 255, 255);
      margin-left: 0.125rem;
    }
  }
  /* 面板内容 */
  .cardpanelbody {
    position: relative;
    background: rgba(4, 157, 245, 0.082)
      url("~@/assets/images/demo/borderCommon001.png");
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0.125rem 0.125rem;
    border: 0.0125rem solid rgba(24, 166, 209, 0.164);
    display: flex;
    align-items: center;
  }
  /* 面板内容左上角 */
  .cardpanelbody::before {
    content: "";
    position: absolute;
    width: 0.125rem;
    height: 0.125rem;
    top: -0.025rem;
    left: -0.025rem;
    border-left: 0.025rem solid #02a6b5;
    border-top: 0.025rem solid #02a6b5;
  }
  /* 面板内容右上角 */
  .cardpanelbody::after {
    content: "";
    position: absolute;
    width: 0.125rem;
    height: 0.125rem;
    top: -0.025rem;
    right: -0.025rem;
    border-right: 0.025rem solid #02a6b5;
    border-top: 0.025rem solid #02a6b5;
  }
}
</style>

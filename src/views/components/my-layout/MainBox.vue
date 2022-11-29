<template>
  <div class="mainbox">
    <CardPanel title="冷站系统指标实时占比" :height="300" :width="400">
      <SimplePie slot="cardbodyslot" />
    </CardPanel>
    <CardPanel title="冷站系统指标实时占比" :height="300" :width="400">
      <SimplePie slot="cardbodyslot" />
    </CardPanel>
    <CardPanel title="冷站系统指标实时占比" :height="300" :width="400">
      <SimplePie slot="cardbodyslot" />
    </CardPanel>
  </div>
</template>

<script>
import CardPanel from "@/views/components/my-comps/CardPanel";
import SimplePie from "@/views/components/my-echarts/SimplePie";

export default {
  name: "Mainbox",
  data() {
    return {};
  },
  components: { CardPanel, SimplePie },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mainbox {
  display: flex;
  max-width: 5rem;
  margin: 0 auto;
  height: 13.5rem;
  padding: 0.125rem 0.125rem 0;
  float: left;
  flex-direction: column;
  // background-color: rgba(0, 0, 0, 1);
  // .column {
  //   flex: 5;
  // }
  // .column:nth-child(2) {
  //   flex: 14;
  // }
}
</style>

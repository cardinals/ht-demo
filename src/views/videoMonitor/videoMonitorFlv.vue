<template>
  <div>
    <myFlv ref="myFlv" style="width:800px;height:600px;margin:0 auto;"></myFlv>
  </div>
</template>

<script>
export default {
  name: "videoMonitorFlv",
  data() {
    return {
      chl:'106',
      videoUrl:'10.10.49.230:20080'
    };
  },
  methods: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.$refs.myFlv.src = `ws://${this.videoUrl}/hls/stream_${this.chl}.flv`; //例: `ws://10.10.49.230:20080/hls/stream_106.flv`;
      this.$refs.myFlv.destroyPlayer();
      this.$refs.myFlv.play(this.chl);
    }, 1000);
  },
  computed: {},
};
</script>
<style scoped>
</style>

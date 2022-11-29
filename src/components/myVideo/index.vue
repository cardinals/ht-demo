<template>
  <div>
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @pause="pause()" @play="play()" @ready="playerReadied"> </video-player>
  </div>
</template>

<script>
export default {
  name: "myVideo",
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  watch: {},
  data() {
    return {
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: true,
        // 默认情况下将会消除任何音频。
        muted: true,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        // preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // aspectRatio: "16:9",
        aspectRatio: "17:8",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "application/x-mpegURL",
            //url地址
            src: "",
          },
        ],
        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true,
        },
      },
      ws: "",
      readyState: false,
    };
  },
  methods: {
    //暂停
    pause(chl) {
      this.stopStream(chl);
    },
    //播放
    play(chl) {
      if (this.readyState == true) {
        if (chl) {
          this.playerOptions.sources[0].src = "";
          let actions = { op: "play", channel: chl }; //channel内容表示摄像头列表中的序号
          this.ws.send(JSON.stringify(actions));
        }
      }
    },
    //websocket 拉流
    WebSocketTest() {
      let _this = this;
      if ("WebSocket" in window) {
        if (!_this.ws) {
          _this.ws = new WebSocket(cfg.websoket2);
          _this.ws.onopen = function() {
            if (_this.ws.readyState === 1) {
              _this.readyState = true;
              console.log("已连接111...");
            }
          };
        }
        _this.ws.onmessage = function(evt) {
          let data = JSON.parse(evt.data);
          if (data.error == 0 && data.op == "play") {
            //ws 返回正确之后再引流
            _this.playerOptions.sources[0].src = _this.src;
          } else if (data.error == 1 && data.op == "play") {
            //拉流有误
            _this.playerOptions.sources[0].src = "";
          }
        };
        _this.ws.onclose = function() {
          console.log("连接已关闭...");
        };
      } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
      }
    },
    //结束拉流
    stopStream(chl) {
      if (chl) {
        let actions = { op: "stop", channel: chl }; //channel内容表示摄像头列表中的序号
        this.ws.send(JSON.stringify(actions));
      }
    },
    //关闭websocket
    wsClose() {
      if (this.ws) {
        this.ws.onclose();
      }
    },
    playerReadied(player) {
      player.play();
    },
  },
  created() {
    this.WebSocketTest();
  },
  beforeDestroy() {
    this.wsClose();
  },
  mounted() {},
  computed: {},
};
</script>
<style scoped></style>

<template>
  <div class="video-container" style="width:100%;height:100%;">
    <video :id="uid" width="100%" height="100%" muted name="videoElement" class="centeredVideo" controls autoplay>
      Your browser is too old which doesn't support HTML5 video.
    </video>
  </div>
</template>
<script>
import flvjs from "flv.js";
import { clearInterval } from "timers";
export default {
  name: "myFlv",
  props: {
    // src: {
    //   type: String,
    // },
  },
  data() {
    return {
      src:'',
      timer: null,
      player: null,
      uid: "",
      ws: "",
      readyState: false,
    };
  },
  computed: {},
  methods: {
    play(chl) {
      if (this.readyState == true) {
        if (chl) {
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
            let videoEle = document.getElementById(`${_this.uid}`); //！注意：如果播放直播流（监控视频）必须将参数isLive:true加上，不然会导致短时间内断流会造成视频页面卡顿
            _this.$nextTick(() => {
              _this.player = flvjs.createPlayer(
                {
                  type: "flv",
                  url: _this.src,
                  isLive: true, //直播流
                  hasAudio: false, // 关闭声音
                  cors: true, // 开启跨域访问
                  duration: 0,
                  currentTime: 0,
                },
                {
                  autoCleanupSourceBuffer: true, //对SourceBuffer进行自动清理
                  autoCleanupMaxBackwardDuration: 5, //    当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
                  autoCleanupMinBackwardDuration: 2, //指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
                  enableStashBuffer: false, //关闭IO隐藏缓冲区
                  isLive: true,
                  lazyLoad: false,
                }
              );
              _this.player.attachMediaElement(videoEle);
              _this.player.load();
              _this.player.play();
            });

            //用于视频延时，超过1分钟，就关闭当前流且重新拉流； 每2s循环监听一次
            _this.timer = window.setInterval(() => {
              // console.log("_this.player.currentTime", _this.player.currentTime);
              // ->注意：这里的定时器，在中断视频时，要清理哦
              if (_this.player && _this.player.buffered.length) {
                let end = _this.player.buffered.end(0); //获取当前buffered值
                let diff = end - _this.player.currentTime; //获取buffered与currentTime的差值

                if (diff >= 3) {
                  //   console.log("end", end);
                  //   console.log("this.player.currentTime", this.player.currentTime);
                  //   console.log("diff", diff);
                  //如果差值大于等于60s 手动跳帧 这里可根据自身需求来定
                  //单个视频用
                  _this.player.currentTime = _this.player.buffered.end(0) - 1; //手动跳帧
                }
              }
            }, 1000); //2000毫秒执行一次
          } else if (data.error == 1 && data.op == "play") {
            //拉流有误
            _this.src = "";
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
    destroyPlayer() {
      if (this.player) {
        window.clearInterval(this.timer);
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      }
    },
    wsCloseAndDestroyPlayer() {
      this.destroyPlayer();
      this.wsClose();
    }
  },
  //调用组件
  created() {
    this.uid = this._uid;
    this.WebSocketTest();
  },
  //在销毁生命周期内销毁组件
  destroyed() {},
  mounted() {
    window.addEventListener("beforeunload", e => this.wsCloseAndDestroyPlayer());
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", e => this.wsCloseAndDestroyPlayer());
  }
};
</script>
<style>
</style>

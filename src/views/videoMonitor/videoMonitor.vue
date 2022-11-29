<!--
 * @Descripttion: 
 * @Author: zongjunlian
 * @Date: 2021-06-16 17:25:13
 * @LastEditors: zongjunlian
 * @LastEditTime: 2021-06-17 15:35:47
-->
<template>
  <div>
    <Card style="margin: 0 auto">
      <div class="clearfix">
        <p class="fr">
          <Icon
            custom="iconfont icon-danping-01"
            size="30"
            color="#5787f5"
            class="pointer mr10"
            title="单屏显示"
            @click.native="setLayout(1)"
          />
          <Icon
            custom="iconfont icon-siping-01"
            size="30"
            color="#5787f5"
            class="pointer mr10"
            title="四窗口显示"
            @click.native="setLayout(4)"
          />
          <Icon
            custom="iconfont icon-duochuangkou-01"
            size="30"
            color="#5787f5"
            class="pointer mr10"
            title="多窗口显示"
            @click.native="setLayout(9)"
          />
        </p>
      </div>
      <div>
        <Row :gutter="20" class="clearfix">
          <Col
            :span="pageNum == 1 ? '24' : pageNum == 4 ? '12' : '8'"
            v-for="(item, index) in pageNum"
            :key="index"
            class="mt10"
          >
            <myVideo
              ref="myVideo"
              :src="srcList[index].src"
              style="width: 100%"
            ></myVideo>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "videoMonitor",
  data() {
    return {
      index: -1,
      //收藏夹设备列表
      remarkList: [
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
        {
          videoChannel: 106,
        },
      ],
      pageNum: 4,
      srcList: [
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
      ],
    };
  },
  methods: {
    playVideo(itemChannelNum, videoUrl, index) {
      let srcList = this.srcList.filter((item, index) => {
        return index < this.pageNum;
      });
      let state = srcList.every((item) => {
        return item.src != "";
      });
      if (state == true) {
        this.$refs.myVideo[index].play(itemChannelNum);
        srcList[index].src = videoUrl;
      } else {
        for (let i = 0; i < srcList.length; i++) {
          let item = srcList[i];
          if (item.src == "") {
            this.$refs.myVideo[i].play(itemChannelNum);
            item.src = videoUrl;
            break;
          }
        }
      }
    },
    //自动播放收藏夹中视频
    autoPlay() {
      if (this.remarkList.length > 0) {
        if (this.remarkList.length < this.pageNum) {
          this.remarkList.forEach((item) => {
            let itemChannelNum = item.videoChannel;
            let videoUrl =
              `http://` +
              cfg.videoUrl +
              `/hls/stream_` +
              itemChannelNum +
              `/hls.m3u8`;
            this.playVideo(itemChannelNum, videoUrl);
          });
          this.index = this.remarkList.length - 1;
        } else {
          for (let i = 0; i < this.pageNum; i++) {
            let item = this.remarkList[i];
            let itemChannelNum = item.videoChannel;
            let videoUrl =
              `http://` +
              cfg.videoUrl +
              `/hls/stream_` +
              itemChannelNum +
              `/hls.m3u8`;
            this.playVideo(itemChannelNum, videoUrl);
          }
          this.index = this.pageNum - 1;
        }
      }
    },
    //窗格设置
    setLayout(num) {
      this.pageNum = num;
      this.srcList.forEach((item, index) => {
        let videoUrl = "";
        item.src = videoUrl;
        if (this.$refs.myVideo[index]) {
          this.$refs.myVideo[index].playerOptions.sources[0].src = "";
        }
      });
      // setTimeout(() => {
      //   this.autoPlay();
      // }, 200);
    },
  },
  created() {},
  mounted() {
    // setTimeout(() => {
    //   this.autoPlay();
    // }, 1000);
  },
  computed: {},
};
</script>
<style scoped></style>

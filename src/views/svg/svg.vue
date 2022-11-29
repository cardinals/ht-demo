<!--
 * @Descripttion: 
 * @Author: zongjunlian
 * @Date: 2021-06-16 17:25:13
 * @LastEditors: gaoxiaoying
 * @LastEditTime: 2021-06-28 15:12:39
-->
<template>
  <div>
    <Card class="home relative" style="margin:0 auto;">
      <Button type="primary" @click="toPoint()" style="position:absolute;top:10px;right:20px;z-index:2">定位到报警设备</Button>
      <Tabs @on-click="tabsClick">
        <TabPane :label="item.name" :name="item.name" v-for="item in tabLis">
          <mySvg refs="mySvg" :url="item.svgUrl" :optBtn="true" :svgPosObj="svgPosObj" :isToPoint="isToPoint" :pointPos="pointPos" @click="clickSvg" @saveVision="saveVision"></mySvg>
        </TabPane>
      </Tabs>
    </Card>
    <!-- 设备弹窗 -->
    <Modal v-model="modal" title="设备信息" width="520" footer-hide draggable :styles="{ top: '200px' }">
      <h4>{{ "门体CLK-Door03" }}</h4>
      <div>
        <Row :gutter="5" class="mt20" v-for="item in parameters" :key="item.id">
          <Col span="8 mt5">{{ item.name }}</Col>
          <Col span="16">
            <Input :value="item.valueName" readonly style="width: 300px" class="mr10" />
            <Tag color="success" class="stateTag"></Tag>
          </Col>
        </Row>
      </div>
    </Modal>
    <!-- 报警-处置 -->
    <Modal v-model="modal1" title="处置" width="520" draggable :styles="{ top: '200px' }">
      <Row>
        <Col span="4">备注信息:</Col>
        <Col span="18">
          <Input v-model="description" type="textarea" :rows="3" maxlength="500" show-word-limit style="width:100%;" />
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import map1 from "../../../public/svg/liujiayuanzi-zhantai.svg";
import map2 from "../../../public/svg/fuxingzhan-zhanting.svg";
import { floatReg } from "@/utils/util.js";
import $ from "jquery";
export default {
  name: "videoMonitorManagement",
  data() {
    return {
      description: "",
      modal1: false,
      modal: false,
      parameters: [
        {
          name: "ACS门体开门状态",
          valueName: "开门状态",
        },
        {
          name: "ACS门体强行开门状态",
          valueName: "NA",
        },
        {
          name: "ACS门体常开状态",
          valueName: "NA",
        },
      ],
      isToPoint: false,
      svgUrl: map2,
      tabLis: [
        {
          name: "站厅",
          svgUrl: map2,
          svgPosition: "translate(-4248.748360822612,-3767.404953938889) scale(6.062866266041596)",
        },
        {
          name: "站台",
          svgUrl: map1,
          svgPosition: "translate(0,0) scale(1)",
        },
      ],
      svgPosObj: {
        viewScale: 1,
        viewX: 0,
        viewY: 0,
      },
      pointPos: {
        scale: 1,
        left: 0,
        top: 0,
      },
    };
  },
  methods: {
    toPoint() {
      this.isToPoint = true;
      let po = [];
      po = floatReg($(`#FXZ-Door29C2`).attr("d"));
      this.pointPos = {
        left: po[0] - 0,
        top: po[1] - 0,
        scale: 6,
      };
    },
    tabsClick(val) {
      let item = this.tabLis.filter((item) => {
        return item.name == val;
      });
      let arr = floatReg(item[0].svgPosition);
      setTimeout(() => {
        this.svgPosObj = {
          viewScale: arr[2],
          viewX: arr[0],
          viewY: arr[1],
        };
      }, 500);
    },
    //保存视角
    saveVision(position) {
      //保存接口
      // api
      //   .saveSvgLocation({
      //     id: this.areaId,
      //     name: this.areaName,
      //     svgLocation: position == undefined ? "translate(0,0) scale(1)" : position,
      //   })
      //   .then((res) => {
      //     this.$Message.success("定位成功");
      //     this.stationArea1();
      //   });
    },
    clickSvg(e) {
      if (e.currentTarget.id == "FXZ-Door29") {
        this.modal1 = true;
      } else {
        this.modal = true;
      }
    },
  },
  created() {
    this.tabsClick(this.tabLis[0].name);
  },
  mounted() {
    setTimeout(() => {
      $("#FXZ-Door29C1")
        .removeClass()
        .addClass("cRed");
    }, 1000);
  },
  computed: {},
  beforeDestroy() {},
};
</script>
<style scoped>
.home {
  width: 1300px;
}
</style>
<style>
.stateTag {
  height: 28px;
  padding: 0 6px;
  border: 0;
  border-color: rgb(255, 255, 255) !important;
}
#device > g {
  cursor: pointer;
}
.cRed {
  fill: red;
}
</style>

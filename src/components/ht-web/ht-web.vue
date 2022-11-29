<!--
 * @Description:
 * @Author: yangliangxi
 * @Date: 2022-03-08 14:28:00
 * @LastEditors: yangliangxi
 * @LastEditTime: 2022-03-11 19:28:00
 * @FilePath: /TechAdmin/src/components/ht-web/ht-web.vue
-->
<template>
  <div class="absolute w-full h-full">
    <slot></slot>
    <div ref="htview" class="ht-view"></div>
  </div>
</template>

<script>
// import htweb from "./ht-web";
import {
  CameraAnimator,
  PathAnimator,
  TransformAnimator,
  Shape3dOpacityAnimator,
  ScaleAnimator,
} from "./us/animator";
import { FlowEffect } from "./us/effect";
import { NodeAxis, Common3D } from "./us/common";
import { mapMutations, mapState } from "vuex";

export default {
  name: "HtWeb",
  data() {
    return {
      dm: null,
      g3d: null,
      view3: null,
      cameraAnimator: null,
      common3D: null,
      flowEffect: null,
      pathAnimator: null,
      transformAnimator: null,
      shape3dOpacityAnimator: null,
      scaleAnimator: null,
      walkCamera: null,
      uiHeight: 0,
      //注册按钮关联的回调 ：btName-按钮名称 ，funcName-回调函数名称
      btCallbackArr: [
        { btName: "空调监控", funcName: "monitorAirConditioner" },
        { btName: "电梯监控", funcName: "monitorLift" },
        { btName: "车场监控", funcName: "monitorPark" },
        { btName: "1#楼监控", funcName: "monitorBuildStruct" },
        { btName: "空调机房", funcName: "viewAirConditioner" },
        { btName: "广场漫游", funcName: "viewWalkscene" },
        { btName: "室内行走", funcName: "viewIndoorWalk" },
        { btName: "广场定位", funcName: "viewLandscaping" },
        { btName: "主楼展示", funcName: "showBuildEffect" },
      ],
      //标签和坐标集合
      tag2p3Map: new Map(),
      //模型+Y-Y数据
      tag2YMap: new Map([
        ["lift1", 90],
        ["lift2", -90],
      ]),
    };
  },
  props: {
    vHeight: {
      type: Number,
      default: 1080,
    },
    hWidth: {
      type: Number,
      default: 1920,
    },
    monitorInfo: {
      type: Array,
    },
    monitorParkInfo: {
      type: Array,
      default: function () {
        return [
          { mValue: 0 },
          { mValue: 0 },
          { mValue: 0 },
          { mValue: 0 },
          { mValue: 0 },
          { mValue: 0 },
        ];
      },
    },
    mainbuildInfo: {
      type: Array,
      default: function () {
        return [
          { temperature: " 55°C", humidity: "45%", co2concentration: "444ppm" },
          { temperature: " 55°C", humidity: "45%", co2concentration: "444ppm" },
          { temperature: " 55°C", humidity: "45%", co2concentration: "444ppm" },
        ];
      },
    },
  },
  watch: {
    vHeight(value) {
      this.uiHeight = value;
    },
    hWidth(value) {
      this.uiWidth = value;
    },
    monitorInfo: {
      deep: true,
      handler: function (val, oldVal) {
        this.airConditionerjkdInfo.eachChild(function (child) {
          let info = val.find((info) => info.tag === child.getTag());
          if (!!info) {
            child.a("name", info.equipmentName);
            child.a("num", info.equipmentId);
            child.a("faultNum", info.breakdownNum);
            child.a("dept", info.maintainPart);
          }
        });
      },
    },
    monitorParkInfo: {
      deep: true,
      handler: function (val, oldVal) {
        if (!val) return;
        for (let index = 0; index < val.length; index++) {
          const element = val[index];
          if (Number(element.mValue) === 1) {
            this.common3D.style3dBlendColor(
              this.b1parkjk.getChildAt(index),
              "#9ccc65"
            );
            // this.common3D.style3dBrightness(this.b1parkjk.getChildAt(index), 3);
          } else if (Number(element.mValue) === 0) {
            this.common3D.style3dBlendColor(
              this.b1parkjk.getChildAt(index),
              "#f1f8e9"
            );
            // this.common3D.style3dBrightness(this.b1parkjk.getChildAt(index), 1);
          }
        }
      },
    },
    mainbuildInfo: {
      deep: true,
      handler: function (val, oldVal) {
        if (!val) return;
        for (let index = 0; index < val.length; index++) {
          const info = val[index];
          let node = this.mainBuildInfo.getChildAt(index);
          node.a("temp", info.temperature);
          node.a("humidity", info.humidity);
          node.a("carbon", info.co2concentration);
        }
      },
    },
  },
  computed: {
    // ...mapMutations("airConditionerMonitor", {}),
    ...mapState("airConditionerMonitor", [
      "bluepipleStart",
      "yellowpipleStart",
    ]),
  },
  methods: {
    //1.统一调度所有交互事件
    dispatchFunction(btName) {
      const found = this.btCallbackArr.find(
        (element) => element.btName === btName
      );
      if (!!found) {
        this.beforeCallback(this);
        this.$options.methods[found.funcName](this);
      } else {
        alert(`未找到与${btName}匹配的btcallback对象！`);
      }
    },
    //2.统一回调前处理
    beforeCallback(_this) {
      if (_this.va) {
        clearInterval(_this.va);
      }
      if (_this.showEffectInterval) {
        clearInterval(_this.showEffectInterval);
      }
      if (_this.autoplay) {
        clearTimeout(_this.autoplay);
      }
      if (_this.tempEffect) {
        clearInterval(_this.tempEffect);
      }
      if (_this.mbInfoInterval) {
        clearInterval(_this.mbInfoInterval);
      }
      _this.common3D.style3dvisble(_this.lift1Info, true);
      _this.common3D.style3dvisble(_this.lift2Info, true);
      _this.common3D.style3dvisble(_this.mainBuild1, true);
      _this.common3D.style3dvisble(_this.mainBuild2, true);
      _this.common3D.style3dvisble(_this.mainBuild1Struct, false);
      _this.common3D.style3dvisble(_this.mainBuild2Struct, true);
      _this.common3D.style3dvisble(_this.airConditionerHouse, true);
      _this.common3D.style3dvisble(_this.mainBuildInfo, false);
      _this.mainBuildInfo.eachChild(function (node) {
        _this.common3D.style3dvisble(node, false);
      });
      _this.common3D.style3dTransparent(_this.mainBuild1, false);
      _this.common3D.style3dTransparent(_this.mainBuild2, false);

      _this.pathAnimator.overCamFollowPath(_this.walkCamera);
    },
    //3.回调：监控中央空调
    monitorAirConditioner(_this) {
      //data
      let cameraAirConditionerMonitorConfig = {
        from: [49, 69, -256],
        target: _this.airConditionerEquip.p3(),
      };
      const bluepipleConfig = {
        objTag: "bluepiple",
        speed: 500,
        offeset: 0.25,
        dir: NodeAxis.X,
        start: _this.bluepipleStart,
      };
      const yellowpipleConfig = {
        objTag: "yellowpiple",
        speed: 500,
        offeset: 0.25,
        dir: NodeAxis.X,
        start: _this.yellowpipleStart,
      };
      //function
      const playfaneffect = function () {
        if (!bluepipleConfig.start) {
          _this.flowEffect.flowLight(_this.dm, bluepipleConfig);
          _this.$store.commit("airConditionerMonitor/mutateBlueState", true);
        }
        if (!yellowpipleConfig.start) {
          _this.flowEffect.flowLight(_this.dm, yellowpipleConfig);
          _this.$store.commit("airConditionerMonitor/mutateYellowState", true);
        }
      };
      const executeTask = function () {
        _this.common3D.style3dvisble(_this.mainBuild1, false);
        _this.common3D.style3dvisble(_this.mainBuild1Struct, false);
        _this.common3D.style3dvisble(_this.airConditionerjkd, true);
        _this.common3D.style3dvisble(_this.airConditionerjkdInfo, true);
        _this.airConditionerjkd.eachChild((child) => {
          _this.common3D.style3dvisble(child, true);
        });
        _this.airConditionerjkdInfo.eachChild((child) => {
          _this.common3D.style3dvisble(child, false);
        });
        playfaneffect();
      };
      //operation
      if (
        _this.common3D.posVerify(
          _this.g3d.getEye(),
          _this.airConditionerEquip.p3()
        )
      ) {
        console.info("相机已经指向中央空调室所在位置！！");
        executeTask();
      } else {
        _this.flyto({
          cameraConfig: cameraAirConditionerMonitorConfig,
          time: 1000,
          node: _this.airConditionerEquip,
          distance: 20,
          direction: [0, 1, -1],
          executeTask,
          ratio: 0.5,
        });
      }
    },
    //3.回调：看中央空调
    viewAirConditioner(_this) {
      //data
      let cameraAirConditionerConfig = {
        from: [36.4, 83.2, -271],
        target: _this.airConditionerHouse.p3(),
      };
      const bluepipleConfig = {
        objTag: "bluepiple",
        speed: 500,
        offeset: 0.25,
        dir: NodeAxis.X,
        start: _this.bluepipleStart,
      };
      const yellowpipleConfig = {
        objTag: "yellowpiple",
        speed: 500,
        offeset: 0.25,
        dir: NodeAxis.X,
        start: _this.yellowpipleStart,
      };
      //function
      const playfaneffect = function () {
        if (!bluepipleConfig.start) {
          _this.flowEffect.flowLight(_this.dm, bluepipleConfig);
          _this.$store.commit("airConditionerMonitor/mutateBlueState", true);
        }
        if (!yellowpipleConfig.start) {
          _this.flowEffect.flowLight(_this.dm, yellowpipleConfig);
          _this.$store.commit("airConditionerMonitor/mutateYellowState", true);
        }
      };
      const executeTask = function () {
        _this.common3D.style3dvisble(_this.mainBuild1, false);
        _this.common3D.style3dvisble(_this.mainBuild1Struct, false);
        _this.airConditionerjkd.eachChild((child) => {
          _this.common3D.style3dvisble(child, false);
        });
        _this.airConditionerjkdInfo.eachChild((child) => {
          _this.common3D.style3dvisble(child, false);
        });
        playfaneffect();
      };
      //operation
      if (
        _this.common3D.posVerify(
          _this.g3d.getEye(),
          _this.airConditionerHouse.p3()
        )
      ) {
        console.info("相机已经指向中央空调室所在位置！！");
        executeTask();
      } else {
        _this.flyto({
          cameraConfig: cameraAirConditionerConfig,
          time: 1000,
          node: _this.airConditionerHouse,
          distance: 25,
          direction: [0, 1, -1],
          executeTask,
          ratio: 0.8,
        });
      }
    },
    //3.回调：监控停车场
    monitorPark(_this) {
      //data
      let cameraParkConfig = {
        from: [-48, -19, -352],
        target: _this.park.p3(),
      };
      const carTags = [
        { name: "redcar", pathName: "redcarpath" },
        { name: "bluecar", pathName: "bluecarpath" },
      ];
      //function
      const executeTask = function () {
        // let index = _this.common3D.randomInt(0, 2);
        // let cur = carTags[index];
        for (let index = 0; index < carTags.length; index++) {
          const cur = carTags[index];
          _this.pathAnimator.followPath(
            _this.dm,
            _this.g3d,
            cur.pathName,
            cur.name
          );
        }
      };
      //operation
      if (_this.common3D.posVerify(_this.g3d.getEye(), _this.park.p3())) {
        console.info("相机已经指向停车场所在位置！！");
        executeTask();
      } else {
        _this.flyto({
          cameraConfig: cameraParkConfig,
          time: 1000,
          node: _this.park,
          distance: 90,
          direction: [0, 1, -1],
          executeTask,
          ratio: 0.8,
        });
      }
    },
    //3.回调：监控电梯
    monitorLift(_this) {
      //data
      let liftCameraConfig = {
        from: [49, 60, -358],
        target: _this.mainBuild2.p3(),
      };
      //function
      const playAnimation = function () {
        _this.lift1.p3(_this.tag2p3Map.get("lift1"));
        _this.lift2.p3(_this.tag2p3Map.get("lift2"));
        _this.common3D.style3dvisble(_this.mainBuild2, true);
        _this.shape3dOpacityAnimator.opacityGradual(
          _this.dm,
          _this.mainBuild2,
          1,
          0.25,
          1000,
          null,
          false
        );
        _this.transformAnimator.translate(
          _this.dm,
          _this.lift1,
          _this.tag2YMap.get("lift1"),
          50000,
          NodeAxis.Y,
          null,
          false
        );
        _this.transformAnimator.translate(
          _this.dm,
          _this.lift2,
          _this.tag2YMap.get("lift2"),
          50000,
          NodeAxis.Y,
          null,
          false
        );
      };
      const flash = function () {
        _this.flowEffect.flash(_this.lift1, "yellow", "red", 200);
        _this.flowEffect.flash(_this.lift2, "yellow", "red", 200);
      };
      const infoActive = function () {
        _this.common3D.style3dvisble(_this.lift1Info, true);
        _this.common3D.style3dvisble(_this.lift2Info, true);
        //模拟数据===========================
        // let floormin = 1,
        //   floormax = 14;
        // _this.lift1Info.a("displaynum", floormin);
        // _this.lift2Info.a("displaynum", floormax);
        // _this.va = setInterval(() => {
        //   if (floormax > 0) {
        //     floormax--;
        //   }
        //   if (floormin < 15) {
        //     floormin++;
        //   }
        //   if (floormin == 14) {
        //     clearInterval(_this.va);
        //   }
        //   //==================================
        //   _this.lift1Info.a("displaynum", floormin);
        //   _this.lift2Info.a("displaynum", floormax);
        // }, 3500);
      };
      const executeTask = function () {
        infoActive();
        playAnimation();
        flash();
      };
      //operation
      if (_this.common3D.posVerify(_this.g3d.getEye(), _this.mainBuild2.p3())) {
        console.info("相机已经指向电梯楼所在位置！！");
        executeTask();
      } else {
        _this.flyto({
          cameraConfig: liftCameraConfig,
          time: 1000,
          node: _this.mainBuild2,
          distance: 200,
          direction: [0, 0, -1],
          executeTask,
          ratio: 0.8,
        });
      }
    },
    //3.回调：楼层监控
    monitorBuildStruct(_this) {
      const executeTask = function () {
        _this.mainBuildInfo.eachChild(function (node) {
          _this.common3D.style3dP3ByX(node, 31);
        });
        _this.common3D.style3dvisble(_this.mainBuild1, true);
        _this.common3D.style3dvisble(_this.mainBuild1Struct, false);
        _this.common3D.style3dvisble(_this.airConditionerHouse, false);
        _this.common3D.style3dvisble(_this.mainBuildInfo, true);
        _this.common3D.style3dTall(_this.mainBuild1Struct, 1);
        let index = 0;
        _this.mbInfoInterval = setInterval(function () {
          let node = _this.mainBuildInfo.getChildAt(index);
          _this.common3D.style3dvisble(node, true);
          _this.transformAnimator.translate(
            _this.dm,
            node,
            -31,
            500,
            NodeAxis.X,
            null,
            false
          );
          index++;
          if (index === _this.mainBuildInfo.size()) {
            index = 0;
            if (_this.mbInfoInterval) {
              clearInterval(_this.mbInfoInterval);
            }
          }
        }, 500);
      };
      //operation
      if (
        _this.common3D.posVerify(_this.g3d.getEye(), _this.mainbuildInfoEye)
      ) {
        console.info("相机已经指向主建筑监控信息所在位置！！");
        executeTask();
      } else {
        _this.cameraAnimator.cameraFromTo(
          _this.g3d,
          {
            from: _this.mainbuildInfoEye,
            target: _this.mainbuildInfoTarget,
          },
          1000,
          executeTask,
          false
        );
      }
    },
    //3.回调：场景漫游
    viewWalkscene(_this) {
      _this.walkCamera = _this.pathAnimator.camfollowPath(
        _this.dm,
        _this.g3d,
        "fly",
        { from: _this.eyeFrom, target: _this.eyeTarget, offset: 10, step: 0.05 }
      );
    },
    //3.回调 ：室内行走
    viewIndoorWalk(_this) {
      // _this.g3d.setFovy(Math.PI/6)
      _this.g3d.setFar(100000);
      _this.g3d.setNear(1);
      _this.walkCamera = _this.pathAnimator.camfollowPath(
        _this.dm,
        _this.g3d,
        "indoor",
        {
          from: _this.eyeFrom,
          target: _this.eyeTarget,
          offset: 10,
          step: 0.005,
        }
      );
    },
    //3 回调:广场定位
    viewLandscaping(_this) {
      _this.initView();
    },
    //3 回调:楼层动画
    showBuildEffect(_this) {
      //data
      let showBuildCameraConfig = {
        from: [26.4, 69.4, -483.7],
        target: _this.mainBuild1Show.p3(),
      };

      //function
      const brightness = function () {
        const count = _this.mainBuild1Struct.size();
        let index = 0;
        let interval = 30;
        let scaleX = 0;
        _this.tempEffect = setInterval(() => {
          let node = _this.mainBuild1Struct.getChildAt(index);
          _this.common3D.style3dOpacity(node, 0.25);
          _this.common3D.style3dEvenmap(node, 1);
          _this.common3D.style3dBloom(node, true);
          _this.common3D.style3dWireFrame(node, "#ffccbc", true);
          _this.common3D.style3dBrightness(node, 3);
          _this.common3D.style3dBlendColor(node, "#fff9c4");
          index++;
          if (index === count) {
            if (_this.tempEffect) {
              clearInterval(_this.tempEffect);
            }
          }
          scaleX += 1 / count;
          _this.common3D.style3dScale(_this.cjb, scaleX, scaleX, scaleX);
          _this.common3D.style3dBrightness(_this.cjb, scaleX * 15);
          if (scaleX >= 1) {
            _this.common3D.style3dScale(_this.cjb, 0, 0, 0);
          }
        }, interval);
      };
      const showEffect = function () {
        const count = _this.mainBuild1Struct.size();
        let index = 0;
        let change = false;
        let loops = 0;
        let interval = 30;
        const cls = ["#fff9c4", "#40c4ff", "#18ffff", "#2962ff"];
        let prevNode = _this.mainBuild1Struct.getChildAt(0);
        _this.showEffectInterval = setInterval(() => {
          _this.common3D.style3dOpacity(prevNode, 0.15);
          _this.common3D.style3dEvenmap(prevNode, 0.15);
          _this.common3D.style3dBrightness(prevNode, 1);

          let node = _this.mainBuild1Struct.getChildAt(index);
          _this.common3D.style3dOpacity(node, 0.5);
          _this.common3D.style3dEvenmap(node, 1);
          _this.common3D.style3dBloom(node, true);
          _this.common3D.style3dWireFrame(node, cls[loops], true);
          _this.common3D.style3dBrightness(node, 5);

          if (!change) index++;
          else index--;
          prevNode = node;

          if (index === count) {
            index = count - 1;
            change = !change;
            loops++;
            if (loops === 2) {
              if (_this.showEffectInterval) {
                clearInterval(_this.showEffectInterval);
              }
              if (_this.autoplay) {
                clearTimeout(_this.autoplay);
              }
              _this.cameraAnimator.cameraFromTo(
                _this.g3d,
                {
                  from: _this.showFrom,
                  target: _this.showTarget,
                },
                3000,
                brightness,
                false
              );
            }
          }
          if (index < 0) {
            index = 0;
            change = !change;
          }
        }, interval);
      };
      const executeTask = function () {
        _this.common3D.style3dvisble(_this.mainBuild1, true);
        _this.common3D.style3dvisble(_this.mainBuild1Struct, true);
        _this.common3D.style3dvisble(_this.airConditionerHouse, false);
        _this.common3D.style3dTall(_this.mainBuild1Struct, 1);
        _this.shape3dOpacityAnimator.opacityGradual(
          _this.dm,
          _this.mainBuild1,
          1,
          0.25,
          500,
          function () {
            _this.common3D.style3dvisble(_this.mainBuild1Struct, true);
            _this.scaleAnimator.scale(
              _this.dm,
              _this.mainBuild1Struct,
              0,
              1,
              1500,
              NodeAxis.Y,
              showEffect,
              false
            );
          },
          false
        );
      };
      const atuoLoopPlay = function () {
        brightness();
        _this.autoplay = setTimeout(function () {
          _this.shape3dOpacityAnimator.opacityGradual(
            _this.dm,
            _this.mainBuild1,
            0.25,
            1,
            1500,
            reset,
            false
          );
        }, 3000);
      };
      const reset = function () {
        _this.mainBuild1Struct.eachChild(function (node) {
          _this.common3D.style3dOpacity(node, 0.15);
          _this.common3D.style3dEvenmap(node, 0.15);
          _this.common3D.style3dWireFrame(node, "#bbdefb", false);
          _this.common3D.style3dBrightness(node, 1);
          _this.common3D.style3dBlendColor(node, "#29b6f6");
        });
        _this.flyto({
          cameraConfig: showBuildCameraConfig,
          time: 1500,
          node: _this.mainBuild1Show,
          distance: 220,
          direction: [0, 0.1, -1],
          executeTask,
          ratio: 0.6,
        });
      };
      //operation
      if (
        _this.common3D.posVerify(_this.g3d.getEye(), _this.mainBuild1Show.p3())
      ) {
        console.info("相机已经指向主建筑所在位置！！");
        executeTask();
      } else {
        _this.flyto({
          cameraConfig: showBuildCameraConfig,
          time: 1000,
          node: _this.mainBuild1Show,
          distance: 220,
          direction: [0, 0.1, -1],
          executeTask,
          ratio: 0.6,
        });
      }
    },
    flyto(option) {
      this.cameraAnimator.cameraFromTo(
        this.g3d,
        option.cameraConfig,
        option.time,
        function (target) {
          console.info(`相机指向的坐标位置是：${target}！`);
          this.g3d.flyTo(option.node, {
            animation: false,
            distance: option.distance,
            direction: option.direction,
            ratio: option.ratio,
          });
          option.executeTask();
        }.bind(this)
      );
    },
    moveTo(option) {
      this.cameraAnimator.cameraFromTo(
        this.g3d,
        option.cameraConfig,
        option.time,
        function (target) {
          console.info(`相机指向的坐标位置是：${target}！`);
          this.g3d.flyTo(option.node, {
            animation: false,
            distance: option.distance,
            direction: option.direction,
            ratio: option.ratio,
          });
          option.executeTask();
        }.bind(this)
      );
    },
    airConditionerInfo(data) {
      if (!!data) {
        let p = data.getParent();
        if (!!p) {
          let node = null;
          if (p.getTag() === "airConditionerjkd") {
            node = this.airConditionerjkdInfo;
          } else if (p.getTag() === "airConditionerjkdInfo") {
            node = this.airConditionerjkd;
          }
          //console.info(data, node);
          if (node.size() > 0) {
            node.eachChild(
              function (child) {
                if (child.getTag() === data.getTag()) {
                  this.common3D.style3dvisble(child, true);
                  this.common3D.style3dvisble(data, false);
                }
              }.bind(this)
            );
          }
        }
      }
    },
    initView() {
      this.cameraAnimator.cameraFromTo(
        this.g3d,
        {
          from: this.eyeFrom,
          target: this.eyeTarget,
        },
        1000,
        null
      );
    },
  },
  created() {
    this.common3D = new Common3D();
    this.cameraAnimator = new CameraAnimator();
    this.flowEffect = new FlowEffect();
    this.pathAnimator = new PathAnimator();
    this.transformAnimator = new TransformAnimator();
    this.shape3dOpacityAnimator = new Shape3dOpacityAnimator();
    this.scaleAnimator = new ScaleAnimator();
  },
  mounted() {
    //console.info(this);
    //事件总线
    this.$bus.$on(
      "btEvent",
      function (param) {
        console.info(`图扑3d收到总部bt的呼叫：${param}`);
        this.dispatchFunction(param);
      }.bind(this)
    );
    //初始化g3d view
    this.common3D.loadScene(
      cfg.htwebUrl[0],
      function (dm, g3d, view3) {
        this.g3d = g3d;
        this.g3d.addToDOM(this.$refs.htview);
        this.g3d.setHeight(this.uiHeight);
        this.g3d.setWidth(this.uiWidth);
        this.view3 = view3;
        this.dm = dm;
        this.g3d.enablePostProcessing("Bloom", true);
        this.g3d.setPostProcessingValue("Bloom", "selective", true);

        const mainDatasKey = [
          "lift1",
          "lift2",
          "lift1Info",
          "lift2Info",
          "mainBuild1",
          "mainBuild2",
          "mainBuildInfo",
          "mbInfo1",
          "mbInfo2",
          "mbInfo3",
          "mainBuild1Show",
          "mainBuild1ShowTarget",
          "mainBuild1Struct",
          "mainBuild2Struct",
          "park",
          "cjb",
          "b1parkjk",
          "diantiguidao",
          "airConditionerHouse",
          "airConditionerEquip",
          "airConditionerjkd",
          "airConditionerjkdInfo",
        ];
        this.dm.each(
          function (data) {
            let tag = data.getTag();
            if (mainDatasKey.includes(tag)) {
              this[tag] = data;
              this.tag2p3Map.set(tag, data.p3());
            }
          }.bind(this)
        );
        this.eyeFrom = [188, 142, -522];
        this.showFrom = [178, 228.4, -368.2];
        this.showTarget = [50, 45.7, -245.5];
        this.eyeTarget = [-43.6, -33, -101];
        this.mainbuildInfoEye = [-84.8, 95.2, -449];
        this.mainbuildInfoTarget = [92.1, 18.2, -161.6];
        this.common3D.style3dBrightness(this.lift1, 5);
        this.common3D.style3dBrightness(this.lift2, 5);
        this.common3D.styleBrightnessHighlightTransparency(
          this.b1parkjk,
          1.5,
          0.5,
          1,
          "#3498db"
        );
        this.common3D.styleBrightnessHighlightTransparency(
          this.airConditionerjkdInfo,
          1,
          0.5,
          1,
          "#3498db"
        );
        this.common3D.styleBrightnessHighlightTransparency(
          this.airConditionerjkd,
          2,
          1,
          1,
          "#3498db"
        );
        this.common3D.styleBrightnessHighlightTransparency(
          this.diantiguidao,
          2,
          0.15,
          0.25,
          "#3498db"
        );
        this.common3D.styleBrightnessHighlightTransparency(
          this.mainBuild1Struct,
          1,
          0.15,
          0.15,
          "#3498db"
        );
        this.common3D.styleBrightnessHighlightTransparency(
          this.mainBuild2Struct,
          1,
          0.15,
          0.15,
          "#3498db"
        );
        this.flowEffect.flowLight(this.dm, {
          objTag: "flowlight1",
          speed: 50,
          offeset: 0.25,
          dir: NodeAxis.X,
          start: false,
        });
        this.flowEffect.flowLight(this.dm, {
          objTag: "flowlight2",
          speed: 100,
          offeset: 0.25,
          dir: NodeAxis.X,
          start: false,
        });
        this.g3d.addInteractorListener(
          function (e) {
            // console.info(e.kind);
            if (e.kind === "onScroll") {
              // this.common3D.vecDistance()
            } else if (e.kind === "clickData") {
              this.airConditionerInfo(e.data);
              //console.info(e.data)
            }
          }.bind(this)
        );
        this.initView();
        // setInterval(() => {
        //   console.info(this.g3d.getEye(), "eye");
        //   console.info(this.g3d.getCenter(), "target");
        // }, 1000);
      }.bind(this)
    );
  },
};
</script>

<style lang="less" scoped>
.ht-view {
  position: absolute;
  // width: 24rem;
  // height: 13.5rem;
  top: 0;
  z-index: 5001;
}
</style>

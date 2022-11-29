<!--
 * @Descripttion: 
 * @Author: zongjunlian
 * @Date: 2021-06-16 17:32:32
 * @LastEditors: zongjunlian
 * @LastEditTime: 2021-06-18 14:17:42
-->
  <template>
  <div class="relative">
    <div :id="`id${_uid}`" style="width: 100%;height: 100%;"></div>
    <div v-if="optBtn">
      <!-- 保存视角 -->
      <Button @click="saveVision()" class="saveVision">定位</Button>
      <!-- 定位到保存的视角 -->
      <Button @click="resetVision()" class="resetVision">重置</Button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import * as d3 from "d3";
import { floatReg } from "@/utils/util.js";
import imageUrl from "@/assets/images/toolTip1.svg";
export default {
  name: "mySvg",
  props: {
    //svg url
    url: {
      type: String,
      required: true,
    },
    //是否显示操作按钮(定位,重置)
    optBtn: {
      type: Boolean,
      default: false,
    },
    //svg位置信息(用于定位,重置)
    svgPosObj: {
      type: Object,
      default: function() {
        return { viewX: 0, viewY: 0, viewScale: 1 };
      },
    },
    //是否有自动定位到报警设备位置的功能
    isToPoint: {
      type: Boolean,
      default: false,
    },
    //svg位置信息(用于定位到报警设备位置)
    pointPos: {
      type: Object,
      default: function() {
        return { left: 0, top: 0, scale: 1 };
      },
    },
  },
  data() {
    return {
      g: null,
      zoom: null,
      svg: null,
      imageUrl: imageUrl,
    };
  },
  methods: {
    //报警点位
    toAlarmPoint() {
      if (this.isToPoint) {
        let viewbox = $(`#id${this._uid}`)
          .find("svg")
          .attr("viewBox");
        let width = viewbox ? viewbox.split(" ").slice(-2)[0] : 0; //倒数二位 slice() 方法 返回数组
        let height = viewbox ? viewbox.split(" ").slice(-1)[0] : 0;
        // console.log("viewbox, width,height", viewbox, width, height);

        if (this.svg) {
          this.svg
            .transition()
            .duration(1000)
            .call(
              this.zoom.transform,
              d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(this.pointPos.scale)
                .translate(-this.pointPos.left, -this.pointPos.top)
            );
        }
      }
    },
    //定位 保存视角
    saveVision() {
      let position = $(`#id${this._uid} svg>g`).attr("transform");
      this.$emit("saveVision", position);
    },
    //重置 定位到保存的视角
    resetVision() {
      if (this.svg) {
        this.svg
          .transition()
          .duration(1000)
          .call(this.zoom.transform, d3.zoomIdentity.scale(this.svgPosObj.viewScale).translate(this.svgPosObj.viewX / this.svgPosObj.viewScale, this.svgPosObj.viewY / this.svgPosObj.viewScale));
      }
    },
    callback(obj) {
      if (this.url && this.url.length) {
        let _this = this;
        //页面渲染
        $(`#id${this._uid}`).html(obj.node);

        this.svg = d3.select(`#id${this._uid} svg`);
        this.g = d3.select(`#id${this._uid} svg>g`);

        //缩放
        this.zoom = d3.zoom().on("zoom", this.zoomed);
        this.svg.call(this.zoom);
        //点击事件
        $(`#id${this._uid} #device>g`).click(this.click);

        //hover 提示信息tooltip
        let toolBox = Snap(`#id${this._uid} svg>g`).paper.image(`${this.imageUrl}`, 0, 0, 36, 10);
        let toolTxt = Snap(`#id${this._uid} svg>g`)
          .paper.text(0, 0, "")
          .attr({
            fill: "#fff", // 红色
          });
        var g0 = Snap(`#id${this._uid} svg>g`).group(toolBox, toolTxt);
        g0.attr({ id: "myg" });
        Snap(`#id${this._uid} svg>g`).append(g0);
        $(`#id${this._uid} svg #myg`).hide();

        $(`#id${this._uid} svg #device>g`).hover(
          function(e) {
            _this.mouseover(e);
          },
          function(e) {
            _this.mouseout(e);
          }
        );
      }
    },
    // 移入
    mouseover(e) {
      let parentID = "";
      parentID = e.currentTarget.id;
      let po = [];
      if (parentID.includes("DZWL")) {
        //电子围栏
        po = floatReg(
          $(`#id${this._uid}`)
            .find(`#${parentID}C`)
            .attr("points")
        );
      } else if (parentID.includes("Door") || parentID.includes("FHM")) {
        //门
        po = floatReg(
          $(`#id${this._uid}`)
            .find(`#${parentID}C2`)
            .attr("d")
        );
      } else if (parentID.includes("HWML")) {
        //红外幕帘
        po = floatReg(
          $(`#id${this._uid}`)
            .find(`#${parentID}C>path`)
            .next()
            .attr("d")
        );
      } else {
        //其他设备
        po = floatReg(
          $(`#id${this._uid}`)
            .find(`#${parentID}C`)
            .attr("d")
        );
      }
      $(`#id${this._uid} svg #myg`).show();
      $(`#id${this._uid} svg #myg text`).text(parentID);
      $(`#id${this._uid} svg #myg text`).attr({
        x: po[0] - 0 + 7, //将提示信息右移,防止提示信息覆盖在设备上出现闪烁情况,所以加5
        y: po[1] - 0,
      });
      $(`#id${this._uid} svg #myg text`).css({ "font-size": "5px" });
      $(`#id${this._uid} svg #myg image`).attr({
        x: po[0] - 0 + 5, //将提示信息右移,防止提示信息覆盖在设备上出现闪烁情况,所以加5
        y: po[1] - 7,
        width: parentID.length * 4,
      });
    },
    //移出
    mouseout(e) {
      $(`#id${this._uid} svg #myg`).hide();
    },
    //点击
    click(e) {
      this.$emit("click", e);
    },
    //缩放+拖拽
    zoomed() {
      this.g.attr("transform", d3.event.transform);
    },
  },
  created() {},
  watch: {
    url: {
      immediate: true,
      handler(str) {
        if (str && str.length) {
          window.Snap.load(this.url, this.callback);
        }
      },
    },
    svgPosObj: {
      handler(newVal, oldVal) {
        this.resetVision();
      },
      deep: true,
    },
    pointPos: {
      handler(newVal, oldVal) {
        this.toAlarmPoint();
      },
      deep: true,
    },
  },
  mounted() {},
};
</script>

<style>
.saveVision {
  position: absolute;
  bottom: 0px;
  right: 90px;
}
.resetVision {
  position: absolute;
  bottom: 0px;
  right: 15px;
}
.d3-tip.n {
  z-index: 9999;
}
</style>

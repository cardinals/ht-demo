import { NodeAxis } from "./common"

class Effect {
  constructor() {
    if (new.target === Effect) {
      throw new Error("Effect!");
    }
    console.info("创建效果基类！");
  }
}

/**
 * 3d流动效果
 */
class FlowEffect extends Effect {
  constructor() {
    super();
    console.info('创建了一个3DFlowEffect!');
    this.flashMap = new Map();
  }

  /**
   * 纹理流动效果
   * @param {ht.Data} data
   * @param {number} flowAmount
   * @param {number} interval
   * @returns
   */
  flow(data, flowAmount, interval, flowAxis) {
    if (interval < 0) {
      console.info('设置的时间间隔不能为负');
      return;
    }
    if (!data) {
      console.info('数据对象不正确');
      return;
    }
    let offset = 0;
    // let envmapvalue = 0.25;
    setInterval(() => {
      offset += flowAmount;
      // envmapvalue += 0.1;
      // if (envmapvalue >= 1) {
      //   envmapvalue = 0.2;
      // }
      switch (flowAxis) {
        case NodeAxis.X:
          data.s("shape3d.uv.offset", [offset, 0, 0]);
          break;
        case NodeAxis.Y:
          data.s("shape3d.uv.offset", [0, offset, 0]);
          break;
        case NodeAxis.Z:
          data.s("shape3d.uv.offset", [0, 0, offset]);
          break;
      }
      // data.s("envmap", envmapvalue);
    }, interval);
  }

  /**
   * 纹理流动效果
   * @param {Ht.DataModel} dm
   * @param {Object} flowLightConfig
   */
  flowLight(dataModel, flowLightConfig) {
    if (!!dataModel && !!flowLightConfig) {
      this.flow(dataModel.getDataByTag(flowLightConfig.objTag), flowLightConfig.offeset, flowLightConfig.speed, flowLightConfig.dir);
    }
  }

  flash(data, color1, color2, frequency) {
    let colors = [color1, color2];
    let evn = [0.2, 0.8];
    let cindex = 0;
    const interval = setInterval(() => {
      data.s({
        "highlight.mode": "style",
        "setHighlightColor": colors[cindex],
        "shape3d.blend": colors[cindex],
        "envmap": evn[cindex]
      });
      cindex++;
      if (cindex === colors.length) {
        cindex = 0;
      }
    }, frequency);
    this.flashMap.set(data, interval);
    //clearInterval(this.interval);
  }
}

export { FlowEffect }

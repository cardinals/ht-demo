var AnimState = {
  START: 1,
  RUNNING: 2,
  END: 3,
}

/**
 * 相机飞到目标点，传入的数据未做校验，使用时请按照说明传入即可
 * @param {Graph3dView} g3d  三维视图
 * @param {Array} targetP3  目标点位置
 * @param {number} flyTime  飞行时间
 * @param {function} callback 回调函数
 * @param {boolean} log 日志开关
 */
function cameraMoveTo(g3d, targetP3, flyTime, callback, log = true) {
  if (log) {
    console.log("当前相机位置：");
    console.log(g3d.getEye());
    console.log("目标点位置：");
    console.log(targetP3);
  }

  g3d.moveCamera(g3d.getEye(), targetP3, {
    duration: flyTime,
    finishFunc: function () {
      if (log) {
        console.log("相机飞到目的地");
      }
      callback();
    },
  });
}

/**
 * 相机飞到目标点，传入的数据未做校验，使用时请按照说明传入即可
 * @param {Graph3dView} g3d  三维视图
 * @param {Node} targetNode  目标节点
 * @param {number} flyTime  飞行时间
 * @param {function} callback 回调函数
 * @param {boolean} log 日志开关
 */
function cameraMoveTo(g3d, flyTime, callback, targetNode, log = true) {
  if (log) {
    console.log("当前相机位置：");
    console.log(g3d.getEye());
    console.log("目标点位置：");
    console.log(targetNode.p3());
  }

  g3d.moveCamera(g3d.getEye(), targetNode.p3(), {
    duration: flyTime,
    finishFunc: function () {
      if (log) {
        console.log("相机飞到目的地");
      }
      callback(targetNode);
    },
  });
}

/**
 * 相机飞行动画
 * @param {graph3dView} g3d 三维视图
 * @param {node} targetNode 目标节点
 * @param {number} distance 距离
 * @param {Array} direction 相对于targetNode的方向
 * @param {number} ratio  眼睛跟中心的距离动态计算
 * @param {Boolean} log 日志开关
 */
function cameraFlyTo(g3d, targetNode, distance, direction = [0, 0, 1], ratio = 0.8, log = true) {
  if (log) {
    console.log("当前相机位置：");
    console.log(g3d.getEye());
    console.log("目标点位置：");
    console.log(targetNode.p3());
  }
  g3d.flyTo(targetNode, { animation: true, distance: distance, direction: direction, ratio: ratio });
}

/**
 *绕着某个坐标轴旋转一定的角度，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @param {NodeAxis} axis 坐标轴
 * @param {Map} tag2r3Map 存放数据模型节点标签和旋转弧度的集合
 * @param {boolean} log 显示日志信息
 * @returns 错误提示信息
 */
function rotation(data, targetValue, duration, axis, tag2r3Map, log = true) {
  if (duration < 0) {
    console.info("duration 需要大于零");
    return;
  }

  let r3 = tag2r3Map.get(data.getTag());
  let start = 0;
  let end = 0;
  let update;
  let radian = (Math.PI / 180) * targetValue;

  switch (axis) {
    case NodeAxis.X:
      start = r3[0];
      end = r3[0] + radian;
      update = function (value) {
        data.setRotationX(value);
      };
      break;
    case NodeAxis.Y:
      start = r3[1];
      end = r3[1] + radian;
      update = function (value) {
        data.setRotationY(value);
      };
      break;
    case NodeAxis.Z:
      start = r3[2];
      end = r3[2] + radian;
      update = function (value) {
        data.setRotationZ(value);
      };
      break;
  }

  data.setAnimation({
    rotation: {
      property: "r3",
      accessType: "null",
      from: start,
      to: end,
      duration: duration,
      easing: "Linear",
      onUpdate: function (value) {
        update(value);
      },
      onComplete: function () {
        if (log) {
          console.info(
            data.getTag() + `沿着${axis.toString()}轴旋转到达目标位置！`
          );
        }
      },
    },
    start: ["rotation"],
  });
}

/**
 * 绕着某个坐标轴平移一定的数值，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @param {NodeAxis} axis 坐标轴
 * @param {Map} tag2p3Map 存放数据模型节点标签和坐标位置的集合
 * @param {boolean} log 显示日志信息
 * @returns 错误提示信息
 */
function translate(data, targetValue, duration, axis, tag2p3Map, complete, log = true) {
  if (duration < 0) {
    console.info("duration 需要大于零！");
    return;
  }

  let p3 = tag2p3Map.get(data.getTag());
  let start = 0;
  let end = 0;
  let update;
  switch (axis) {
    case NodeAxis.X:
      start = p3[0];
      end = p3[0] + targetValue;
      update = function (value) {
        data.p3(value, p3[1], p3[2]);
      };
      break;
    case NodeAxis.Y:
      start = p3[1];
      end = p3[1] + targetValue;
      update = function (value) {
        data.p3(p3[0], value, p3[2]);
      };
      break;
    case NodeAxis.Z:
      start = p3[2];
      end = p3[2] + targetValue;
      update = function (value) {
        data.p3(p3[0], p3[1], value);
      };
      break;
  }

  data.setAnimation({
    translate: {
      property: "p3",
      accessType: "null",
      from: start,
      to: end,
      duration: duration,
      easing: "Linear",
      onUpdate: function (value) {
        update(value);
      },
      onComplete: function () {
        if (log) {
          console.info(
            data.getTag() + `沿着${axis.toString()}轴运动到达目标位置！`
          );
        }
        if (complete) {
          complete();
        }
      },
    },
    start: ["translate"],
  });
}

/**
 * 沿着Z轴正向运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @returns 错误提示信息
 */
function translateFront(data, tag2p3Map, targetValue, duration) {
  if (targetValue < 0) {
    console.info("targetValue 需要大于零！");
    return;
  }
  translateZ(data, tag2p3Map, targetValue, duration);
}

/**
 *沿着Z轴负方向运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @returns 错误提示信息
 */
function translateBack(data, tag2p3Map, targetValue, duration) {
  if (targetValue > 0) {
    console.info("targetValue 需要小于零！");
    return;
  }
  translateZ(data, tag2p3Map, targetValue, duration);
}

/**
 *沿着Y轴正向运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @returns 错误提示信息
 */
function translateTop(data, tag2p3Map, targetValue, duration) {
  if (targetValue < 0) {
    console.info("targetValue 需要大于零！");
    return;
  }
  translateY(data, tag2p3Map, targetValue, duration);
}

/**
 *沿着Y轴负方向运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @returns 错误提示信息
 */
function translateBottom(data, tag2p3Map, targetValue, duration) {
  if (targetValue > 0) {
    console.info("targetValue 需要小于零！");
    return;
  }
  translateY(data, tag2p3Map, targetValue, duration);
}

/**
 * 沿着x轴正向运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {Data} data 数据节点
 * @param {number} targetValue 目标数值
 * @param {number} duration 持续时间
 * @returns 提示信息
 */
function translateRight(data, tag2p3Map, targetValue, duration) {
  if (targetValue < 0 || duration < 0) {
    console.info("targetValue 需要大于零！");
    return;
  }
  translateX(data, tag2p3Map, targetValue, duration);
}

/**
 * 沿着x轴负向运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 运动到达的目标位置
 * @param {number} duration 持续时间
 * @returns 提示信息
 */
function translateLeft(data, tag2p3Map, targetValue, duration) {
  if (targetValue > 0) {
    console.info("targetValue 需要小于零！");
    return;
  }
  translateX(data, tag2p3Map, targetValue, duration);
}

/**
 * 沿着y轴运动，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data  数据节点
 * @param {number} targetValue  目标数值
 * @param {number} duration 持续时间
 * @returns 错误提示信息
 */
function translateY(data, tag2p3Map, targetValue, duration) {
  if (duration < 0) {
    console.info("duration 需要大于零！");
    return;
  }

  let p3 = tag2p3Map.get(data.getTag());
  if (p3) {
    data.setAnimation({
      translateY: {
        property: "p3",
        accessType: "null",
        from: p3[1],
        to: p3[1] + targetValue,
        duration: duration,
        easing: "Linear",
        onUpdate: function (value) {
          this.p3(p3[0], value, p3[2]);
        },
        onComplete: function () {
          console.info(data.getTag() + "沿着Y轴运动到目标位置！");
        },
      },
      start: ["translateY"],
    });
  }
}

/**
 * 沿着X轴从当前位置运动到目标位置，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标位置
 * @param {number} duration 持续时间
 * @returns 错误提示信息
 */
function translateX(data, tag2p3Map, targetValue, duration) {
  if (duration < 0) {
    console.info("duration 需要大于零！");
    return;
  }

  let p3 = tag2p3Map.get(data.getTag());
  if (p3) {
    data.setAnimation({
      translateX: {
        property: "p3",
        accessType: "null",
        from: p3[0],
        to: p3[0] + targetValue,
        duration: duration,
        easing: "Linear",
        onUpdate: function (value) {
          this.p3(value, p3[1], p3[2]);
        },
        onComplete: function () {
          console.info(data.getTag() + "沿着x轴运动到目标位置！");
        },
      },
      start: ["translateX"],
    });
  }
}

/**
 * 沿着Z轴从当前位置运动到目标位置，传入的数据未做校验，使用时请按照说明传入即可
 * @param {data} data 数据节点
 * @param {number} targetValue 目标位置
 * @param {number} duration 持续时间
 * @returns 提示信息
 */
function translateZ(data, tag2p3Map, targetValue, duration) {
  if (duration < 0) {
    console.info("duration需要大于零！");
    return;
  }

  let p3 = tag2p3Map.get(data.getTag());
  if (p3) {
    data.setAnimation({
      translateZ: {
        property: "p3",
        accessType: "null",
        from: p3[2],
        to: p3[2] + targetValue,
        duration: duration,
        easing: "Linear",
        onUpdate: function (value) {
          this.p3(p3[0], p3[1], value);
        },
        onComplete: function () {
          console.info(data.getTag() + "沿着z轴运动到目标位置！");
        },
      },
      start: ["translateZ"],
    });
  }
}

const NodeAxis = {
  X: 1,
  Y: 2,
  Z: 3,
};

class Common3D {
  constructor() {
    console.info("执行3D图形创建器,当前版本号是：" + ht.Default.getVersion());

    this.dm = new ht.DataModel();
    this.g3d = new ht.graph3d.Graph3dView(this.dm);
    this.view3 = this.g3d.getView();

    this.view3.style.backgroundSize = "cover";
    this.view3.className = "view";
    document.body.appendChild(this.view3);
    window.addEventListener(
      "resize",
      function (e) {
        this.g3d.invalidate();
      }.bind(this),
      true
    );
  }

  loadScene(scenePath, callback) {
    ht.Default.xhrLoad(scenePath, function (text) {
      let json = ht.Default.parse(text);
      this.dm.deserialize(json);
      let dm = this.dm;
      let g3d = this.g3d;
      let view3 = this.view3;
      callback(dm, g3d, view3);
    }.bind(this));
  }

  randomInt(min, max) {
    if (min > max) {
      console.info("最小数不能大于最大数");
      return 0;
    }
    while (true) {
      let samll = Math.floor(min);
      let big = Math.floor(Math.random() * max);
      if (samll <= big) {
        return big;
      }
    }
  }

  posVerify(compareA, compareB) {
    return Math.floor(compareA[0]) === Math.floor(compareB[0]) && Math.floor(compareA[1]) === Math.floor(compareB[1])
  }

  vecDistance(vector3A, vector3B) {
    return vector3A.distanceTo(vector3B)
  }

  style3dP3ByX(data, value) {
    let temp = data.p3();
    data.p3(value, temp[1], temp[2]);
  }

  style3dvisble(data, bool) {
    data.s("3d.visible", bool);
  }

  style3dTransparent(data, bool) {
    data.s("shape3d.transparent", bool);
  }

  style3dOpacity(data, value) {
    data.s('shape3d.opacity', value);
  }

  style3dEvenmap(data, value) {
    data.s("envmap", value);
  }

  style3dBloom(data, bool) {
    data.s("bloom", bool);
  }

  style3dTall(data, value) {
    data.setScaleTall(value);
  }

  style3dScale(data, x, y, z) {
    data.setScale3d(x, y, z);
  }

  style3dWireFrame(data, color, bool) {
    data.s({
      'wf.visible': bool,
      'wf.color': color,
      'wf.geometry': bool,
    });
  }

  style3dBrightness(data, value) {
    data.s("brightness", value);
  }

  style3dBlendColor(data, color) {
    data.s("shape3d.blend", color)
  }

  styleBrightnessHighlightTransparency(parent, birghtness, highlight, transparency, wfcolor) {
    parent.eachChild(
      function (node) {
        this.style3dOpacity(node, transparency);
        this.style3dEvenmap(node, highlight);
        this.style3dWireFrame(node, wfcolor, false);
        this.style3dBrightness(node, birghtness);
      }.bind(this)
    );
  }
}

class Common2D {
  constructor() {
    console.info("执行2D图形创建器,当前版本号是：" + ht.Default.getVersion());

    this.dm = new ht.DataModel();
    this.g2d = new ht.graph.GraphView(this.dm);
    this.view2 = this.g2d.getView();

    this.view2.style.backgroundSize = "cover";
    this.view2.className = "view";
    document.body.appendChild(this.view2);
    window.addEventListener(
      "resize",
      function (e) {
        this.g2d.invalidate();
      }.bind(this),
      true
    );
  }

  loadDisplay(path, callback) {
    ht.Default.xhrLoad(path, function (text) {
      let json = ht.Default.parse(text);
      let obj = this.dm.deserialize(json);
      let dm = this.dm;
      let g2d = this.g2d;
      let view2 = this.view2;
      callback(dm, g2d, view2);
    }.bind(this));
  }

  loadAsset(path, callback) {
    ht.Default.xhrLoad(path, function (text) {
      let json = ht.Default.parse(text);
      let obj = this.dm.deserialize(json);
      callback(obj);
    }.bind(this));
  }
}

export { NodeAxis, Common3D, Common2D }

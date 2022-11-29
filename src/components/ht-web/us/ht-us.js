// import "../ht-api";

/**
 * 创建 graphView,dataModel,view
 * @param {string} viewClassName
 * @returns object
 */
function createGraphView(viewClassName) {
  graph = window.graph = new ht.graph.GraphView();
  dm = window.dm = graph.dm();
  view = graph.getView();
  view.className = viewClassName;
  document.body.appendChild(view);
  return { dm: dm, view: view, graph: graph };
}

/**
 * 创建 ht节点
 * @param {string} name
 * @param {ht.DataModel} dm
 * @param {string} image
 * @returns node
 */
function createNode(name, dm, image) {
  var node = new ht.Node();
  node.setName(name);
  if (image !== undefined && image !== "") {
    node.setImage(image);
    console.info(image);
  }
  dm.add(node);
  return node;
}

/**
 * 随机获取某个范围内的数值
 * @param {number} min
 * @param {number} max
 * @returns intNubmer
 */
function randomInt(min, max) {
  if (min > max) {
    console.info("最小数不能大于最大数");
    return 0;
  }
  while (true) {
    let samll = Math.floor(min);
    let big = Math.floor(Math.random() * max);
    if (samll < big) {
      return big;
    }
  }
}

/**
 *创建面板 formPane
 * @param {string} viewClassName
 * @param {number} width
 * @param {number} height
 * @returns formPane
 */
function createFormPane(viewClassName, width, height) {
  let formPane = new ht.widget.FormPane();
  formPane.getView().className = viewClassName;
  formPane.setWidth(width);
  formPane.setHeight(height);
  document.body.appendChild(formPane.getView());
  return formPane;
}

/**
 *创建一个graph3d
 * @param {{x:number,y:number,z:number}} eyePostion
 * @param {boolean} gridShow
 * @param {string} backgroundColor
 * @returns {{dm:ht.DataModel,graph3d:ht.graph3d.Graph3dView}}
 */
function createGraph3dView(eyePostion, gridShow, backgroundColor) {
  let dm = new ht.DataModel();
  let graph3d = new ht.graph3d.Graph3dView(dm);
  graph3d.setEye(eyePostion.x, eyePostion.y, eyePostion.z);
  graph3d.setGridVisible(gridShow);
  graph3d.getView().style.background = backgroundColor;
  graph3d.addToDOM();
  return { dm: dm, graph3d: graph3d, view: graph3d.getView() };
}
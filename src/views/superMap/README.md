# superMap

## Download dependency
```
yarn add @supermap/vue-iclient3d-webgl
```

### Basic configuration 
```main.js

import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
import VueiClient from '@supermap/vue-iclient3d-webgl';
Vue.use(VueiClient);

```index.html

  <link href="./static/Cesium/Widgets/widgets.css" rel="stylesheet">
  <script src="./static/Cesium/Cesium.js"></script>

```

### Stress model
```
<sm-viewer></sm-viewer>

#Attributes
sceneUrl   加载场景数据，由supermap的iserver发布提供的场景
s3mScps    加载s3m切片
collapsed  开启折叠面板，只有在组合模式时生效
```

### 其他功能组件
 #测量           <sm3d-measure></sm3d-measure>
 #可视域分析      <sm3d-viewshed :spatial-analysis-url="spatialAnalysisUrl"></sm3d-viewshed>
                  spatial-analysis-url   可视域分析服务的地址
 #剖面分析        <sm3d-profile></sm3d-profile>
 #阴影分析        <sm3d-shadowquery></sm3d-shadowquery>
 #通视分析        <sm3d-sightline></sm3d-sightline>
 #天际线分析      <sm3d-skyline></sm3d-skyline>
 #贴线分析        <sm3d-on-line-analysis></sm3d-on-line-analysis>    
 #退线分析        <sm3d-back-line-analysis :spatial-analysis-url="spatialAnalysisUrl" :query-url="queryUrl"></sm3d-back-line-analysis>
                  spatial-analysis-url  分析服务的地址
                  query-url             查询服务的地址
 #限高分析        <sm-scene-limitheightanalysis></sm-scene-limitheightanalysis>
 #地质体分析      <sm3d-geologic-body-analysis :model-urls="modelUrls"></sm3d-geologic-body-analysis>
                  model-urls    要素服务的地址
 #裁剪Box         <sm3d-clip-box ></sm3d-clip-box>
 #裁剪Cross       <sm3d-clip-cross ></sm3d-clip-cross>
 #平面裁剪        <sm3d-clip-plane ></sm3d-clip-plane>
 #多边形裁剪      <sm3d-clip-polygon ></sm3d-clip-polygon>
 #Box交互裁剪     <sm3d-clip-box-byeditor></sm3d-clip-box-byeditor>
 #地形操作        <sm3d-terrain-operation ></sm3d-terrain-operation>
 #淹没分析        <sm3d-terrain-flood></sm3d-terrain-flood>
 #坡度坡向        <sm3d-terrain-slope ></sm3d-terrain-slope>
 #等值线          <sm3d-terrain-isoline ></sm3d-terrain-isoline>
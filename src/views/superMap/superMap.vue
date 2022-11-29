<template>
  <div>
    <!-- 地图 -->
    <sm-viewer :scene-url="sceneUrl" >
      <!-- 可视域分析 -->
      <sm3d-measure></sm3d-measure>
      <sm3d-viewshed :spatial-analysis-url="spatialAnalysisUrl"></sm3d-viewshed>
      <!-- <sm3d-profile></sm3d-profile> -->
    </sm-viewer>
  </div>
</template>
<script>
import '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css'
export default {
  data() {
    return {
      sceneUrl:'http://10.10.49.230:8090/iserver/services/3D-HengQinKouAn/rest/realspace',
      spatialAnalysisUrl: ''
    }
  },
  mounted(){
    // bingmap
    viewer.imageryLayers.addImageryProvider(
      new Cesium.BingMapsImageryProvider({
      url: "https://dev.virtualearth.net",
      mapStyle: Cesium.BingMapsStyle.AERIAL,
      key: URL_CONFIG.BING_MAP_KEY
      })
    );
    // //加载地形
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url : URL_CONFIG.SiChuan_TERRAIN,
      isSct : true//地形服务源自SuperMap iServer发布时需设置isSct为true
    });
    // 相机位置
    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(113.53446358272997,22.140192662067584,202.73957601518316),
      orientation: {
        heading : 1.4794081522796532,
        pitch : -0.2906686408120769,
        roll :  6.2831853071792345,
      },
      duration:3
    });
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(e) {
				var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position);
				var latitude=Cesium.Math.toDegrees(cartographic.latitude);
				var longitude=Cesium.Math.toDegrees(cartographic.longitude);
				var height=cartographic.height;
				var heading = Math.abs(viewer.scene.camera.heading)<0.00000001?"0":viewer.scene.camera.heading
				var pitch = Math.abs(viewer.scene.camera.pitch)<0.00000001?"0":viewer.scene.camera.pitch
				var roll = Math.abs(viewer.scene.camera.roll)<0.00000001?"0":viewer.scene.camera.roll
				console.log(e,heading,pitch,roll,latitude,longitude,height,'rollll')
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}
</script>
<style scoped>
</style>

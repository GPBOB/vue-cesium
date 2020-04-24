<!--  -->
<template>
  <div id="cesiumContainer"></div>
</template>

<script>
export default {
  data() {
    return {
      viewer: null,
      googleMapURL:
        "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
      arcGisURL:
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    };
  },
  props: {
    mapImageType: {
      type: String,
      default: "1",
    },
  },

  components: {},

  computed: {},

  mounted() {
    var url =
      "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali";
    var googleMap = new this.Cesium.UrlTemplateImageryProvider({
      url: this.googleMapURL,
    });
    let arcGisMap = new this.Cesium.ArcGisMapServerImageryProvider({
      url: this.arcGisURL,
    });
    this.viewer = new this.Cesium.Viewer("cesiumContainer", {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      // creditContainer: "credit",
      creditsDisplay: false,
      timeline: false,
      fullscreenButton: false,
      // vrButton: false,
      imageryProvider: googleMap,
      infoBox: false,
      // terrainProvider : this.Cesium.createWorldTerrain()
      // selectionIndicator:false
    });
    this.viewer.scene.debugShowFramesPerSecond = true;
  },

  methods: {},
};
</script>
<style lang="less" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
/deep/ .cesium-widget-credits {
  display: none !important;
  visibility: hidden !important;
}
</style>

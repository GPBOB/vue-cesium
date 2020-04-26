<template>
  <div style="width: 100%; height: calc(100vh - 50px)">
    <div ref="earthContainer" style="width: 100%;height:100%"></div>
  </div>
</template>

<script>
// 1 创建Earth的vue组件
export default {
  data() {
    return {
      message: "页面加载于 " + new Date().toLocaleString(),
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _bgImagery: undefined
    };
  },
  methods: {
    createEarth() {
      // 1.1.1 创建地球
      var earth = new XE.Earth(this.$refs.earthContainer);

      // 1.1.2 添加默认地球影像
      earth.sceneTree.root = {
        children: [
          // {
          //   czmObject: {
          //     name: "默认离线影像",
          //     xbsjType: "Imagery",
          //     xbsjImageryProvider: {
          //       createTileMapServiceImageryProvider: {
          //         url: XE.HTML.cesiumDir + "Assets/Textures/NaturalEarthII",
          //         fileExtension: "jpg"
          //       },
          //       type: "createTileMapServiceImageryProvider"
          //     }
          //   }
          // },
          {
            czmObject: {
              name: "谷歌影像",
              xbsjType: "Imagery",
              xbsjImageryProvider: {
                XbsjImageryProvider: {
                  url:"//www.google.cn/maps/vt?lyrs=s,h&gl=CN&x={x}&y={y}&z={z}",
                  srcCoordType: "GCJ02",
                  dstCoordType: "WGS84",
                  maximumLevel: 21
                }
              }
            }
          }
        ]
      };

      this._earth = earth;

      // 仅为调试方便用
      window.earth = earth;
    },

    createCesium() {
      window.viewer = new Cesium.Viewer(this.$refs.earthContainer);
    }
  },
  // 1.1 资源创建
  mounted() {
    if (typeof XE !== "undefined") {
      this.createEarth();
    } else if (typeof Cesium !== "undefined") {
      this.createCesium();
    }
  },
  // 1.2 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
  }
};
</script>
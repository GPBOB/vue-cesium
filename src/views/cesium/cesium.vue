<template>
  <div class="cesiumContainer">
    <BaseView ref="view"></BaseView>
    <div class="cesiumBtns">
      <button @click="addPoint">添加point</button>
      <button @click="addBillboard">添加广告牌</button>
      <button @click="addLine">添加线段</button>
      <button @click="addPolygon">添加面</button>
      <button @click="drawPoint">绘点</button>
      <button @click="drawPolygon">绘面</button>
      <button @click="drawLine">绘线</button>
    </div>
  </div>
</template>
<script>
import BaseView from "components/BaseView";
export default {
  name: "",
  data() {
    return {
      viewer: null,
      drawHandler: null,
      endDrawHandler: null,
      pointArr: [],
      pointPositions: [],
      polygonDraw: null,
      lineDraw: null,
      rectDraw: null
    };
  },
  components: {
    BaseView
  },
  methods: {
    createCanvas() {
      let can1 = document.createElement("CANVAS");
      let ctx1 = can1.getContext("2d");
      var ratio = this.getPixelRatio(ctx1);
      can1.style.width = 207;
      can1.style.height = 200;
      can1.width = can1.width * ratio;
      can1.height = can1.height * ratio;
      // 放大倍数
      ctx1.scale(ratio, ratio);
      ctx1.rect(1, 1, 204, 109); //矩形
      ctx1.fillStyle = "#0F1634";
      //矩形边框
      ctx1.lineWidth = 2;
      ctx1.strokeStyle = "#FD9800";
      ctx1.fill();
      ctx1.stroke();
      //竖直线
      ctx1.beginPath();
      ctx1.moveTo(102, 110);
      ctx1.lineTo(102, 190);
      ctx1.lineWidth = 2;
      ctx1.strokeStyle = "#FD9800";
      ctx1.stroke();
      ctx1.beginPath();
      ctx1.arc(102, 195, 5, 0, 2 * Math.PI);
      ctx1.fillStyle = "#FD9800";
      ctx1.fill();
      ctx1.stroke();

      //矩形内文字，按顺序
      ctx1.font = "15px Arial";
      ctx1.fillStyle = "#037DD5";
      ctx1.fillText("Hello World", 20, 25);
      ctx1.font = "15px Arial";
      ctx1.fillStyle = "#FD9800";
      ctx1.fillText("Hello World", 20, 50);
      ctx1.font = "15px Arial";
      ctx1.fillStyle = "#ffffff";
      ctx1.fillText("Hello World", 20, 75);
      ctx1.font = "15px Arial";
      ctx1.fillStyle = "#33CBFD";
      ctx1.fillText("调度", 20, 100);
      let ctx2 = can1.getContext("2d");
      ctx2.rect(20, 85, 50, 20); //矩形
      ctx2.globalAlpha = 0;
      ctx2.stroke();

      can1.addEventListener("click", e => {
        let p = this.getEventPosition(e);
        if (ctx2.isPointInPath(p.x, p.y)) {
          //点击了矩形
          console.log(111);
        }
      });

      return can1;
    },
    //获取点击坐标点
    getEventPosition(ev) {
      var x, y;
      if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) {
        // Opera
        x = ev.offsetX;
        y = ev.offsetY;
      }
      return { x: x, y: y };
    },
    //添加广告牌
    addBillboard() {
      this.viewer.entities.removeAll();
      let Billboard = this.viewer.entities.add({
        name: "billboard_one",
        position: this.Cesium.Cartesian3.fromDegrees(104.06, 30.67),
        billboard: {
          image: this.createCanvas(),
          verticalOrigin: this.Cesium.VerticalOrigin.BOTTOM
        }
      });
      this.viewer.zoomTo(Billboard);

      var handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
      handler.setInputAction(e => {
        var pick = this.viewer.scene.pick(e.position);
        if (pick && pick.id && pick.id.name == "point_one") {
          //可添加其他信息进行准确判断是否为想要获取实体
          console.log(pick.id.name); // 实体信息
        } else {
          console.log("none thing");
        }
      }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    //添加点
    addPoint() {
      this.viewer.entities.removeAll();
      let point = this.viewer.entities.add({
        name: "point_one",
        position: this.Cesium.Cartesian3.fromDegrees(104.06, 30.67),
        point: {
          pixelSize: 10,
          color: this.Cesium.Color.BLACK
        }
      });
      //飞行到点位
      this.viewer.flyTo(point);
      //直接到点位
      //  this.viewer.zoomTo(point);
    },
    //添加线
    addLine() {
      this.viewer.entities.removeAll();
      let line = this.viewer.entities.add({
        name: "line_one",
        polyline: {
          positions: this.Cesium.Cartesian3.fromDegreesArray([
            104.06,
            30.67,
            104.16,
            30.69,
            104.26,
            30.79
          ]),
          width: 2,
          material: this.Cesium.Color.YELLOW
        }
      });
      this.viewer.zoomTo(line);
    },
    //添加面
    addPolygon() {
      this.viewer.entities.removeAll();
      let polygon = this.viewer.entities.add({
        name: "polygon_one",
        polygon: {
          hierarchy: this.Cesium.Cartesian3.fromDegreesArray([
            104.06,
            30.67,
            104.16,
            30.69,
            104.26,
            30.99,
            103.26,
            32.19,
            104.06,
            30.67
          ]),
          height: 0,
          material: this.Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: this.Cesium.Color.BLACK
        }
      });
      this.viewer.zoomTo(polygon);
    },
    getPixelRatio(context) {
      var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    /*
    标绘
    */
    //标绘点
    drawPoint() {
      this.drawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.endDrawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.drawHandler.setInputAction(event => {
        // 获取屏幕坐标（二维坐标）
        let windowPosition = event.position;

        // 将屏幕坐标转为三维笛卡尔坐标
        // 获取地球对象
        let ellipsoid = this.viewer.scene.globe.ellipsoid;
        // 获取在地球上点击的坐标点
        let cartesian = this.viewer.camera.pickEllipsoid(
          windowPosition,
          ellipsoid
        );

        // 如果未点击在地球上，那么返回
        if (!cartesian) {
          return;
        }

        // 在点击位置添加点实体
        let point = this.viewer.entities.add({
          name: "gon_point",
          position: cartesian,
          point: {
            color: this.Cesium.Color.WHITE,
            pixelSize: 5,
            outlineColor: this.Cesium.Color.BLACK,
            outlineWidth: 1
          }
        });
      }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.endDrawHandler.setInputAction(e => {
        if (this.drawHandler !== null && !this.drawHandler.isDestroyed()) {
          this.drawHandler.destroy();
        }
      }, this.Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    //标绘面
    drawPolygon() {
      if (this.drawHandler !== null && !this.drawHandler.isDestroyed()) {
        this.endPolygon();
        this.endDrawHandler = null;
      }
      // this.drawHandler=null
      // this.endDrawHandler=null
      //注册屏幕事件
      this.drawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.endDrawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.drawHandler.setInputAction(event => {
        // 获取屏幕坐标（二维坐标）
        let windowPosition = event.position;

        // 将屏幕坐标转为三维笛卡尔坐标
        // 获取地球对象
        let ellipsoid = this.viewer.scene.globe.ellipsoid;
        // 获取在地球上点击的坐标点
        let cartesian = this.viewer.camera.pickEllipsoid(
          windowPosition,
          ellipsoid
        );

        // 如果未点击在地球上，那么返回
        if (!cartesian) {
          return;
        }
        // 在点击位置添加点实体
        let point = this.viewer.entities.add({
          name: "gon_point",
          position: cartesian,
          point: {
            color: this.Cesium.Color.WHITE,
            pixelSize: 5,
            outlineColor: this.Cesium.Color.BLACK,
            outlineWidth: 1
          }
        });
        this.pointArr.push(point.id);
        this.pointPositions.push(cartesian);
        // 如果存在三个点，那么创建一个面实体
        if (this.pointPositions.length >= 3) {
          if (this.polygonDraw === null) {
            this.polygonDraw = this.viewer.entities.add({
              name: "polygon",
              polygon: {
                hierarchy: this.pointPositions,
                material: this.Cesium.Color.RED.withAlpha(0.5)
              }
            });
          } else {
            // 如果面已经存在，那么修改面实体的位置数组即可
            this.polygonDraw.polygon.hierarchy = this.pointPositions;
          }
        }
      }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //右键结束绘制
      this.endDrawHandler.setInputAction(e => {
        this.endPolygon();
      }, this.Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    //结束面绘制
    endPolygon() {
      if (this.drawHandler !== null && !this.drawHandler.isDestroyed()) {
        this.drawHandler.destroy();
      }

      // 移除临时标记点，清空保存点ID的数组
      for (let id of this.pointArr) {
        this.viewer.entities.removeById(id);
      }

      //数据重置
      this.pointArr = [];
      this.pointPositions = [];
      this.polygonDraw = null;
    },
    //画线
    drawLine() {
      this.drawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.endDrawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.drawHandler.setInputAction(event => {
        // 获取屏幕坐标（二维坐标）
        let windowPosition = event.position;

        // 将屏幕坐标转为三维笛卡尔坐标
        // 获取地球对象
        let ellipsoid = this.viewer.scene.globe.ellipsoid;
        // 获取在地球上点击的坐标点
        let cartesian = this.viewer.camera.pickEllipsoid(
          windowPosition,
          ellipsoid
        );

        // 如果未点击在地球上，那么返回
        if (!cartesian) {
          return;
        }
        // 在点击位置添加点实体
        let point = this.viewer.entities.add({
          name: "gon_point",
          position: cartesian,
          point: {
            color: this.Cesium.Color.WHITE,
            pixelSize: 5,
            outlineColor: this.Cesium.Color.BLACK,
            outlineWidth: 1
          }
        });
        this.pointArr.push(point.id);
        this.pointPositions.push(cartesian);
        // 创建线实体
        if (this.pointPositions.length >= 2) {
          if (this.lineDraw === null) {
            this.lineDraw = this.viewer.entities.add({
              name: "Polyline",
              polyline: {
                positions: this.pointPositions,
                material: this.Cesium.Color.RED.withAlpha(0.5)
              }
            });
          } else {
            // 如果面已经存在，那么修改面实体的位置数组即可
            // this.lineDraw.polyline.positions = new this.Cesium.CallbackProperty(
            //   () => {
            //     return this.pointPositions;
            //   },
            //   false
            // );
            this.lineDraw.polyline.positions = this.pointPositions;
          }
        }
      }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //右键结束绘制
      this.endDrawHandler.setInputAction(e => {
        this.endPolyLine();
      }, this.Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    //结束绘制线
    endPolyLine() {
      if (this.drawHandler !== null && !this.drawHandler.isDestroyed()) {
        this.drawHandler.destroy();
      }

      // 移除临时标记点，清空保存点ID的数组
      for (let id of this.pointArr) {
        this.viewer.entities.removeById(id);
      }

      //数据重置
      this.pointArr = [];
      this.pointPositions = [];
      this.lineDraw = null;
    },
    //标绘矩形 (需要取最大最小的经纬度)
    drawRect() {
      this.drawHandler = new this.Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.drawHandler.setInputAction(el => {
        // 获取屏幕坐标（二维坐标）
        let windowPosition = event.position;

        // 将屏幕坐标转为三维笛卡尔坐标
        // 获取地球对象
        let ellipsoid = this.viewer.scene.globe.ellipsoid;
        // 获取在地球上点击的坐标点
        let cartesian = this.viewer.camera.pickEllipsoid(
          windowPosition,
          ellipsoid
        );

        // 如果未点击在地球上，那么返回
        if (!cartesian) {
          return;
        }
        // 在点击位置添加点实体
        let point = this.viewer.entities.add({
          name: "gon_point",
          position: cartesian,
          point: {
            color: this.Cesium.Color.WHITE,
            pixelSize: 5,
            outlineColor: this.Cesium.Color.BLACK,
            outlineWidth: 1
          }
        });
        this.pointArr.push(point.id);
        this.pointPositions.push(cartesian);
        // 创建线实体
        if (this.pointPositions.length >= 2) {
          if (this.rectDraw === null) {
            this.rectDraw = this.viewer.entities.add({
              name: "Polyline",
              polyline: {
                positions: this.pointPositions,
                material: this.Cesium.Color.RED.withAlpha(0.5)
              }
            });
          } else {
            // 如果面已经存在，那么修改面实体的位置数组即可
            // this.rectDraw.polyline.positions = new this.Cesium.CallbackProperty(
            //   () => {
            //     return this.pointPositions;
            //   },
            //   false
            // );
            this.rectDraw.polyline.positions = this.pointPositions;
          }
        }
      }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
  },
  mounted() {
    this.viewer = this.$refs.view.viewer;
  }
};
</script>
<style lang="less" scoped>
.cesiumContainer {
  width: 100%;
  position: relative;
  .cesiumBtns {
    position: absolute;
    top: 10px;
    left: 20px;
  }
}
</style>

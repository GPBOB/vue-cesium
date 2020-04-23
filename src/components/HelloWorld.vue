<template>
  <div>
    <BaseView ref="view"></BaseView>
    <div>
      <button @click="addPoint">添加point</button>
      <button @click="addBillboard">添加广告牌</button>
      <button @click="addLine">添加线段</button>
      <button @click="addPolygon">添加面</button>
      <button @click="clickTest('bob')">extend测试1</button>
      <button @click="clickClose">关闭</button>
    </div>
  </div>
</template>

<script>
import BaseView from "components/BaseView";
import Test from "components/extendCom";
export default {
  name: "HelloWorld",
  data() {
    return {
      viewer: null,
      testCom:null
    };
  },
  components: {
    BaseView,
  },
  methods: {
    createCanvas() {
      let can1 = document.createElement("CANVAS");
      let ctx1 = can1.getContext("2d");
      var ratio = this.getPixelRatio(ctx1);
      can1.style.width = 207;
      can1.style.height = 200;

      console.log(can1.width);
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

      can1.addEventListener("click", (e) => {
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
    addBillboard() {
      this.viewer.entities.removeAll();
      let Billboard = this.viewer.entities.add({
        name: "billboard_one",
        position: this.Cesium.Cartesian3.fromDegrees(104.06, 30.67),
        billboard: {
          image: this.createCanvas(),
          verticalOrigin: this.Cesium.VerticalOrigin.BOTTOM,
        },
      });
      this.viewer.zoomTo(Billboard);

      var handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
      handler.setInputAction((e) => {
        var pick = this.viewer.scene.pick(e.position);
        if (pick && pick.id && pick.id.name == "point_one") {
          //可添加其他信息进行准确判断是否为想要获取实体
          console.log(pick.id.name); // 实体信息
        } else {
          console.log("none thing");
        }
      }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    addPoint() {
      this.viewer.entities.removeAll();
      let point = this.viewer.entities.add({
        name: "point_one",
        position: this.Cesium.Cartesian3.fromDegrees(104.06, 30.67),
        point: {
          pixelSize: 10,
          color: this.Cesium.Color.BLACK,
        },
      });
      this.viewer.zoomTo(point);
    },
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
            30.79,
          ]),
          width: 2,
          material: this.Cesium.Color.YELLOW,
        },
      });
      this.viewer.zoomTo(line);
    },
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
            30.67,
          ]),
          height: 0,
          material: this.Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: this.Cesium.Color.BLACK,
        },
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
    //打开组件
    clickTest(names) {
      this.testCom=Test.open({
        text1: names,
      });
    },
    //关闭销毁组件
    clickClose(){
      console.log(this.testCom)
      this.testCom.closeTest()
      this.testCom=null
    }
  },
  mounted() {
    this.viewer = this.$refs.view.viewer;
    this.addBillboard();
    // 获取像素比

    // console.log(this.$children)
  },
  created() {},
};
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "../config";
//npm install cesium引入方法
// var Cesium = require('cesium/Cesium');
// var widgets= require('cesium/Widgets/widgets.css');
/**静态cesium包下载引入 */
var Cesium = require("./Cesium/Cesium.js");
var widgets = require("./Cesium/Widgets/widgets.css");


Vue.prototype.Cesium = Cesium;
Vue.prototype.widgets = widgets;

//系统配置
Vue.prototype.$config = config;

Vue.config.productionTip = false;

if (typeof XE !== "undefined") {
  // 如果XE存在，说明EarthSDK已载入
  console.log(11)
  /* eslint-disable*/
  function startup() {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
  // 1 XE.ready()会加载Cesium.js等其他资源，注意ready()返回一个Promise对象。
  XE.ready().then(startup);
} else if (typeof Cesium !== "undefined") {
  console.log(22)
  // 如果XE不存在，存在Cesium，则此时用纯Cesium进行开发
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

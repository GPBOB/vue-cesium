import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from '../config'
// import Three from 'three'
var Cesium = require('cesium/Cesium');
var widgets= require('cesium/Widgets/widgets.css');
 
Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets
//系统配置
Vue.prototype.$config=config

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

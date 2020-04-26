import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/cesium',
    children:[
      {
        path: '/cesium',
        name: 'cesium',
        meta:{
          route_name:'cesium学习',
          icon:''
        },
        component: () => import('views/cesium/cesium.vue')
      },
      {
        path: '/xbsCesium',
        name: 'xbsCesium',
        meta:{
          route_name:'xbsCesium',
          icon:''
        },
        component: () => import('views/xbsCesium/index')
      },
      {
        path: '/three',
        name: 'three',
        meta:{
          route_name:'three.js学习',
          icon:''
        },
        component: () => import('views/three/three.vue')
      },
      {
        path: '/vueStudy',
        name: 'vueStudy',
        meta:{
          route_name:'vue基础学习',
          icon:''
        },
        component: () => import('views/vueStudy/index'),
        children:[
          {
            path: '/vueStudy/vueExtend',
            name: 'vueExtend',
            meta:{
              route_name:'vueExtend学习',
              icon:''
            },
            component: () => import('views/vueStudy/vueExtend.vue')
          },
          {
            path: '/vueStudy/vueTransition',
            name: 'vueTransition',
            meta:{
              route_name:'vue动画学习',
              icon:''
            },
            component: () => import('views/vueStudy/vueTransition.vue')
          },
        ]
      },
      {
        path: '/webGL',
        name: 'webGL',
        meta:{
          route_name:'webGL学习',
          icon:''
        },
        component: () => import('views/webGL/webGL')
      },
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router

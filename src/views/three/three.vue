<template>
<div>
 <div id="container"></div>
</div>
 
</template>
<script>
import * as Three from "three";
import { OrbitControls } from "three-orbit-controls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
  name: "",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    };
  },
  methods: {
    //画矩形
    init() {
      let container = document.getElementById("container");
      this.camera = new Three.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.24,
        10
      );
      this.camera.position.z = 0.6;
      this.scene = new Three.Scene();
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    //矩形动画
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
    //画线
    drawLine() {
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      this.camera = new Three.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        500
      );
      this.camera.position.set(0, 0, 100);
      this.camera.lookAt(0, 0, 0);
      this.scene = new Three.Scene();

      var material = new Three.LineBasicMaterial({ color: 0x0000ff });

      var geometry = new Three.Geometry();
      geometry.vertices.push(new Three.Vector3(-10, 0, 0));
      geometry.vertices.push(new Three.Vector3(0, 20, 0));
      geometry.vertices.push(new Three.Vector3(10, 0, 0));
      geometry.vertices.push(new Three.Vector3(30, 0, 0));
      geometry.vertices.push(new Three.Vector3(10, -10, 0));

      var line = new Three.Line(geometry, material);
      // var loader = new Three.FontLoader();

      // loader.load("fonts/helvetiker_regular.typeface.json", (font)=> {
      //   var geometry = new Three.TextGeometry("Hello three.js!", {
      //     font: font,
      //     size: 80,
      //     height: 5,
      //     curveSegments: 12,
      //     bevelEnabled: true,
      //     bevelThickness: 10,
      //     bevelSize: 8,
      //     bevelSegments: 5
      //   });
      // });
//       var loader = new Three.GLTFLoader();

// loader.load( 'path/to/model.glb', function ( gltf ) {

// 	this.scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );
      this.scene.add(line);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate()
    this.drawLine();
  }
};
</script>
<style lang="less" scoped>
#container {
  height: calc(100vh - 50px);
}
</style>
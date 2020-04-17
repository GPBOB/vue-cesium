<!--  -->
<template>
  <div id="cesiumContainer">

  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {
        var viewer = new this.Cesium.Viewer('cesiumContainer')
        console.log(viewer)
    },

  methods: {}
}

</script>
<style lang='less' scoped>
 #cesiumContainer {
        width: 100%;
        height: 100%;
        
    }
</style>
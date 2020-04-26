<!--  -->
<template>
  <div style="width: 100%; height: 100%">
    <EarthComp></EarthComp>
  </div>
</template>

<script>
import EarthComp from 'components/EarthCom'
import XES from 'components/mapjs/initEarth'
export default {
  data() {
    return {
    };
  },

  components: {
    EarthComp
  },

  mounted() {
     console.log(XES)
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
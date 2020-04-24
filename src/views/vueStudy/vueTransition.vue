<template>
  <div>
    <Animates :isShow="showStatus"></Animates>
    <button @click="clickTrans">vue动画</button>
  </div>
</template>
<script>
import Animates from "components/animate";
export default {
  name: "",
  data() {
    return {
         showStatus: false,
    };
  },
  components: {
    Animates
  },
  methods: {
    clickTrans() {
      this.showStatus = !this.showStatus;
    }
  },
  mounted() {}
};
</script>
<style>
</style>
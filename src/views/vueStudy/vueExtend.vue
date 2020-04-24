<template>
  <div>
    <button @click="clickTest('bob')">extend测试1</button>
     <button @click="clickClose">关闭</button>
  </div>
</template>
<script>
import Test from "components/extendCom";
export default {
  name: "",
  data() {
    return {
         testCom: null,
    };
  },
  methods: {
    //打开组件
    clickTest(names) {
      if (document.getElementById("test")) {//防止重复添加
        this.clickClose();
      }
      this.testCom = Test.open({
        text1: names
      });
    },
    //关闭销毁组件
    clickClose() {
      this.testCom.closeTest();
      this.testCom = null;
    }
  },
  mounted() {}
};
</script>
<style>
</style>
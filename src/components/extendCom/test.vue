<template>
    <div id="test" v-if="isShow">
      <p>extends弹框{{ text }}{{ params.text1 }}</p>
      <button @click="closeTest">删除</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      text: "对方的",
      isShow: false,
    };
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    //销毁组件
    closeTest() {
      this.isShow = false;
      this.$destroy();
      this.$el.remove();
    },
  },
  beforeMount() {
    //挂在到el上
    document.body.appendChild(this.$el);
  },
  mounted() {
    this.isShow = true;
  },
};
</script>
<style scoped>
#test{
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: blueviolet;
  color: #ffffff;
}
</style>

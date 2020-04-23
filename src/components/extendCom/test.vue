<template>
  <transition name="fade">
    <div id="test">
      <p>extends弹框{{ text }}{{ params.text1 }}</p>
      <button @click="closeTest">删除</button>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      text: "对方的",
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
      this.$destroy();
      this.$el.remove();
    },
  },
  beforeMount() {
      //挂在到el上
      document.body.appendChild(this.$el);
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <transition name="ani">
    <div v-if="isShow">
      <p>这是一个动画组件</p>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    isShow: {
        type:Boolean,
        default:false
    },
  },
  data() {
    return {
      
    };
  },
};
</script>
<style scoped>
.ani-enter-active,
.ani-leave-active {
  animation-duration: 0.5s;
}
.ani-enter-active {
  animation-name: testAnimate;
}
.ani-leave-active {
  animation-name: testAnimate2;
}
@keyframes testAnimate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes testAnimate2 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes aniOutLeft {
  from {
    transform: none;
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes aniInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>

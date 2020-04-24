<template>
  <div class="home">
    <ul class="gMenu">
      <li
        v-for="(item, index) in menuList"
        :key="index"
        @click="jumpTo(item,index,1)"
        :class="liIndex==index?'activeLi':''"
      >
        <span>{{ item.meta.route_name }}</span>
        <ul class="menuChild" v-if="item.children && showChild">
          <li
            class="menuChildLi"
            v-for="(el,elindex) in item.children"
            :key="elindex"
            @click.stop="jumpTo(el,elindex,2)"
             :class="cliIndex==elindex?'activeLi':''"
          >{{ el.meta.route_name }}</li>
        </ul>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      liIndex: 0,
      cliIndex: 0,
      showChild:false //二级菜单显隐控制
    };
  },
  methods: {
    /**
     * routePath:路径
     * index:菜单列表索引
     * type:菜单等级 1-一级菜单
     */
    jumpTo(route, index, type) {
      if (type == 1) {
        this.liIndex = index;
        if(route.children){
          this.showChild=!this.showChild
        }
      } else {
        this.cliIndex = index;
        this.showChild=false
      }
      
      this.$router.push({ path: route.path });
    }
  },
  created() {
    this.menuList = this.$router.options.routes[0].children;
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  .gMenu {
    height: 50px;
    background-color: black;
    list-style: none;
    display: flex;
    margin: 0 !important;
    li {
      height: 50px;
      line-height: 50px;
      width: 100px;
      float: left;
      color: #fff;
      cursor: pointer;
      position: relative;
      .menuChild {
        width: 120px;
        list-style: none;
        position: absolute;
        margin: 0 !important;
        padding: 0 !important;
        background-color: black;
        .menuChildLi {
          display: inline-block;
          height: 50px;
          line-height: 50px;
          width: 100%;
          float: left;
          color: #fff;
          cursor: pointer;
          text-align: center;
        }
      }
    }
  }
}
.activeLi {
  background-color: #fff;
  color: #000000 !important;
}
</style>

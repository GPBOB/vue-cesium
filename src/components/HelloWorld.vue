<template>
  <div>
    <BaseView></BaseView>
  </div>
</template>

<script>
    import BaseView from 'components/BaseView'
export default {
  name: 'HelloWorld',
  components:{
    BaseView
  },
    mounted () {
        
    }
}
</script>


<style scoped>
    #cesiumContainer {
        width: 100%;
        height: 100%;
        
    }
</style>
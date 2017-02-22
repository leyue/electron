<template>
  <div id="app">
    <div class="nav-bar">
      <m-nav-menu></m-nav-menu>
    </div>
    <div class="wrapper">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="right-float-menu">
      <el-button type="info" icon="upload2" size="small" @click="openDevTools()"></el-button>
    </div>
  </div>
</template>

<script>
  import NavMenu from './components/NavMenu.vue'

  export default {
    name: 'app',
    components: {
      'm-nav-menu': NavMenu,
    },
    mounted() {
      var that = this;

    },
    methods: {
      openDevTools() {
          usr.ctrl.win.openDevTools();
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  body{
    margin: 0px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0px;
  }
  .nav-bar {
    position: fixed;
    left: 0px;
    right: 0px;
    top:0px;
    z-index: 9999;
  }
  .wrapper {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 45px;
    bottom: 0px;
    padding: 10px 10px 10px 10px;
    z-index: 100;
    overflow: auto;
  }
  .right-float-menu {
    position: fixed;
    bottom: 50px;
    right: 5px;
    z-index: 999;
  }

  .el-tree::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  .el-tree::-webkit-scrollbar
  {
    width: 5px;
    background-color: #F5F5F5;
  }

  .el-tree::-webkit-scrollbar-thumb
  {
    background-color: #969898;
  }
</style>

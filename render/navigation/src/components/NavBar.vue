<template>
  <div>
    <el-menu theme="dark" default-active="home" class="el-menu-demo" mode="horizontal" router>
      <div class="nav-title">
        <i class="el-icon-star-off"></i>
        展讯小工具集
      </div>
      <el-menu-item index="home">主页</el-menu-item>
      <div class="nav-content">
        <el-row :gutter="0">
          <el-col :span="20">
            <div style="-webkit-app-region:drag; width: 100%; height: 45px;"></div>
          </el-col>
          <el-col :span="4">
            <el-button-group style="float: right; margin: 8px 5px 0px 0px">
              <el-button type="info" icon="setting" size="small" @click="jump('settings')"></el-button>
              <!--<el-button type="info" icon="search" size="small"></el-button>-->
              <el-button type="info" icon="close" size="small" @click="close()"></el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </div>
      <div class="nav-drag-area"></div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'm-page-settings',
    data() {
      return {

      }
    },
    methods: {
      close() {
        usr.ctrl.win.close();
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  .nav-title {
    -webkit-app-region:drag;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 150px;
    height: 45px;
    background-color: #2c3e50;
    color: #bfcbd9;
    font-weight: bold;
    line-height:45px;
  }
  .nav-bar>div {
    margin-left: 150px;
    background-color: #2c3e50;
  }
  .el-menu--horizontal .el-menu-item {
    height: 45px;
    padding: 15px 15px;
    line-height: normal;
  }
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #bfcbd9;
    background-color: #476481;
  }
  .nav-content {
    display: inline;
    float: right;
    width: 85%;
    height: 100%;
    text-align: center;
    color: #bfcbd9;
  }
</style>

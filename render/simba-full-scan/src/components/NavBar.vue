<template>
  <div>
    <el-menu theme="dark" default-active="search" class="el-menu-demo" mode="horizontal" router>
      <div class="nav-title">
        <i class="el-icon-view"></i>
        SIMAB FULL SCAN
      </div>
      <el-menu-item index="home"><label @click="loadUrl('navigation')">主页</label></el-menu-item>
      <el-menu-item index="search">查看</el-menu-item>
      <div class="nav-content">
        <el-row :gutter="0">
          <el-col :span="13">
            <el-input
              style="width: 100%;margin-top: 12px;"
              size="mini"
              placeholder="请输入数据源根目录(输入后请点击回车键)"
              v-model="db.path"
              @keyup.enter="openAndGetInfoFromDB()">
              <el-button slot="append" icon="more" @click="openRootDir()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="7">
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
  import VueRouter from 'vue-router'
  export default {
    name: 'm-nav-menu',
    data() {
      return {
        db: {
          paths: [],
          select: '1',
          path: ''
        }
      }
    },
    methods: {
      close() {
        usr.ctrl.win.close();
      },
      jump(url) {
        this.$router.push({path: url});
      },
      loadUrl(appName) {
        switch (appName) {
          case 'navigation':
            usr.ctrl.win.loadURL(usr.route.render.navigation);
        }
      },
      openRootDir() {
        var that = this;
        (async function () {
          try {
            var dir = await new Promise(function (resolve, reject) {
              usr.ctrl.win.showOpenDialog('./', ['openDirectory'], [{name: 'txt', extensions: ['db']}], function (res) {
                if (res) {
                  resolve(res[0].toString());
                } else {
                  reject('请选择一个文件夹');
                }
              });
            });
            that.db.path = dir;
            that.$store.dispatch('flushRootDir', dir);
          } catch (err) {
            console.log(err);
          }
        })();
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  .nav-title {
    -webkit-app-region: drag;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 180px;
    height: 45px;
    background-color: #2c3e50;
    color: #bfcbd9;
    font-weight: bold;
    line-height: 45px;
  }

  .nav-bar > div {
    margin-left: 180px;
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

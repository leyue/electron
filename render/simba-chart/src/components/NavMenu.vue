<template>
  <div>
    <el-menu theme="dark" default-active="search" class="el-menu-demo" mode="horizontal" router>
      <div class="nav-title">
        <i class="el-icon-star-off"></i>
        SIMAB 测试记录
      </div>
      <el-menu-item index="home"><label @click="loadUrl('navigation')">主页</label></el-menu-item>
      <el-menu-item index="search">查询</el-menu-item>
      <el-menu-item index="chart">统计</el-menu-item>
      <div class="nav-content">
        <el-row :gutter="0">
          <el-col :span="15">
            <el-input
              style="width: 100%;margin-top: 12px;"
              size="mini"
              placeholder="请输入数据库地址(输入后请点击回车键)"
              v-model="db.path"
              @keyup.enter="openAndGetInfoFromDB()">
              <el-select v-model="db.select" slot="prepend" placeholder="请选择" style="width: 140px;">
                <el-option label="选择一个数据源" value="1"></el-option>
                <el-option label="选择数据源文件夹" value="2" :disabled="true"></el-option>
              </el-select>
              <el-button slot="append" icon="more" @click="openAndGetInfoFromDB()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="5">
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
            break;
        }
      },
      openAndGetInfoFromDB() {
        var that = this;
        usr.ctrl.win.showOpenDialog('./', ['openFile'], [{name: '数据库样本', extensions: ['db']}], function (res) {
          if (res) {
            var path = res[0].toString();
            usr.ctrl.win.isFileExist(path, function (exist) {
              if (!exist) {
                return;
              }
              usr.ctrl.sql.ajax({
                url: usr.route.process.SQL.OPEN_DB,
                data: {dbPath: path},
                success: function () {
                  usr.ctrl.sql.ajax({
                    url: usr.route.process.SQL.GET_PROJECTS,
                    success: function (data) {
                      console.log(data);
                      that.$store.dispatch('enableQuery', true);
                      that.$store.dispatch('flushProjects', data);
                      that.db.path = path;
                      that.db.paths.push(path);
                    },
                    error: function (data) {
                      that.$message({
                        showClose: true,
                        message: data,
                        type: 'error'
                      });
                      that.$store.dispatch('enableQuery', false);
                    }
                  });
                }
              });
            });
          }
        });
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
    width: 170px;
    height: 45px;
    background-color: #2c3e50;
    color: #bfcbd9;
    font-weight: bold;
    line-height: 45px;
  }

  .nav-bar > div {
    margin-left: 170px;
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
    width: 77%;
    height: 100%;
    text-align: center;
    color: #bfcbd9;
  }
</style>

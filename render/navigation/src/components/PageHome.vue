<template>
    <div style="color: #bfcbd9">
      <div>
        <div class="title">
          SIMBA
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="div-app active update div-query-chart" @click="loadUrl('simba-chart')">
                <i class="el-icon-star-off"></i>
                <strong>日志查询统计</strong>
                <i class="el-icon-information"></i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="div-app active div-full-scan" @click="loadUrl('simba-full-scan')">
                <i class="el-icon-view"></i>
                <strong>Full Scan</strong>
              </div>
            </el-col>
          </el-row>
        </div>
        <br>
        <div class="title">
          PANDORA
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="div-app div-query-chart">
                <i class="el-icon-loading"></i>
                <strong>开发中...</strong>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'm-page-home',
        data() {
            return {}
        },
        methods: {
          loadUrl(appName) {
              switch(appName) {
                case 'simba-chart':
                  usr.ctrl.win.loadURL(usr.route.render.simba.chart);
                  break;
                case 'simba-full-scan':
                  usr.ctrl.win.loadURL(usr.route.render.simba.full_scan);
                  break;
              }

          }
        }
    }
</script>

<style lang='scss' rel="stylesheet/scss">
  .title {
    text-align: left;
    font-size: 12px;
    border-bottom: 1px dashed #476481;
  }
  .div-app  {
    width: 200px;
    height: 150px;
    background-color: #777f89;
    margin: 0px;
    line-height: 150px;
    font-size: 15px;
    color: white;
    margin: 2px;
    border-radius: 2px;
    &:hover {
      background-color: #939ca6;
    }
  }
  .el-icon-information {
    color: red;
    float: right;
    margin: 10px;
    font-size: 20px;
  }
  .div-app.active  {
    background-color: #61a740;
    &:hover {
      background-color: #70c04a;
    }
  }
  .div-app.active.update  {
    background-color: #c87831;
    &:hover {
      background-color: #f89a32;
    }
  }
</style>

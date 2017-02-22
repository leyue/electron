<template>
  <div style="color: #bfcbd9;">
    <div style="display: none">{{rootDir}}</div>
    <div>
      <el-tabs v-model="standard" @tab-click="handleClick">
        <el-tab-pane v-for="item in standards" :label="item" :name="item"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <m-sub-chart v-for="item in modules" :data="item"></m-sub-chart>
    </div>
  </div>
</template>

<script>
  import SubChart from './SubChart.vue'

  export default {
    name: 'm-page-home',
    components: {
      'm-sub-chart': SubChart,
    },
    data() {
      return {
        scheme: null,
        standards: [],
        standard: '',
        modules: []
      }
    },
    computed: {
      rootDir(){
        var rootDir = this.$store.state.fullScan.rootDir;
        this.getDirScheme(rootDir);
        return rootDir;
      }
    },
    methods: {
      getDirScheme(rootDir){
        var that = this;
        if(!rootDir) {
            return;
        }
        usr.ctrl.fullScan.ajax({
          url: usr.route.process.fullScan.getDirScheme,
          data: {rootDir: rootDir},
          success: function (data) {
            console.log(data);
            that.scheme = data;
            that.standards = [];
            for (var key in data) {
              that.standards.push(key);
            }
            if (that.standards) {
              that.standard = that.standards[0];
              that.jumpToStandard(that.standard)
            }
          },
          error: function (err) {
            console.log(err);
            that.standards = [];
            that.modules = [];
            that.$message({
              message: '警告，请选择正确的full-scan文件夹目录',
              type: 'error'
            });
          }
        });
      },
      handleClick(tab, event) {
        this.jumpToStandard(this.standard);
      },
      jumpToStandard(standard) {
        var that = this;
        that.modules = [];
        this.$nextTick(function(){
          for (var key in that.scheme[standard]) {
            that.modules.push({
              rootDir: that.rootDir,
              standard: standard,
              module: key,
              fileName: that.scheme[standard][key]
            });
          }
        });
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">

</style>

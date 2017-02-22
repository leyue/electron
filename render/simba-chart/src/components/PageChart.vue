<template>
  <div ref="content" style="width: 100%; height: 100%;">
    <div>
      <el-form :model="queryForm" :rules="queryForm.rules" ref="queryForm" label-width="100px" class="demo-queryForm">
        <el-form-item label="查询条件">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-select v-model="queryForm.data.dut" style="width: 100%;" size="small" clearable placeholder="请选择DUT">
                <el-option
                  v-for="item in queryForm.duts"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="queryForm.data.project" :disabled="!enableQuery" style="width: 100%;" size="small"
                         clearable placeholder="请选择项目">
                <el-option
                  v-for="item in projects"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data.startDate">
                <el-date-picker
                  type="datetime"
                  placeholder="开始日期"
                  v-model="queryForm.startDate"
                  style="width: 100%;"
                  size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data.endDate">
                <el-date-picker
                  type="datetime"
                  placeholder="结束日期"
                  v-model="queryForm.endDate"
                  style="width: 100%;"
                  size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                :disabled="!enableQuery"
                style="width: 100%;"
                size="small"
                @click="submitForm('queryForm')">查询
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div
            v-loading.body="chart.pros.loading"
            element-loading-text="拼命加载中"
            v-bind:style="{height: chart.height + 'px'}"
            style="border: 2px solid #ededed;min-height: 300px;">
            <highcharts :options="chart.pros" ref="highcharts" style="height: 100%; width: 100%;"></highcharts>
          </div>
        </el-col>
        <el-col :span="12">
          <div
            v-loading.body="chart.items.loading"
            element-loading-text="拼命加载中"
            v-bind:style="{height: chart.height + 'px'}"
            style="border: 2px solid #ededed;min-height: 300px;">
            <highcharts :options="chart.items" ref="highcharts" style="height: 100%; width: 100%;"></highcharts>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'm-page-chart',
    data() {
      var that = this;
      return {
        remote: null,
        queryForm: {
          data: {
            project: '',
            dut: '',
            projects: '',
            start_time: '',
            end_time: ''
          },
          startDate: null,
          endDate: new Date(),
          duts: [
            {label: 'DUT1', value: '0'},
            {label: 'DUT2', value: '1'},
            {label: 'DUT3', value: '2'},
            {label: 'DUT4', value: '3'}],
          rules: {
            startDate: [
              {type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}
            ],
            endDate: [
              {type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}
            ]
          }
        },
        chart: {
          height: 300,
          pros: {
            loading: false,
            chart: {
              type: 'column'
            },
            title: {
              text: 'TOP6 pass rate of projects'
            },
            subtitle: {
              text: '点击工具在右边显示该工程的top10测试失败项目'
            },
            xAxis: {
              categories: [],
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Pass rate %',
                align: 'middle'
              },
              labels: {
                overflow: 'justify'
              }
            },
            tooltip: {
              valueSuffix: ' %'
            },
            plotOptions: {
              column: {
                colorByPoint: true,
                dataLabels: {
                  enabled: true
                },
                events: {
                  click: function (e) {
                    that.getProjectErrItems(e.point.category);
                  }
                }
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -0,
              y: 50,
              floating: true,
              borderWidth: 0,
              shadow: false
            },
            credits: {
              enabled: false
            },
            series: [{
              name: 'pass rate',
              data: []
            }]
          },
          items: {
            loading: false,
            chart: {
              type: 'bar'
            },
            title: {
              text: 'TOP10 FAIL ITEMS'
            },
            subtitle: {
              text: ''
            },
            xAxis: {
              categories: [],
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              title: {
                text: '错误次数',
                align: 'middle'
              },
              labels: {
                overflow: 'justify'
              }
            },
            tooltip: {
              valueSuffix: ' 次'
            },
            plotOptions: {
              bar: {
                colorByPoint: true,
                dataLabels: {
                  enabled: true
                }
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -0,
              y: 50,
              floating: true,
              borderWidth: 0,
              shadow: false
            },
            credits: {
              enabled: false
            },
            series: [{
              name: 'error',
              data: []
            }]
          }
        }
      };
    },
    mounted() {
      var that = this;
//      that.chart.height = document.documentElement.clientHeight - 130;
//      window.onresize = function () {
//        that.chart.height = document.documentElement.clientHeight - 130;
//      };
      setInterval(function () {
        that.chart.height = document.documentElement.clientHeight - 130;
      }, 700);
    },
    computed: {
      enableQuery() {
        return this.$store.state.DBTrd.enable;
      },
      projects() {
        return this.$store.state.DBTrd.projects;
      }
    },
    methods: {
      getProjectsFailRate() {
        var that = this;
        that.chart.pros.loading = true;
        that.queryForm.data.projects = that.queryForm.data.project?[that.queryForm.data.project]:this.projects;
        that.queryForm.data.start_time = this.queryForm.startDate?this.queryForm.startDate.format("yyyy-MM-dd hh:mm:ss"):'';
        that.queryForm.data.end_time = this.queryForm.endDate?this.queryForm.endDate.format("yyyy-MM-dd hh:mm:ss"):'';
        usr.ctrl.sql.ajax({
          url: usr.route.process.SQL.GET_PROJECTS_FAIL_RATE,
          data: that.queryForm.data,
          success: function (data) {
            that.chart.pros.loading = false;
            console.log(data);
            that.chart.pros.xAxis.categories = data.projects;
            that.chart.pros.series[0].data = data.data;
            if (data.projects) {
              that.getProjectErrItems(data.projects[0]);
            }
          },
          error: function (err) {
            console.log(err);
          }
        });
      },

      getProjectErrItems(project) {
        var that = this;
        that.chart.items.loading = true;
        that.chart.items.subtitle.text = project;
        that.queryForm.data.start_time = this.queryForm.startDate?this.queryForm.startDate.format("yyyy-MM-dd hh:mm:ss"):'';
        that.queryForm.data.end_time = this.queryForm.endDate?this.queryForm.endDate.format("yyyy-MM-dd hh:mm:ss"):'';
        usr.ctrl.sql.ajax({
          url: usr.route.process.SQL.GET_PROJECT_ERROR_ITEM,
          data: {project: project},
          success: function (data) {
            that.chart.items.loading = false;
            console.log(data);
            that.chart.items.xAxis.categories = data.items;
            that.chart.items.series[0].data = data.data;
          },
          error: function (err) {
            console.log(err);
          }
        });
      },

      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
          that.getProjectsFailRate();
        });
      },
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  .el-form-item {
    margin-bottom: 18px;
  }

  .highcharts-point:hover {
    cursor: pointer;
  }
</style>

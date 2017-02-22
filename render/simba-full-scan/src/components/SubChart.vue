<template>
  <div
    v-loading.body="chart.loading"
    element-loading-text="拼命加载中"
    v-bind:style="{height: chart.height + 'px'}"
    style="border: 2px solid #ededed;min-height: 400px; margin: 5px;">
    <highcharts :options="chart" ref="highcharts" style="height: 100%; width: 100%;"></highcharts>
  </div>
</template>

<script>
  export default {
    name: '',
    mounted() {
      this.getFileData(this.data.rootDir, this.data.standard, this.data.module, this.data.fileName);
    },
    props: [
      'data'
    ],
    data() {
      return {
        chart: {
          loading: false,
          height: 400,
          chart: {
            type: 'spline',
            zoomType: 'x'
          },
          title: {
            text: 'G_AFC_Band2.log',
          },
          xAxis: {},
          yAxis: {
            title: {
              text: 'FREQ'
            },
            min: 0
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '({point.x}, {point.y})'
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            },
            area: {
              marker: {
                radius: 5
              },
              lineWidth: 2,
              threshold: null,
            }
          },
          series: []
        }
      }
    },
    methods: {
      getFileData(rootDir, standard, module, fileName) {
        var that = this;
        var path = '{0}/{1}/{2}/{3}'.format(rootDir, standard, module, fileName);
        that.chart.title.text = '{0}: {1}'.format(module, fileName);
        usr.ctrl.fullScan.ajax({
          url: usr.route.process.fullScan.getFileData,
          data: {path: path},
          success: function (data) {
            console.log(data);
            that.chart.series = data;
          },
          error: function (err) {
            console.log(err)
          }
        });
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">

</style>

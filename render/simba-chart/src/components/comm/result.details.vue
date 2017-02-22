<template>
  <div>
    <el-table
      @sort-change="tableSortChange"
      :data="details.data"
      border
      style="width: 100%;"
      :height="details.height"
      :row-class-name="tableRowClassName"
      :default-sort="{prop: '', order: ''}">
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column prop="item" label="item" sortable></el-table-column>
      <el-table-column prop="band" label="band" sortable></el-table-column>
      <el-table-column prop="channel" label="channel" sortable></el-table-column>
      <el-table-column prop="condition" label="condition"></el-table-column>
      <el-table-column prop="lower" label="lower"></el-table-column>
      <el-table-column prop="value" label="value"></el-table-column>
      <el-table-column prop="upper" label="upper"></el-table-column>
      <el-table-column prop="result" label="result" sortable></el-table-column>
      <el-table-column prop="unit" label="unit"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.curIdx"
      :page-size="pagination.size"
      layout="prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'm_comm_result_details',
    mounted() {
      this.$on('show', function (data) {
        console.log(data);
      });
    },
    data() {
      return {
        details: {
          height:300,
          condition: {
            test_id: 1,
            order_by: 'order by result asc',
            limit: '30, 0'
          },
          data: []
        },
        pagination: {
          curIdx: 1,
          size: 30,
          total: 30,
        },
      }
    },
    mounted() {
      var that = this;
      that.details.height = document.documentElement.clientHeight * 0.6;
      window.onresize = function () {
        that.details.height = document.documentElement.clientHeight * 0.6;
      };
    },
    computed: {

    },
    methods: {
      tableRowClassName(row, index) {
        if (row.result !== 1) {
          return 'error-row';
        }
        return '';
      },

      tableSortChange(data) {
        var that = this;
        that.details.condition.order_by = 'order by {0} {1}'.format(data.prop, data.order==='ascending'?'asc':'desc');
//        that.pagination.curIdx = 1;
        that.getResultDetails();
      },

      getResultDetailsCnt() {
        var that = this;
        usr.ctrl.sql.ajax({
          url: usr.route.process.SQL.GET_RESULT_DETAILS_CNT,
          data: that.details.condition,
          success: function (data) {
            console.log(data);
            that.pagination.total = Math.max(Number(data), that.pagination.size);
          }
        });
      },

      getResultDetails() {
        var that = this;
        this.details.condition.limit = '{0},{1}'
          .format(this.pagination.size * (this.pagination.curIdx - 1), this.pagination.size);
        usr.ctrl.sql.ajax({
          url: usr.route.process.SQL.GET_RESULT_DETAILS,
          data: that.details.condition,
          success: function (data) {
            console.log(data);
            that.details.data = data;
          }
        });
      },

      getInfo: function (test_id) {
        var that = this;
        console.log(test_id);
        that.details.condition.test_id = test_id;
        that.getResultDetailsCnt();
        that.getResultDetails();
      },

      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.pagination.curIdx = val;
        this.getResultDetails();
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  .el-table .warning-row {
    background: #F7BA2A;
  }

  .el-table .error-row {
    color: #FF4949;
  }
</style>

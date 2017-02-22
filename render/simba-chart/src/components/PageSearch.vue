<template>
  <div ref="content" style="width: 100%; height: 100%;">
    <div>
      <el-form :model="queryForm" :rules="queryForm.rules" ref="queryForm" label-width="100px" class="demo-queryForm">
        <el-form-item label="查询条件">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item prop="sn1">
                <el-input v-model="queryForm.data.sn1" size="small" placeholder="请输入SN号"></el-input>
              </el-form-item>
            </el-col>
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
              <el-input v-model="queryForm.data.module" size="small" placeholder="请输入模块"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="起始时间" required>
          <el-row :gutter="10">
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
      <el-progress :show-text="false" :percentage="30"></el-progress>
    </div>
    <div class="result">
      <el-table
        @sort-change="tableSortChange"
        :data="table.data"
        border
        style="width: 100%;"
        :height="table.height"
        :row-class-name="tableRowClassName"
        :default-sort="{prop: '', order: ''}">
        <el-table-column type="index" width="30"></el-table-column>
        <el-table-column prop="sn1" label="sn1" sortable width="130"></el-table-column>
        <el-table-column prop="project" label="project" sortable width="120"></el-table-column>
        <el-table-column prop="dut" label="dut" sortable width="55"></el-table-column>
        <el-table-column prop="error_code" label="err code" sortable width="85"></el-table-column>
        <el-table-column prop="error_item" label="error item" width="80"></el-table-column>
        <el-table-column prop="desc" label="desc"></el-table-column>
        <el-table-column prop="repair_code" label="repair code" width="90"></el-table-column>
        <el-table-column prop="start_time" label="start time" width="130"></el-table-column>
        <el-table-column prop="end_time" label="end time" width="130"></el-table-column>
        <el-table-column label="Detail" width="50">
          <template scope="scope">
            <i class="el-icon-edit" @click="showDetails(scope.row.test_id)"></i>
          </template>
        </el-table-column>
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
    <div>
      <el-dialog
        title="详情"
        :lock-scroll="true"
        size="large"
        top="15%"
        v-model="details.show">
        <m_comm_result_details ref="details"></m_comm_result_details>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Details from './comm/result.details.vue'

  export default {
    name: 'm-page-search',
    components: {
      'm_comm_result_details': Details,
    },
    data() {
      return {
        queryForm: {
          data: {
            sn1: '',
            project: '',
            dut: '',
            module: '',
            start_time: '',
            end_time: '',
            order_by: '',
            limit: '30, 0'
          },
          startDate: null,
          endDate: new Date(),
          duts: [
            {label: 'DUT1', value: '1'},
            {label: 'DUT2', value: '2'},
            {label: 'DUT3', value: '3'},
            {label: 'DUT4', value: '4'}],
          rules: {
            startDate: [
              {type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}
            ],
            endDate: [
              {type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}
            ]
          }
        },
        table: {
          height: 300,
          data: []
        },
        pagination: {
          curIdx: 1,
          size: 30,
          total: 30,
        },
        details: {
            show: true
        }
      };
    },
    mounted() {
      var that = this;
//      that.table.height = document.documentElement.clientHeight - 205;
//      window.onresize = function () {
//        that.table.height = document.documentElement.clientHeight - 205;
//      };
      setInterval(function () {
        that.table.height = document.documentElement.clientHeight - 205;
      }, 700);
      this.details.show = false;
      this.$nextTick(() => {

      });
    },
    computed: {
      enableQuery() {
        return this.$store.state.DBTrd.enable;
      },
      projects() {
//        console.log(this.$store.state.DBTrd.projects);
        return this.$store.state.DBTrd.projects;
      }
    },
    methods: {
      tableRowClassName(row, index) {
        if (row.error_code !== 0) {
          return 'error-row';
        }
        return '';
      },

      tableSortChange(data) {
        var that = this;
        that.queryForm.data.order_by = 'order by {0} {1}'.format(data.prop, data.order==='ascending'?'asc':'desc');
//        that.pagination.curIdx = 1;
        that.getResults();
      },

      getResultsCnt() {
        var that = this;
        this.queryForm.data.start_time = this.queryForm.startDate?this.queryForm.startDate.format("yyyy-MM-dd hh:mm:ss"):'';
        this.queryForm.data.end_time = this.queryForm.endDate?this.queryForm.endDate.format("yyyy-MM-dd hh:mm:ss"):'';
        usr.ctrl.sql.ajax({
          url: usr.route.process.SQL.GET_RESULTS_CNT,
          data: that.queryForm.data,
          success: function (data) {
            console.log(data);
            that.pagination.total = Math.max(Number(data), that.pagination.size);
          },
          error: function (err) {
            console.log(err);
          }
        });
      },

      getResults() {
        var that = this;
        this.queryForm.data.start_time = this.queryForm.startDate?this.queryForm.startDate.format("yyyy-MM-dd hh:mm:ss"):'';
        this.queryForm.data.end_time = this.queryForm.endDate?this.queryForm.endDate.format("yyyy-MM-dd hh:mm:ss"):'';
        this.queryForm.data.limit = '{0},{1}'
          .format(this.pagination.size * (this.pagination.curIdx - 1), this.pagination.size);
        usr.ctrl.sql.ajax({
          url: usr.route.process.SQL.GET_RESULTS,
          data: that.queryForm.data,
          success: function (data) {
            console.log(data);
            that.table.data = data;
          }
        });
      },

      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
          that.pagination.curIdx = 1;
          that.getResultsCnt();
          that.getResults();
        });
      },

      showDetails(test_id) {
        this.details.show = true;
        this.$refs.details.getInfo(test_id);
      },

      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.pagination.curIdx = val;
        this.getResults();
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  .el-form-item {
    margin-bottom: 15px;
  }

  .el-table {
    font-size: 13px;
  }

  .el-table td, .el-table th {
    height: 20px;
  }

  .el-table .cell, .el-table th > div {
    padding-left: 5px;
    padding-right: 5px;
  }

  .el-table .warning-row {
    background: #F7BA2A;
  }

  .el-table .error-row {
    color: #FF4949;
  }

  .el-dialog__header {
    padding: 10px;
    border-bottom: 1px solid #e4e4e4;
  }
  .el-dialog__body {
    padding: 10px;
  }
</style>

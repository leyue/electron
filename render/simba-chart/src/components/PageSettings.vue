<template>
  <div>
    <transition name="fade">
      <div class="div-subnav-up">
        <i class="el-icon-arrow-left" @click="back();">设置</i>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'm-page-settings',
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.back();
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  .div-subnav-up {
    font-size: 20px;
    border-bottom: 2px solid #e5e5e5;
    height: 30px;
    color: #324157;
    .el-icon-arrow-left {
      float: left;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>

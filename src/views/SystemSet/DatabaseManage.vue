<template>
  <div class="database-manage">

    <section class="database-manage-right">

      <DataManage v-if="$route.path==='/DatabaseManage'"></DataManage>
      <router-view v-else></router-view>

    </section>
  </div>
</template>
<script>
import DataManage from './RoleManage'
export default {
  name: "database-manage-index",
  components: {
    DataManage
  },
  data() {
    return {
    }
  },

}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.database-manage {
  &:after {
    @include _clearBoth();
  }

  & > .database-manage-right {
    width: 100%;
    .btn-area{
      height: 4.4rem;
      .el-button{
        height: 1.8rem;
        width: 4.4rem;
        background: #47b5e8;
        color:#fff;
        padding:0px 0px !important;
        margin-top:1.3rem;
        margin-right:1.2rem;
      }
    }
    .el-table {
      .el-table__body .el-input__inner,.el-textarea__inner{
        height: 28px;
        line-height: 28px;
      }
      .el-textarea__inner{
        min-height: 28px !important;
      }
      .el-input__icon {
        line-height: 2rem !important;
        height: 2rem !important;
      }
    }
  }
  .my-input {
    width: 25%;
    display: inline-block;
    padding-left: 4%;
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .my-input .el-input {
    width: 100% !important;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .gocenter {
    width: 41%;
  }
  .gocenter .el-form-item__label {
    text-align: center !important;
  }
  .gocenter .el-textarea__inner {
    min-height: 72px !important;
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
  }
  .btnBox .el-button {
    margin-left: 2%;
  }
  .database-manage-right-content {
    height: 87%;
    overflow-y: auto;
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .el-dialog{
    .el-dialog__body{
      .el-form-item__content{
        .el-input,.el-textarea{
          margin-left: 1rem;
        }
        .el-select{
          // width: 100%;
        }
      }
    }
  }
  .btnBox1 {
    display: inline-block;
    width: 100%;
    margin-bottom: 1%;
  }
  .btnBox1 span{
    font-size: 14px;
  }
}
</style>


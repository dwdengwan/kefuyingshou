<template>
  <div class="ComparisonTableEdit">
    <!-- <h3>水表信息</h3> -->
    <div class="backfillSubmitForm">
      <el-form :inline="true" :model="backfillSubmitForm" label-width="120px">
        <el-form-item label="用户编号：">
          <el-input v-model="backfillSubmitForm.con" placeholder="用户编号"></el-input>
          <el-button style="background:#faa646;color:#fff;" size="mini" icon="el-icon-search"></el-button>
        </el-form-item>
        <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
          <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
        </el-form-item>
        <el-form-item label="水表形态：">
          <el-select clearable v-model="backfillSubmitForm.waterMeterManufacturer" placeholder="新表">
            <el-option v-for="(item,index) in backfillSubmitForm.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.fromBottm" :key="i">
          <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
        </el-form-item>
        <el-form-item label="支付押金：">
          <el-input v-model="backfillSubmitForm.con" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="textarea">
          <el-input type="textarea" v-model="backfillSubmitForm.subordinateDepartments" size="mini" :rows="2" clearable placeholder="备注"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户地址：">
                    <el-input type="textarea" v-model="backfillSubmitForm.desc" :rows="4" clearable placeholder="用户地址"></el-input>
                </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ComparisonTableEdit",
  data() {
    return {
      backfillSubmitForm: {
        backfillInput: [
          //   {
          //     label: "用户编号：",
          //     value: "",
          //     tips: ""
          //   },
          {
            label: "用户名称：",
            value: "",
            tips: ""
          },
          {
            label: "用户地址：",
            value: "",
            tips: ""
          },
          {
            label: "装表地址：",
            value: "",
            tips: ""
          },
          {
            label: "水表编号：",
            value: "",
            tips: ""
          },




        ],
        fromBottm: [
          {
            label: "水表厂家：",
            value: "",
            tips: ""
          },
          {
            label: "水表型号：",
            value: "",
            tips: ""
          },
          {
            label: "水表口径：",
            value: "",
            tips: ""
          },
          {
            label: "装表日期：",
            value: "",
            tips: ""
          },
          //   {
          //     label: "支付押金：",
          //     value: "",
          //     tips: ""
          //   },
          //   {
          //     label: "备注：",
          //     value: "",
          //     tips: ""
          //   },
        ],
        desc: "",
        descoptions: [],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "新表",
            value: "1"
          },
          {
            name: "旧表",
            value: "2"
          },
        ]
      },
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ComparisonTableEdit {
  h3 {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
  }
  .backfillSubmitForm {
    margin-top: 15px;
  }
  .backfillSubmitForm {
    padding: 10px 20px;
    width: 93%;
    .el-form-item {
      width: 32%;
      .el-form-item__content {
        width: calc(100% - 120px);
        height: 30px;
        line-height: 30px;
        .el-input,.el-select{
          width:  calc(100% - 50px);
        }
        .el-input__inner{
          width:  100%;
          height: 30px;
          line-height: 30px;
        }
      }
      .el-form-item__label{
        height: 30px;
        line-height: 30px;
      }
    }
    .textarea {
        width: 100%;
        min-height: 50px;
        .el-form-item__content {
          width: 50%;
        }
    }
    .address {
      width: 100%;
      .el-form-item__content {
        width: 80%;
      }
    }
  }
}
</style>

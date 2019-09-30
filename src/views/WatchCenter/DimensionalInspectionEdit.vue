
<template>
  <div class="DimensionalInspectionEdit">

    <div class="backfillSubmitForm">
      <el-form :inline="true" :model="backfillSubmitForm" label-width="120px">
        <legend>水表信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="backfillSubmitForm.userNum" :disabled="tableEdit" placeholder=""></el-input>
        </el-form-item>
        <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
          <el-input v-model="v.value" :placeholder="v.tips" clearable disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="水表形态：">
          <el-select v-model="backfillSubmitForm.waterMeterType" clearable placeholder="" disabled>
            <el-option v-for="item in backfillSubmitForm.descoptions" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInputOther" :key="i">
          <el-input v-model="v.value" :placeholder="v.tips" clearable disabled class="read-only"></el-input>
        </el-form-item>
        <el-form-item label="拆表日期：">
          <el-date-picker
            v-model="backfillSubmitForm.disassemblyDate"
            type="date"
             :disabled="tableEdit"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="送修日期：">
          <el-date-picker
            v-model="backfillSubmitForm.repairsDate"
            type="date"
             :disabled="tableEdit"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        
        <el-form-item label="维修类型：">
          <el-select v-model="backfillSubmitForm.fixType" clearable placeholder="" :disabled="tableEdit">
            <el-option v-for="item in backfillSubmitForm.fixTypeoptions" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" class="remark">
          <el-input type="textarea" v-model="backfillSubmitForm.subordinateDepartments" :disabled="tableEdit" size="mini" :rows="2" clearable placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "DimensionalInspectionEdit",
  props:{
    tableEdit:{
      type:Boolean,
    }
  },
  data() {
    return {
      backfillSubmitForm: {
        backfillInput: [
        //   {
        //     label: "水表编号：",
        //     value: "",
        //     tips: ""
        //   },
          {
            label: "出厂编号：",
            value: "",
            tips: ""
          },
        ],
        backfillInputOther: [
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
          // {
          //   label: "拆表日期：",
          //   value: "",
          //   tips: ""
          // },
          // {
          //   label: "送修日期：",
          //   value: "",
          //   tips: ""
          // },
          // {
          //   label: "备注：",
          //   value: "",
          //   tips: ""
          // },
        ],
        desc: "",
        descoptions: [
          {
            name: "新表",
            value: "1"
          },
          {
            name: "旧表",
            value: "2"
          },
        ],
        con: "",
        watermeterWarehouse: "",
        waterMeterManufacturer: "",
        waterMeterType: "",
        waterMeterCaliber: "",
        waterMeterStatus: "",
        subordinateDepartments: "",
        fixType: "",
        fixTypeoptions: [
          {
            name: "维修",
            value: "1"
          },
          {
            name: "检测",
            value: "2"
          },
        ],
        disassemblyDate:"",
        repairsDate:"",
        userNum:"",
      },
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.DimensionalInspectionEdit {
  legend {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .backfillSubmitForm{   
    padding: 10px 20px;
    width: calc(100% - 40px);
    .el-form-item{
        width: 24%;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        .el-form-item__content{
              width: calc(100% - 120px);
              height: 30px;
            line-height: 30px;
            .el-select,.el-input__inner,.el-date-editor{
                width: 100% !important;
                height: 30px;
                line-height: 30px;
                  
            }
            .el-input__icon{
                line-height: 30px;
            }
        }
    }
    .remark{
        width: 48%;
        height: 60px;
        .el-form-item__content{
            width: calc(100% - 120px);
        }
    }
  }
}
</style>

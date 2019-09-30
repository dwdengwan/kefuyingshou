

<template>
  <div class="DimensionalInspectionExamine">

    <div class="backfillSubmitForm">
      <el-form :inline="true" :model="backfillSubmitForm" label-width="120px">
        <legend>水表信息</legend>
        <el-form-item label="水表编号：">
          <el-input v-model="userNum" placeholder=""></el-input>
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
        <!-- <el-form-item label="送修日期：">
                    <el-input  v-model="backfillSubmitForm.waterMeterStatus" clearable placeholder=""></el-input>
                </el-form-item> -->
        
        <el-form-item label="维修类型：">
          <el-select v-model="backfillSubmitForm.fixType"  placeholder="">
            <el-option v-for="item in backfillSubmitForm.fixTypeoptions" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="备注：" class="remark">
          <el-input type="textarea" v-model="backfillSubmitForm.subordinateDepartments" size="mini" :rows="2" clearable placeholder="备注"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户地址：">
                    <el-input type="textarea" :rows="4" v-model="backfillSubmitForm.con" clearable placeholder="用户地址"></el-input>
                </el-form-item> -->
                
        <div v-if="backfillSubmitForm.fixType == '1'"> 
        <legend>维修信息</legend>
        <!-- <el-form-item label="维修人：">
            <el-input  v-model="backfillSubmitForm.watermeterWarehouse" placeholder="" clearable disabled class="read-only"></el-input>
        </el-form-item> -->
        <el-form-item label="维修日期：">
            <el-date-picker
            v-model="backfillSubmitForm.waterMeterManufacturer"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
            
        </el-form-item>
        <el-form-item label="维修结果：">
            <el-select v-model="backfillSubmitForm.waterMeterType"  placeholder="报废">
                <el-option
                v-for="item in backfillSubmitForm.descoptions"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <br>
        <el-form-item label="维修说明：" class="remark">
            <el-input type="textarea" :rows="2" clearable v-model="backfillSubmitForm.waterMeterCaliber" placeholder=""></el-input>
        </el-form-item>
        
        </div>
          <legend>检定信息</legend>
          <!-- <el-form-item label="维修人：">
              <el-input  v-model="backfillSubmitForm.verificationName" placeholder="" clearable disabled class="read-only"></el-input>
          </el-form-item> -->
          <el-form-item label="检定日期：">
              <el-date-picker
              v-model="backfillSubmitForm.verificationDate"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
              
          </el-form-item>
          <el-form-item label="检定结果：">
              <el-select v-model="backfillSubmitForm.verificationResult"  placeholder="">
                  <el-option
                  v-for="item in backfillSubmitForm.verificationResultOption"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <br>
          <el-form-item label="检定说明：" class="remark">
              <el-input type="textarea" :rows="2" clearable v-model="backfillSubmitForm.verificationDesc" placeholder=""></el-input>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "DimensionalInspectionExamine",
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
          {
            label: "拆表日期：",
            value: "",
            tips: ""
          },
          {
            label: "送修日期：",
            value: "",
            tips: ""
          },
          // {
          //   label: "备注：",
          //   value: "",
          //   tips: ""
          // },
        ],
        desc: "",
        descoptions: [
          {
            name: "送检",
            value: "1"
          },
          {
            name: "报废",
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
        fixType: "1",
        fixTypeoptions: [
          {
            name: "维修",
            value: "1"
          },
          {
            name: "送检",
            value: "2"
          },
        ],
        verificationName:'',
        verificationDate:'',
        verificationResult:'1',
        verificationResultOption:[
          {
            name: "入库",
            value: "1"
          },
          {
            name: "报废",
            value: "2"
          },],
        verificationDesc:'',
      },
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.DimensionalInspectionExamine {
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

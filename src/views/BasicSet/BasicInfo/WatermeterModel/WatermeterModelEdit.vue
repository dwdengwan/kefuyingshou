
<template>
    <div class="WaterMeterfacturerEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                
                <el-form-item label="水表型号：">
                      <el-input v-model="backfillSubmitForm.name"
                                placeholder="请输入水表型号">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="水表型式：">
                      <el-select v-model="backfillSubmitForm.fName" clearable size="mini">
                        <el-option v-for="item in fNameType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
       
                    <el-form-item label="传输方式：">
                      <el-select v-model="backfillSubmitForm.fAddress" clearable size="mini">
                        <el-option v-for="item in fAddressType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
       
                    <el-form-item label="水表传感器：">
                      <el-select v-model="backfillSubmitForm.Tname" clearable size="mini">
                        <el-option v-for="item in TnameType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
       
                    <!-- <el-form-item label="联系电话：">
                      <el-input v-model="backfillSubmitForm.TelephoneNum"
                                placeholder="请输入联系电话">
                      </el-input>
                    </el-form-item> -->
       
                    <el-form-item label="状态：">
                      <el-select v-model="backfillSubmitForm.state" placeholder="请选择状态">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="排序号：">
                      <el-input v-model="backfillSubmitForm.sort"
                                placeholder="请输入排序号">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="备注：">
                      <el-input v-model="backfillSubmitForm.desc"
                                placeholder="请输入备注"
                                type="textarea">
                      </el-input>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"WaterMeterfacturerEdit",
    data(){
        return{
            backfillSubmitForm:{
                superiorArea:'',
                areaNum:'',
                state:'0',
                areaName:'',
                desc:"",
                sort:'',
                TelephoneNum:'',
                Tname:'',
                fAddress:'',
                name:'',
                fname:''
            },
            fNameType:[//水表型式
              {
                label:'旋翼',
                value:0,
              },
              {
                label:'螺翼',
                value:1,
              },
              {
                label:'复式',
                value:2,
              },
              {
                label:'其他',
                value:3,
              }
            ],
            fAddressType:[//传输方式
              {
                label:'无',
                value:0,
              },
              {
                label:'NB-LOT',
                value:1,
              },
              {
                label:'GPRS',
                value:2,
              },
              {
                label:'LORA',
                value:3,
              },
              {
                label:'有线',
                value:4,
              },
              {
                label:'其他',
                value:5,
              },
            ],
            TnameType:[//水表传感器
              {
                label:'机械表',
                value:0,
              },
              {
                label:'脉冲',
                value:1,
              },
              {
                label:'无磁',
                value:2,
              },
              {
                label:'光电',
                value:3,
              },
              {
                label:'摄像',
                value:4,
              },
              {
                label:'电磁',
                value:5,
              },
              {
                label:'其他',
                value:6,
              },
            ],
        }
    }
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.WaterMeterfacturerEdit{
    height: 100%;
    width: 80%;
    margin: 0 auto;
    .backfillSubmitForm{
        // margin-top: 15px;
        // padding: 10px 20px;
        // // width: 93%
        .el-input--mini /deep/ .el-input__inner{
                width: 100%;
        }
    }
}
</style>

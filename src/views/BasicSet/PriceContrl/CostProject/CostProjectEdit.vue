
<template>
    <div class="AdminRegionEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                
                <el-form-item label="费用名称：">
                    <el-input 
                    v-model="backfillSubmitForm.areaName"
                    placeholder="请输入费用名称">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="编号：">
                    <el-input 
                    v-model="backfillSubmitForm.areaCode"
                    placeholder="请输入编号">
                    </el-input>
                </el-form-item>
                
                <!-- <el-form-item label="参考系数：">
                    <el-input 
                    v-model="backfillSubmitForm.areaNum"
                    placeholder="请输入参考系数">
                    </el-input>
                </el-form-item> -->
                
                <el-form-item label="参考价格：">
                    <el-input 
                    v-model="backfillSubmitForm.areaPrice"
                    placeholder="请输入参考价格">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="是否计算违约金：">
                    <el-input 
                    v-model="backfillSubmitForm.areaPrice"
                    placeholder="请输入是否计算违约金">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态：">
                    <el-select
                    v-model="backfillSubmitForm.areaState"
                    placeholder="请选择状态"
                    >
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="违约金：">
                    <el-select
                    v-model="backfillSubmitForm.areaBreak"
                    placeholder="请选择违约金"
                    >
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
              </el-form-item> -->
                <el-form-item label="排序号：">
                <el-input 
                  v-model="backfillSubmitForm.areaOrderBy"
                  placeholder="请输入排序号">
                </el-input>
              </el-form-item>
              
                <el-form-item label="备注：">
                    <el-input 
                    type="textarea"
                    v-model="backfillSubmitForm.areaRemark"
                    placeholder="请输入备注">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"AdminRegionEdit",
    data(){
        return{
            backfillSubmitForm:{
                superiorArea:'',
                areaNum:'',
                state:'0',
                areaName:'',
                areaPrice:"",
                areaCode:'',
                areaState:'',
                areaBreak:'',
                areaRemark:'',
                areaOrderBy:'',
            },
          
            options1: [
                {
                value: '01',
                label: '启用'
                },
                {
                value: '02',
                label: '禁用'
                },
            ],
            options2: [
                {
                value: '03',
                label: '0.8倍'
                },
                {
                value: '04',
                label: '1倍'
                },
                {
                value: '05',
                label: '1.2倍'
                },
            ],
            options3: [
                {
                value: '06',
                label: '1'
                },
                {
                value: '07',
                label: '2'
                },
                {
                value: '08',
                label: '3'
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
.AdminRegionEdit{
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

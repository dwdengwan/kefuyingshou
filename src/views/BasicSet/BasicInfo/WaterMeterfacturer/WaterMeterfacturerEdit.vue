
<template>
    <div class="WaterMeterfacturerEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                
                <el-form-item label="厂家名称：">
                      <el-input v-model="backfillSubmitForm.name"
                                placeholder="请输入厂家名称">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="厂家全称：">
                      <el-input v-model="backfillSubmitForm.fName"
                                placeholder="请输入厂家全称">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="厂家地址：">
                      <el-input v-model="backfillSubmitForm.fAddress"
                                placeholder="请输入厂家地址">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="联系人：">
                      <el-input v-model="backfillSubmitForm.Tname"
                                placeholder="请输入联系人">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="联系电话：">
                      <el-input v-model="backfillSubmitForm.TelephoneNum"
                                placeholder="请输入联系电话">
                      </el-input>
                    </el-form-item>
       
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


<template>
    <div class="BankInfoEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                <el-form-item label="银行名称："> 
                    <el-input 
                    v-model="backfillSubmitForm.areaName"
                    placeholder="请输入银行名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="银行行号：">
                    <el-input 
                    v-model="backfillSubmitForm.bankCode"
                    placeholder="请输入银行行号">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系人：">   
                    <el-input 
                    v-model="backfillSubmitForm.linkMan"
                    placeholder="请输入联系人">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input 
                    v-model="backfillSubmitForm.linkTel"
                    placeholder="请输入联系电话">
                    </el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="backfillSubmitForm.state"  placeholder="请选择状态">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input 
                    type="textarea"
                    v-model="backfillSubmitForm.desc"
                    placeholder="请输入备注">
                    </el-input>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"BankInfoEdit",
    data(){
        return{
            backfillSubmitForm:{
                linkTel:'',
                linkMan:'',
                state:'0',
                bankCode:'',
                desc:"",
                areaName:''
            },
        }
    }
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.BankInfoEdit{
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

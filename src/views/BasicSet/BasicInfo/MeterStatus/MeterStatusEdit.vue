
<template>
    <div class="MeterStatusEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                <el-form-item label="抄表状态：">
                        <el-input 
                                v-model="backfillSubmitForm.name"
                                placeholder="请输入抄表状态">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="异常标记：">
                        <el-select v-model="backfillSubmitForm.flag" placeholder="请选择异常标记">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="backfillSubmitForm.state" placeholder="请选择行业状态">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序号：">
                        <el-input 
                                v-model="backfillSubmitForm.sort"
                                placeholder="请输入排序号">
                        </el-input>
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
    name:"MeterStatusEdit",
    data(){
        return{
            backfillSubmitForm:{
                superiorArea:'',
                areaNum:'',
                state:'0',
                areaName:'',
                desc:"",
                sort:"",
                flag:'1'
            },
        }
    }
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.MeterStatusEdit{
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

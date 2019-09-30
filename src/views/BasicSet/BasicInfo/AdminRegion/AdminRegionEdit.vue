
<template>
    <div class="AdminRegionEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                <el-form-item label="上级区域：">
                    <el-input v-model="backfillSubmitForm.superiorArea" placeholder="上级区域" clearable ></el-input>
                </el-form-item>
                <el-form-item label="区域编号：">
                    <el-input v-model="backfillSubmitForm.areaNum" placeholder="区域编号" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="区域名称：">
                    <el-input v-model="backfillSubmitForm.areaName" placeholder="区域名称" clearable ></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="backfillSubmitForm.state"  placeholder="请选择状态">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="backfillSubmitForm.desc" type="textarea" :rows="5" placeholder="备注" clearable  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="描述：">
                </el-form-item> -->
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
                desc:"",
            },
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

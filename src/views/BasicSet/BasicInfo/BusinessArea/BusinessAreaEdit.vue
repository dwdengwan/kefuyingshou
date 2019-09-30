
<template>
    <div class="BusinessAreaEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                <!-- <el-form-item label="上级网点：">
                    <el-input v-model="backfillSubmitForm.superiorArea" placeholder="上级网点" clearable ></el-input>
                </el-form-item> -->
                <el-form-item label="网点编号：">
                    <el-input v-model="backfillSubmitForm.areaNum" placeholder="网点编号" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="网点名称：">
                    <el-input v-model="backfillSubmitForm.areaName" placeholder="网点名称" clearable ></el-input>
                </el-form-item>
                <el-form-item label="网点坐标：">
                    <el-input v-model="backfillSubmitForm.postion" placeholder="网点坐标" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="网点地址：">
                    <el-input v-model="backfillSubmitForm.address" placeholder="网点地址" clearable ></el-input>
                </el-form-item>
                <el-form-item label="营业时间：">
                    <el-input v-model="backfillSubmitForm.time" type="textarea" :rows="2" placeholder="营业时间" clearable ></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="backfillSubmitForm.state" placeholder="请选择状态">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="backfillSubmitForm.desc" type="textarea" :rows="5" placeholder="备注" clearable  ></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"BusinessAreaEdit",
    data(){
        return{
            backfillSubmitForm:{
                superiorArea:'',
                areaNum:'',
                state:'0',
                areaName:'',
                desc:"",
                postion:'',
                address:'',
                time:'',
            },
        }
    }
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.BusinessAreaEdit{
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


<template>
    <div class="HolidaySetEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                <el-form-item label="假期名称：">
                    <el-input 
                        v-model="backfillSubmitForm.name"
                        placeholder="请输入假期名称">
                    </el-input>
                </el-form-item>

                <el-form-item label="假期时间：">
                    <el-date-picker
                    v-model="backfillSubmitForm.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
    
                <el-form-item label="状态：">
                    <el-select v-model="backfillSubmitForm.state" placeholder="请选择状态">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                    </el-select>
                </el-form-item>

    
                <el-form-item label="假期说明：">
                    <el-input 
                        v-model="backfillSubmitForm.desc"
                        type="textarea"
                        placeholder="请输入假期说明">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"HolidaySetEdit",
    data(){
        return{
            backfillSubmitForm:{
                time:'',
                areaNum:'',
                state:'0',
                name:'',
                desc:"",
            },
        }
    }
}
</script>
<style lang="scss">
 @import "../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.HolidaySetEdit{
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

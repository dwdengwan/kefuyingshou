
<template>
    <div class="CaliberInfoEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                
                <el-form-item label="口径名称：">
                    <el-input v-model="backfillSubmitForm.name" placeholder="口径名称" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="口径数量：">
                    <el-input v-model="backfillSubmitForm.value" placeholder="口径数量" clearable ></el-input>
                </el-form-item>
                <el-form-item label="累积流量：">
                    <el-input v-model="backfillSubmitForm.cumulative" placeholder="网点坐标" clearable  ></el-input>
                </el-form-item>
                <el-form-item label="表码位数：">
                    <el-input v-model="backfillSubmitForm.number" placeholder="网点地址" clearable ></el-input>
                </el-form-item>
                <el-form-item label="旧表换表周期：">
                    <el-input v-model="backfillSubmitForm.oldWeek" placeholder="网点地址" clearable ></el-input>
                </el-form-item>
                <el-form-item label="新表换表周期：">
                    <el-input v-model="backfillSubmitForm.newWeek" placeholder="网点地址" clearable ></el-input>
                </el-form-item>
                <el-form-item label="居民容量水价：">
                    <el-input v-model="backfillSubmitForm.resident" placeholder="网点地址" clearable ></el-input>
                 </el-form-item>
                <el-form-item label="非居民容量水价：">
                    <el-input v-model="backfillSubmitForm.nonResident" placeholder="网点地址" clearable ></el-input>
                 </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"CaliberInfoEdit",
    data(){
        return{
            backfillSubmitForm:{
                name: "DN15",
                value:  "15",
                cumulative:'7000',
                number:'4',
                oldWeek:'72',
                newWeek:'72',
                resident:"-",
                nonResident:"-",
            },
        }
    }
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.CaliberInfoEdit{
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


<template>
    <div class="WaterTypeEdit">
         <div class="backfillSubmitForm">
            <el-form class="basicInfoForm" :inline="true" size="mini" :model="backfillSubmitForm" label-width="150px">
                
                <el-form-item label="上级类型：">
                    <el-select
                    v-model="backfillSubmitForm.areaFrist"
                    placeholder=""
                    @keyup.esc.native="cancel(scope.$index, backfillSubmitForm)" >
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    
                </el-form-item>

                <el-form-item label="类型编号：">
                    <el-input 
                    v-model="backfillSubmitForm.areaCode"
                    placeholder="">
                    </el-input>
                </el-form-item>

                <el-form-item label="类型名称：">
                    <el-input 
                    v-model="backfillSubmitForm.areaThird"
                    placeholder="">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态：">
                    <el-select
                    v-model="backfillSubmitForm.areaSecond"
                    placeholder=""
                    disabled
                    @keyup.esc.native="cancel(scope.$index, backfillSubmitForm)">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    
                    
                </el-form-item>

                    <!-- <el-form-item label="四级定义：">
                    <el-input 
                    v-model="backfillSubmitForm.areaFour"
                    placeholder="请输入四级定义">
                    </el-input>
                </el-form-item> -->

                <el-form-item label="排序：">
                    <el-input 
                    v-model="backfillSubmitForm.areaOrder"
                    placeholder="请输入排序">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"WaterTypeEdit",
    data(){
        return{
            backfillSubmitForm:{
                areaCode:'',
                areaFrist:'',
                areaSecond:'',
                areaThird:'',
                areaFour:'',
                areaOrder:'',
                superiorArea:'',
                areaNum:'',
                state:'0',
                areaName:'',
                desc:"",
            },
            
      options1: [
        {
          value: 12,
          label: '居民用水'
        },
        {
          value: 11,
          label: '非居民用水'
        },
        {
          value: 10,
          label: '特种用水'
        },
      ],
      options2: [
        {
          value: 9,
          label: '农村居民用水'
        },
        {
          value: 8,
          label: '城镇居民用水'
        },
        {
          value: 7,
          label: '工业用水'
        },
      ],
      options3: [
        {
          value: 6,
          label: '一般'
        },
        {
          value: 5,
          label: '低保'
        },
        {
          value: 4,
          label: '五保'
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
.WaterTypeEdit{
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

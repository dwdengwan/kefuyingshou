<template>
    <div class="TableDismantlingBackfill">
        <div class="backfillSubmitForm">
            <el-form ref="TableDismantlingBackfillForm" :inline="true" :model="backfillSubmitForm" label-width="100px">
        
                <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInputRead" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only" size="mini"></el-input>
                </el-form-item>
                <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips" clearable size="mini"></el-input>
                </el-form-item>
                <!-- <el-form-item label="拆表类型：">
                    <el-select  clearable v-model="backfillSubmitForm.desc" placeholder="拆表类型">
                         <el-option  v-for="(item,index) in backfillSubmitForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>

                    </el-select>
                </el-form-item> -->

                        <el-form-item label="备注：" class="textarea">
                            <el-input type="textarea" v-model="backfillSubmitForm.subordinateDepartments" size="mini" :rows="2" clearable placeholder="备注"></el-input>
                        </el-form-item>

               
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"TableDismantlingBackfill",
    props:["backfillSubmitFormData"],
    data(){
        return{
            searchCon:"",

            backfillSubmitForm:this.backfillSubmitFormData,

        }
    },
    mounted:{

    },
    methods:{
        // 搜索
        demand(){

        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      }


    }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.TableDismantlingBackfill{
    .backfillSubmitForm{
        padding: 10px 0px;
        width: 100%;
        .el-form-item{
            width: 24%;
            margin-right: 0px;
            span{
                display: inline-block;
                width: 100%;
                color:#000;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;

            }
            .el-form-item__content{
                width: calc(100% - 100px);
                .el-select,.el-input__inner{
                    width: 100%;
                }
                
            }
        }
        .textarea{
            width: 48%;
        }

    }
}

</style>
